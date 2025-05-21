import { Controller } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { CreateCoachDto } from './dto/createCoachDto';

@Controller('coaches')
export class CoachesController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly coachesService: CoachesService
  ) { }

  @MessagePattern("get-coaches")
  async getCoaches(@Ctx() context: RmqContext) {
    const coaches = await this.coachesService.getCoaches();
    this.rmqService.ack(context);
    return coaches;
  }

  @MessagePattern("create-coach")
  async createCoach(@Payload() dto: CreateCoachDto, @Ctx() context: RmqContext) {
    const coach = await this.coachesService.createCoach(dto);
    this.rmqService.ack(context);
    return coach;
  }
}
