import { Controller, Get } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { CreateApplicationDto } from './dto/createApplicationDto';
import { DeleteApplicationDto } from './dto/deleteApplicationDto';
import { UpdateStatusDto } from './dto/updateStatusDto';
import { GetApplicationsLazyDto } from './dto/getApplicationsLazyDto';

@Controller()
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly rmqService: RmqService,
  ) { }

  @MessagePattern("get-applications")
  async getApplications(@Ctx() context: RmqContext) {
    const response = await this.applicationsService.getApplications();
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-applications-lazy")
  getApplicationsLazy(@Payload() dto: GetApplicationsLazyDto, @Ctx() context: RmqContext) {
    const response = this.applicationsService.getApplicationsLazy(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("create-application")
  async createApplication(@Payload() dto: CreateApplicationDto, @Ctx() context: RmqContext) {
    const response = await this.applicationsService.createApplication(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("update-status")
  async updateStatus(@Payload() dto: UpdateStatusDto, @Ctx() context: RmqContext) {
    const response = await this.applicationsService.updateStatus(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("delete-application")
  async deleteApplication(@Payload() dto: DeleteApplicationDto, @Ctx() context: RmqContext) {
    const response = await this.applicationsService.deleteApplication(dto);
    this.rmqService.ack(context);
    return response;
  }
}
