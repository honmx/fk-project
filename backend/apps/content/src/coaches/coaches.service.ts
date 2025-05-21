import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coach } from './coaches.model';
import { CreateCoachDto } from './dto/createCoachDto';

@Injectable()
export class CoachesService {
  constructor(
    @InjectModel(Coach) private coachesRepository: typeof Coach
  ) { }

  async getCoaches() {
    const coaches = await this.coachesRepository.findAll();
    return coaches;
  }

  async createCoach(dto: CreateCoachDto) {
    const coach = await this.coachesRepository.create(dto);
    return coach;
  }
}
