import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateGroupDto } from './dto/createGroupDto';
import { ChangeGroupNameDto } from './dto/changeGroupNameDto';
import { AddChildrenDto } from './dto/addChildrenDto';
import { CreateScheduleDto } from './dto/createScheduleDto';
import { CreateTrainingDto } from './dto/createTrainingDto';
import { GetCurrentScheduleDto } from './dto/getCurrentScheduleDto';
import { ChangeTrainingDto } from './dto/changeTrainingDto';
import { DeleteTrainingDto } from './dto/deleteTrainingDto';
import { MarkAttendanceDto } from './dto/markAttendanceDto';

@Injectable()
export class GroupsService {
  constructor(
    @Inject("GROUPS") private groupsClient: ClientProxy
  ) { }

  async getGroups() {
    const response = await lastValueFrom(this.groupsClient.send("get-groups", {}));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getGroupById(id: number) {
    const response = await lastValueFrom(this.groupsClient.send("get-group-by-id", { id }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getGroupByName(name: string) {
    const response = await lastValueFrom(this.groupsClient.send("get-group-by-name", { name }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getGroupParticipants(id: number) {
    const response = await lastValueFrom(this.groupsClient.send("get-group-participants", { id }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getGroupParticipantsCount(id: number) {
    const response = await lastValueFrom(this.groupsClient.send("get-group-participants-count", { id }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const response = await lastValueFrom(this.groupsClient.send("create-group", createGroupDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async changeGroupName(id: number, changeGroupNameDto: ChangeGroupNameDto) {
    const response = await lastValueFrom(this.groupsClient.send("change-group-name", { id, ...changeGroupNameDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async deleteGroup(id: number, amountOfTrainingsInSubscription: number) {
    const response = await lastValueFrom(this.groupsClient.send("delete-group", { id, amountOfTrainingsInSubscription }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async addChildren(id: number, addChildrenDto: AddChildrenDto) {
    const response = await lastValueFrom(this.groupsClient.send("add-children", { id, ...addChildrenDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getCurrentSchedule(getCurrentScheduleDto: GetCurrentScheduleDto) {
    const response = await lastValueFrom(this.groupsClient.send("get-current-schedule", { ...getCurrentScheduleDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async createSchedule(id: number, createScheduleDto: CreateScheduleDto) {
    const response = await lastValueFrom(this.groupsClient.send("create-schedule", { id, ...createScheduleDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async createTraining(id: number, createTrainingDto: CreateTrainingDto) {
    const response = await lastValueFrom(this.groupsClient.send("create-training", { id, ...createTrainingDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async changeTraining(groupId: number, changeTrainingDto: ChangeTrainingDto) {
    const response = await lastValueFrom(this.groupsClient.send("change-training", { groupId, ...changeTrainingDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async deleteTraining(deleteTrainingDto: DeleteTrainingDto) {
    const response = await lastValueFrom(this.groupsClient.send("delete-training", deleteTrainingDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async markAttendance(id: number, markAttendanceDto: MarkAttendanceDto) {
    const response = await lastValueFrom(this.groupsClient.send("mark-attendance", { id, ...markAttendanceDto }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async getAttendance(id: number, date: string) {
    const response = await lastValueFrom(this.groupsClient.send("get-attendance", { id, date }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }
}
