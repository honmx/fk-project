import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/createApplicationDto';
import { InjectModel } from '@nestjs/sequelize';
import { Application } from './models/application.model';
import { DeleteApplicationDto } from './dto/deleteApplicationDto';
import { UpdateStatusDto } from './dto/updateStatusDto';
import { GetApplicationsLazyDto } from './dto/getApplicationsLazyDto';
import { Op } from 'sequelize';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application) private applicationsRepository: typeof Application,
  ) { }

  async getApplications() {
    const applications = await this.applicationsRepository.findAll();
    return applications;
  }

  async getApplicationsLazy(dto: GetApplicationsLazyDto) {
    const applications = await this.applicationsRepository.findAll({
      where: { parentName: { [Op.iRegexp]: dto.name } },
      offset: dto.filterId === 1 ? dto.offset : 0,
      order: [["parentName", "ASC"], ["childName", "ASC"]],
      limit: dto.filterId === 1 ? 15 : 10000
    });

    if (dto.filterId === 1) return applications;

    const filterValues = this.getFilterValues();
    return applications
      .filter(filterValues.find(value => value.id === dto.filterId)?.filterFn || (() => true))
      .slice(dto.offset, dto.offset + 10);
  }

  async createApplication(dto: CreateApplicationDto) {
    const { timeFrom, timeTo, ...restDto } = dto;
    const applicationFromDb = await this.applicationsRepository.findOne({ where: { ...restDto } });

    if (applicationFromDb) {
      return new BadRequestException("Ваша заявка уже отправлена");
    }

    const application = await this.applicationsRepository.create({ ...dto, status: "Новый" });
    return application;
  }

  async updateStatus(dto: UpdateStatusDto) {
    const applicationFromDb = await this.applicationsRepository.findOne({ where: { id: dto.id } });

    if (!applicationFromDb) {
      return new BadRequestException("Такой заявки не существует");
    }

    await this.applicationsRepository.update({ status: dto.status }, { where: { id: dto.id } });
    return await this.applicationsRepository.findOne({ where: { id: dto.id } });
  }

  async deleteApplication(dto: DeleteApplicationDto) {
    const applicationFromDb = await this.applicationsRepository.findOne({ where: { id: dto.id } });

    if (!applicationFromDb) {
      return new BadRequestException("Такой заявки не существует");
    }

    return await this.applicationsRepository.destroy({ where: { id: dto.id } });
  }

  getFilterValues() {
    return [
      {
        id: 1,
        text: "Все",
        filterFn: () => true
      },
      {
        id: 2,
        text: "Новые",
        filterFn: (application: Application) => application.status === "Новый"
      },
      {
        id: 3,
        text: "Просмотренные",
        filterFn: (application: Application) => application.status === "Просмотрено"
      },
      {
        id: 4,
        text: "Завершенные",
        filterFn: (application: Application) => application.status === "Завершено"
      },
    ];
  }
}
