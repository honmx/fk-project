import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { CreateGroupDto } from './dto/createGroupDto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GetGroupByNameDto } from './dto/getGroupByNameDto';
import { ChangeGroupNameDto } from './dto/changeGroupNameDto';
import { DeleteGroupDto } from './dto/deleteGroupDto';
import { AddChildrenDto } from './dto/addChildrenDto';
import { CreateScheduleDto } from './dto/createScheduleDto';
import { ITrainingByDayOfTheWeek } from './types/ITrainingByDayOfTheWeek';
import { ITrainingByDay } from './types/ITrainingByDay';
import { TrainingByDayOfTheWeek } from './models/trainingByDayOfTheWeek.model';
import { TrainingByDay } from './models/trainingByDay.model';
import { IPlace } from './types/IPlace';
import { IPlaceWithId } from './types/IPlaceWithId';
import { Schedule } from './models/schedule.model';
import { GetGroupByIdDto } from './dto/getGroupByIdDto';
import { CreateTrainingDto } from './dto/createTrainingDto';
import { GetCurrentScheduleDto } from './dto/getCurrentScheduleDto';
import { FindOptions, Includeable, Op } from 'sequelize';
import { ChangeTrainingDto } from './dto/changeTrainingDto';
import { DeleteTrainingDto } from './dto/deleteTrainingDto';
import { MarkAttendanceDto } from './dto/markAttendanceDto';
import { PersonTraining } from './models/personTraining.model';
import { User } from 'apps/users/src/models/user.model';
import { Place } from 'apps/places/src/models/place.model';
import { MedicalDocument } from 'apps/users/src/models/medicalDocument.model';
import { Insurance } from 'apps/users/src/models/insurance.model';
import { GetGroupParticipantsCountDto } from './dto/getGroupParticipantsCountDto';
import { GetAttendanceDto } from './dto/getAttendanceDto';
import { GetAllPersonTrainingsDto } from './dto/getAllPersonTrainings';
import { DeletePersonTrainingsDto } from './dto/deletePersonTrainingsDto ';
import { CheckGroupsExistenceDto } from './dto/checkGroupsExistenceDto';
import { GetGroupsByIdDto } from './dto/getGroupsByIdDto';
import { IsPlaceBeingUsedDto } from './dto/isPlaceBeingUsedDto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private groupsRepository: typeof Group,
    @InjectModel(TrainingByDayOfTheWeek) private trainingsByDayOfTheWeekRepository: typeof TrainingByDayOfTheWeek,
    @InjectModel(TrainingByDay) private trainingsByDayRepository: typeof TrainingByDay,
    @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
    @InjectModel(PersonTraining) private personTrainingsRepository: typeof PersonTraining,
    @Inject("USERS") private usersClient: ClientProxy,
    @Inject("PLACES") private placesClient: ClientProxy,
  ) { }

  async getGroups() {
    const groups = await this.groupsRepository.findAll({ attributes: { exclude: ["participantId", "scheduleId", "createdAt", "updatedAt"] } });
    return groups;
  }

  async getGroupByName(dto: GetGroupByNameDto, include?: Includeable | Includeable[]) {
    const [day, month, year] = new Date().toLocaleDateString().split(".");
    const { previousMonth, currentMonth, nextMonth } = this.getCurrentMonthAndSublings(Number(month), Number(year));

    const groupFromDb = await this.groupsRepository.findOne({ where: { name: dto.name } });

    if (!groupFromDb) {
      return new BadRequestException("Такой группы не существует");
    }

    const group = await this.groupsRepository.findOne({
      where: { name: dto.name }, include: include || [
        { model: User },
        {
          model: Schedule,
          where: {
            [Op.or]: [{ date: previousMonth }, { date: currentMonth }, { date: nextMonth }]
          },
          include: [
            { model: TrainingByDayOfTheWeek, include: [{ model: Place }] },
            { model: TrainingByDay, include: [{ model: Place }] }
          ],
          required: false
        }
      ]
    });

    return group;
  }

  async getGroupById(dto: GetGroupByIdDto, include?: Includeable | Includeable[]) {
    const [day, month, year] = new Date().toLocaleDateString().split(".");
    const { previousMonth, currentMonth, nextMonth } = this.getCurrentMonthAndSublings(Number(month), Number(year));

    const group = await this.groupsRepository.findOne({
      where: { id: dto.id }, include: include || [
        {
          model: User,
          include: [
            { model: Group },
            { model: MedicalDocument },
            { model: Insurance },
          ]
        },
        {
          model: Schedule,
          where: {
            [Op.or]: [{ date: previousMonth }, { date: currentMonth }, { date: nextMonth }]
          },
          include: [
            { model: TrainingByDayOfTheWeek, include: [{ model: Place }] },
            { model: TrainingByDay, include: [{ model: Place }] }
          ],
          required: false
        }
      ]
    });

    return group;
  }

  async getGroupsById(dto: GetGroupsByIdDto) {
    const groups = await this.groupsRepository.findAll({
      where: { id: { [Op.or]: dto.groupsId } },
      attributes: ["id", "name", "amountOfTrainingsInSubscription"]
    });

    return groups;
  }

  async checkGroupsExistence(dto: CheckGroupsExistenceDto) {
    const groups = await this.groupsRepository.findAll({ where: { id: { [Op.or]: dto.groupsId } } });
    return groups.length === dto.groupsId.length;
  }

  async getGroupParticipants(dto: GetGroupParticipantsCountDto) {
    const group = await this.groupsRepository.findOne({ where: { id: dto.id }, include: { model: User } });
    return group.participants;
  }

  async getGroupParticipantsCount(dto: GetGroupParticipantsCountDto) {
    const group = await this.groupsRepository.findOne({ where: { id: dto.id }, include: { model: User } });
    return group.participants.length;
  }

  async createGroup(dto: CreateGroupDto) {
    const group = await this.groupsRepository.findOne({ where: { name: dto.name } });

    if (group) {
      return new BadRequestException("Группа с таким названием уже существует");
    }

    const newGroup = await this.groupsRepository.create(dto, { include: { all: true } });

    if (dto.participantsId?.length == 0) return newGroup;

    const users = await lastValueFrom(this.usersClient.send("get-users-by-id", { usersId: dto.participantsId }));
    await newGroup.$set("participants", users.map(user => user.id));

    return newGroup;
  }

  async changeGroupName(dto: ChangeGroupNameDto) {
    const group = await this.groupsRepository.findOne({ where: { [Op.not]: { id: dto.id }, name: dto.name } });

    if (group) {
      return new BadRequestException("Группа с таким названием уже существует");
    }

    await this.groupsRepository.update({ name: dto.name }, { where: { id: dto.id } });
    return await this.groupsRepository.findOne({ where: { id: dto.id } });
  }

  async deleteGroup(dto: DeleteGroupDto) {
    const schedules = await this.scheduleRepository.findAll({ where: { groupId: dto.id } });

    await this.trainingsByDayOfTheWeekRepository.destroy({ where: { [Op.or]: schedules.map(schedule => ({ scheduleId: schedule.id })) } });
    await this.scheduleRepository.destroy({ where: { groupId: dto.id } });

    await lastValueFrom(this.usersClient.send(
      "clear-history-on-group-delete",
      {
        groupId: dto.id,
        previousAmountOfTrainingsInSubscription: dto.amountOfTrainingsInSubscription
      }
    ));

    const group = await this.groupsRepository.destroy({ where: { id: dto.id } });

    return group;
  }

  async getParticipantsByGroupId(groupId: number) {
    const users = await lastValueFrom(this.usersClient.send("get-users-by-group-id", { groupId }));
    return users;
  }

  async addChildren(dto: AddChildrenDto) {
    const group = await this.groupsRepository.findOne({ where: { id: dto.id } });

    if (!group) {
      return new BadRequestException("Такой группы не существует");
    }

    const users = await lastValueFrom(this.usersClient.send("get-users-by-id", { usersId: dto.childrenId }));
    await group.$add("participants", users.map(user => user.id));

    return await this.getParticipantsByGroupId(group.id);
  }

  async getCurrentSchedule(dto: GetCurrentScheduleDto) {
    const { id, month, year } = dto;

    const { previousMonth, currentMonth, nextMonth } = this.getCurrentMonthAndSublings(month, year);

    const schedule = await this.scheduleRepository.findAll({
      where: {
        [Op.and]: [
          { groupId: id },
          { [Op.or]: [{ date: previousMonth }, { date: currentMonth }, { date: nextMonth }] }
        ]
      },
      include: { all: true, nested: true }
    });

    return schedule;
  }

  async createSchedule(dto: CreateScheduleDto, includeSiblings = true) {
    const group = await this.getGroupById({ id: dto.id });

    if (!group) {
      return new BadRequestException("Такой группы не существует");
    }

    const scheduleFromDb = await this.getScheduleByGroupIdAndDate(dto.id, dto.date);
    const [month, year] = dto.date.split(".");

    if (scheduleFromDb) {

      const trainingsByDay = await this.trainingsByDayRepository.findAll({ where: { scheduleId: scheduleFromDb.id } });

      const personTrainings = await this.personTrainingsRepository.findAll({
        where: { [Op.or]: trainingsByDay.map(training => ({ trainingByDayId: training.id })) }
      });

      if (personTrainings.length > 0) {
        return new BadRequestException("Невозможно изменить расписание. Есть отмеченные пользователи");
      }

      await this.trainingsByDayOfTheWeekRepository.destroy({ where: { scheduleId: scheduleFromDb.id } });

      await this.trainingsByDayRepository.update(
        { scheduleId: null },
        { where: { [Op.or]: Array.from(new Set(personTrainings.map(training => ({ id: training.trainingByDayId })))) } }
      );

      await this.trainingsByDayRepository.destroy({
        where: {
          [Op.or]: trainingsByDay
            .filter(trainingByDay => !personTrainings.map(personTraining => personTraining.trainingByDayId).includes(trainingByDay.id))
            .map(filteredTraining => ({ id: filteredTraining.id }))
        }
      });

      await this.scheduleRepository.destroy({ where: { id: scheduleFromDb.id } });
    }

    const datesArray = this.getDatesArray(Number(month), Number(year));

    const trainingsByDayOfTheWeek = await this.createTrainingsByDayOfTheWeek(dto.trainingsByDayOfTheWeek);
    const trainingsByDay = await this.createTrainingsByDay(dto.trainingsByDayOfTheWeek, datesArray);
    const schedule = await this.scheduleRepository.create({ date: dto.date }, { include: { all: true } });

    await schedule.$set("trainingsByDayOfTheWeek", trainingsByDayOfTheWeek.map(training => training.id));
    await schedule.$set("trainingsByDay", trainingsByDay.map(training => training.id));

    await group.$add("schedule", schedule.id);

    return includeSiblings
      ? await this.getCurrentSchedule({ id: dto.id, month: Number(month), year: Number(year) })
      : await this.getScheduleByGroupIdAndDate(dto.id, `${month}.${year}`);
  }

  async getScheduleByGroupIdAndDate(groupId: number, date: string) {
    const schedule = await this.scheduleRepository.findOne({ where: { groupId, date } });
    return schedule;
  }

  async createTrainingsByDay(trainingsByDayOfTheWeekObjects: ITrainingByDayOfTheWeek[], datesArray: Date[]) {
    const trainingsByDayObjects = this.getTrainingsByDayObjectsArray(datesArray, trainingsByDayOfTheWeekObjects);

    // const trainingsByDayOfTheWeek = await this.trainingsByDayRepository.findAll({ include: { all: true } });
    const trainingsByDayOfTheWeek = await this.trainingsByDayRepository.bulkCreate(trainingsByDayObjects, { include: { all: true } });
    return trainingsByDayOfTheWeek;
  }

  async createTrainingsByDayOfTheWeek(trainingsByDayOfTheWeekObjects: ITrainingByDayOfTheWeek[]) {
    // const trainingsByDayOfTheWeek = await this.trainingsByDayOfTheWeekRepository.findAll({ include: { all: true } });
    const trainingsByDayOfTheWeek = await this.trainingsByDayOfTheWeekRepository.bulkCreate(trainingsByDayOfTheWeekObjects, { include: { all: true } });
    return trainingsByDayOfTheWeek;
  }

  async createTraining(dto: CreateTrainingDto) {
    const { id, ...restDto } = dto;

    const [day, month, year] = dto.date.split(".");

    const schedule = await this.getScheduleByGroupIdAndDate(id, `${month}.${year}`)
      || await this.createSchedule({ id, date: `${month}.${year}`, trainingsByDayOfTheWeek: [] }, false) as Schedule;

    const trainingFromDb = await this.trainingsByDayRepository.findOne({ where: { scheduleId: schedule.id, date: dto.date }, include: { all: true } });

    if (trainingFromDb) {
      return new BadRequestException("Такая тренировка уже существует");
    }

    const training = await this.trainingsByDayRepository.create(restDto, { include: { all: true } });

    await schedule.$add("trainingsByDay", [training.id]);

    return await this.getCurrentSchedule({ id, month: Number(month), year: Number(year) });
  }

  async changeTraining(dto: ChangeTrainingDto) {
    const { groupId, id, ...restDto } = dto;

    const [day, month, year] = dto.date.split(".");

    const schedule = await this.getScheduleByGroupIdAndDate(groupId, `${month}.${year}`);

    const trainingFromDb = await this.trainingsByDayRepository.findOne({ where: { id: dto.id } });

    if (!trainingFromDb) {
      return new BadRequestException("Такой тренировки не существует");
    }

    const personTraining = await this.personTrainingsRepository.findOne({ where: { trainingByDayId: trainingFromDb.id } });

    if (personTraining) {
      return new BadRequestException("Нельзя изменить тренировку, т.к. по ней выставлена посещаемость");;
    }

    await this.trainingsByDayRepository.update({ id, ...restDto }, { where: { scheduleId: schedule.id, id: dto.id } });

    return await this.getCurrentSchedule({ id: groupId, month: Number(month), year: Number(year) });
  }

  async deleteTraining(dto: DeleteTrainingDto) {
    const { id, date } = dto;

    const [day, month, year] = date.split(".");

    const schedule = await this.getScheduleByGroupIdAndDate(id, `${month}.${year}`);

    const trainingFromDb = await this.trainingsByDayRepository.findOne({ where: { scheduleId: schedule.id, date: dto.date } });

    if (!trainingFromDb) {
      return new BadRequestException("Такой тренировки не существует");
    }

    const personTraining = await this.personTrainingsRepository.findOne({ where: { trainingByDayId: trainingFromDb.id } });

    if (personTraining) {
      return new BadRequestException("Нельзя удалить тренировку, т.к. по ней выставлена посещаемость");;
    }

    await this.trainingsByDayRepository.destroy({ where: { scheduleId: schedule.id, date: dto.date } });

    return await this.getCurrentSchedule({ id, month: Number(month), year: Number(year) });
  }

  async markAttendance(dto: MarkAttendanceDto) {
    const { id, date, amountOfTrainingsInSubscription, attendanceData } = dto;

    const [day, month, year] = date.split(".");

    const schedule = await this.getScheduleByGroupIdAndDate(id, `${month}.${year}`);

    const training = await this.trainingsByDayRepository.findOne({ where: { scheduleId: schedule.id, date: dto.date } });

    if (!training) {
      return new BadRequestException("Такой тренировки не существует");
    }

    const [trainingDay, trainingMonth, trainingYear] = training.date.split(".");
    const [trainingHours, trainingMinutes] = training.time.split(":");

    const trainingDate = new Date(Date.UTC(Number(trainingYear), Number(trainingMonth) - 1, Number(trainingDay), Number(trainingHours), Number(trainingMinutes)));

    const d = new Date();
    const currentDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()));

    if (currentDate < trainingDate) {
      return new BadRequestException("Невозможно отметить до начала тренировки");
    }

    const personTrainingsFromDb = await this.personTrainingsRepository.findAll({ where: { trainingByDayId: training.id } });

    const participants = await lastValueFrom(this.usersClient.send("mark-attendance", {
      personTrainings: personTrainingsFromDb.map(training => ({
        id: training.id,
        attendance: training.attendance,
        trainingByDayId: training.trainingByDayId,
        userId: training.userId
      })),
      attendanceData,
      date,
      amountOfTrainingsInSubscription,
      groupId: id
    }));

    await this.personTrainingsRepository.destroy({ where: { trainingByDayId: training.id } });

    const filteredAttendanceData = attendanceData.filter(attendanceItem => attendanceItem.attendance !== null);

    const personTrainings = await this.personTrainingsRepository.bulkCreate(filteredAttendanceData, { include: { all: true } });
    personTrainings.forEach(async (personTraining) => await personTraining.$set("training", training.id));

    return participants;
  }

  async getAttendance(dto: GetAttendanceDto) {

    const [day, month, year] = dto.date.split(".");

    const schedule = await this.getScheduleByGroupIdAndDate(dto.id, `${month}.${year}`);

    const training = await this.trainingsByDayRepository.findOne({ where: { scheduleId: schedule.id, date: dto.date } });

    if (!training) {
      return new BadRequestException("Такой тренировки не существует");
    }

    const personTrainings = await this.personTrainingsRepository.findAll({ where: { trainingByDayId: training.id } });

    return personTrainings;
  }

  async getAllPersonTrainings(dto: GetAllPersonTrainingsDto) {
    const personTrainings = await this.personTrainingsRepository.findAll({
      where: { userId: dto.userId, [Op.not]: { trainingByDayId: dto.trainingByDayId } },
      include: [{
        model: TrainingByDay,
        attributes: { exclude: ["id", "time", "placeId", "scheduleId", "personTrainingsId", "createdAt", "updatedAt"] }
      }],
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      order: [["createdAt", "ASC"]]
    });

    return personTrainings;
  }

  async deletePersonTrainings(dto: DeletePersonTrainingsDto) {
    await this.personTrainingsRepository.destroy({ where: { [Op.or]: dto.personTrainingsId.map(id => ({ id })) } });
    return 1;
  }

  async isPlaceBeingUsed(dto: IsPlaceBeingUsedDto) {
    const trainingWithPassedPlace = await this.trainingsByDayRepository.findOne({ where: { placeId: dto.placeId } });
    return !!trainingWithPassedPlace;
  }

  getCurrentMonthAndSublings(month: number, year: number) {
    const previousMonth = month - 1 === 0
      ? `12.${year - 1}`
      : `${month - 1 < 10 ? "0" : ""}${month - 1}.${year}`;

    const currentMonth = `${month < 10 ? "0" : ""}${month}.${year}`;

    const nextMonth = month + 1 === 13
      ? `01.${year + 1}`
      : `${month + 1 < 10 ? "0" : ""}${month + 1}.${year}`;

    return { previousMonth, currentMonth, nextMonth };
  }

  getDatesArray(month: number, year: number) {
    let initialDay = 1;

    const result: Date[] = [];

    while (new Date(Date.UTC(year, month - 1, initialDay)).getMonth() === Number(month) - 1) {
      const date = new Date(Date.UTC(year, month - 1, initialDay++));
      result.push(date);
    }

    return result;
  }

  getTrainingsByDayObjectsArray(datesArray: Date[], trainingsByDayOfTheWeek: ITrainingByDayOfTheWeek[]) {
    const result: ITrainingByDay[] = [];

    datesArray.forEach(date => {
      trainingsByDayOfTheWeek.forEach(trainingByDayOfTheWeek => {
        if (date.getDay() === trainingByDayOfTheWeek.dayOfTheWeek) {
          const trainingByDay = {
            date: date.toLocaleDateString(),
            time: trainingByDayOfTheWeek.time,
            placeId: trainingByDayOfTheWeek.placeId
          }

          result.push(trainingByDay);
        }
      });
    });

    return result;
  }

  // getPlacesId(trainingsByDayOfTheWeek: ITrainingByDayOfTheWeek[]) {
  //   return Array.from(new Set(trainingsByDayOfTheWeek.map(trainingByDayOfTheWeek => trainingByDayOfTheWeek.placeId)));
  // }

  // async getPlacesObject(trainingsByDayOfTheWeek: ITrainingByDayOfTheWeek[]) {
  //   const placesId = this.getPlacesId(trainingsByDayOfTheWeek);
  //   const places: IPlaceWithId[] = await lastValueFrom(this.placesClient.send("get-places-by-id", { placesId }));

  //   const result = {};

  //   places.forEach(place => result[place.id] = place);

  //   return result;
  // }
}
