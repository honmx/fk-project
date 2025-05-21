import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateApplicationDto } from './dto/createApplicationDto';
import { UpdateStatusDto } from './dto/updateStatusDto';
import { GetApplicationsLazyDto } from './dto/getApplicationsLazyDto';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject("APPLICATIONS") private applicationsClient: ClientProxy
  ) { }

  async getApplications() {
    const response = await lastValueFrom(this.applicationsClient.send("get-applications", {}));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getApplicationsLazy(getApplicationsLazyDto: GetApplicationsLazyDto) {
    const response = await lastValueFrom(this.applicationsClient.send("get-applications-lazy", getApplicationsLazyDto));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async createApplication(createApplicationDto: CreateApplicationDto) {
    const response = await lastValueFrom(this.applicationsClient.send("create-application", createApplicationDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    const response = await lastValueFrom(this.applicationsClient.send("update-status", { id, ...updateStatusDto }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async deleteApplication(id: number) {
    const response = await lastValueFrom(this.applicationsClient.send("delete-application", { id }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }
}
