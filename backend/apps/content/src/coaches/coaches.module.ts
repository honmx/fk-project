import { Module } from '@nestjs/common';
import { CoachesController } from './coaches.controller';
import { CoachesService } from './coaches.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coach } from './coaches.model';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule,
    SequelizeModule.forFeature([Coach])
  ],
  controllers: [CoachesController],
  providers: [CoachesService],
})
export class CoachesModule { }
