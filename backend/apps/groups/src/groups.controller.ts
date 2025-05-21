import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { CreateGroupDto } from './dto/createGroupDto';
import { ChangeGroupNameDto } from './dto/changeGroupNameDto';
import { DeleteGroupDto } from './dto/deleteGroupDto';
import { AddChildrenDto } from './dto/addChildrenDto';
import { CreateScheduleDto } from './dto/createScheduleDto';
import { GetGroupByIdDto } from './dto/getGroupByIdDto';
import { CreateTrainingDto } from './dto/createTrainingDto';
import { GetCurrentScheduleDto } from './dto/getCurrentScheduleDto';
import { ChangeTrainingDto } from './dto/changeTrainingDto';
import { DeleteTrainingDto } from './dto/deleteTrainingDto';
import { MarkAttendanceDto } from './dto/markAttendanceDto';
import { User } from 'apps/users/src/models/user.model';
import { Schedule } from './models/schedule.model';
import { TrainingByDayOfTheWeek } from './models/trainingByDayOfTheWeek.model';
import { TrainingByDay } from './models/trainingByDay.model';
import { GetGroupByNameDto } from './dto/getGroupByNameDto';
import { GetGroupParticipantsCountDto } from './dto/getGroupParticipantsCountDto';
import { GetAttendanceDto } from './dto/getAttendanceDto';
import { GetAllPersonTrainingsDto } from './dto/getAllPersonTrainings';
import { DeletePersonTrainingsDto } from './dto/deletePersonTrainingsDto ';
import { CheckGroupsExistenceDto } from './dto/checkGroupsExistenceDto';
import { GetGroupParticipantsDto } from './dto/getGroupParticipantsDto';
import { GetGroupsByIdDto } from './dto/getGroupsByIdDto';
import { IsPlaceBeingUsedDto } from './dto/isPlaceBeingUsedDto';

@Controller()
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly rmqService: RmqService
  ) { }

  @MessagePattern("get-groups")
  async getGroups(@Ctx() context: RmqContext) {
    const response = await this.groupsService.getGroups();
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-group-by-id")
  async getGroupById(@Payload() dto: GetGroupByIdDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getGroupById(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-groups-by-id")
  async getGroupsById(@Payload() dto: GetGroupsByIdDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getGroupsById(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("check-groups-existence")
  async checkGroupsExistence(@Payload() dto: CheckGroupsExistenceDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.checkGroupsExistence(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-group-by-name")
  async getGroupByName(@Payload() dto: GetGroupByNameDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getGroupByName(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-group-participants")
  async getGroupParticipants(@Payload() dto: GetGroupParticipantsDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getGroupParticipants(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-group-participants-count")
  async getGroupParticipantsCount(@Payload() dto: GetGroupParticipantsCountDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getGroupParticipantsCount(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("create-group")
  async createGroups(@Payload() dto: CreateGroupDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.createGroup(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("change-group-name")
  async changeGroupName(@Payload() dto: ChangeGroupNameDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.changeGroupName(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("delete-group")
  async deleteGroup(@Payload() dto: DeleteGroupDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.deleteGroup(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("add-children")
  async addChildren(@Payload() dto: AddChildrenDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.addChildren(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-current-schedule")
  async getCurrentSchedule(@Payload() dto: GetCurrentScheduleDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getCurrentSchedule(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("create-schedule")
  async createSchedule(@Payload() dto: CreateScheduleDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.createSchedule(dto);
    this.rmqService.ack(context);
    console.log(dto);
    return response;
  }

  @MessagePattern("create-training")
  async createTraining(@Payload() dto: CreateTrainingDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.createTraining(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("change-training")
  async changeTraining(@Payload() dto: ChangeTrainingDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.changeTraining(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("delete-training")
  async deleteTraining(@Payload() dto: DeleteTrainingDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.deleteTraining(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("mark-attendance")
  async markAttendance(@Payload() dto: MarkAttendanceDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.markAttendance(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-attendance")
  async getAttendance(@Payload() dto: GetAttendanceDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getAttendance(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-all-person-trainings")
  async getAllPersonTrainings(@Payload() dto: GetAllPersonTrainingsDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.getAllPersonTrainings(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("delete-person-trainings")
  async deletePersonTrainings(@Payload() dto: DeletePersonTrainingsDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.deletePersonTrainings(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("is-place-being-used")
  async isPlaceBeingUsed(@Payload() dto: IsPlaceBeingUsedDto, @Ctx() context: RmqContext) {
    const response = await this.groupsService.isPlaceBeingUsed(dto);
    this.rmqService.ack(context);
    return response;
  }
}
