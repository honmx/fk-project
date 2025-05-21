import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RmqModule } from '@app/common';
import { Group } from './models/group.model';
import { ConfigModule } from '@nestjs/config';
import { Schedule } from './models/schedule.model';
import { TrainingByDay } from './models/trainingByDay.model';
import { User } from 'apps/users/src/models/user.model';
import { Role } from 'apps/users/src/models/role.model';
import { Place } from 'apps/places/src/models/place.model';
import { TrainingByDayOfTheWeek } from './models/trainingByDayOfTheWeek.model';
import { PersonTraining } from './models/personTraining.model';
import { MedicalDocument } from 'apps/users/src/models/medicalDocument.model';
import { Insurance } from 'apps/users/src/models/insurance.model';
import { UserGroups } from 'apps/users/src/models/userGroups.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_GROUPS_HOST,
      port: Number(process.env.POSTGRES_GROUPS_PORT),
      username: process.env.POSTGRES_GROUPS_USER,
      password: process.env.POSTGRES_GROUPS_PASSWORD,
      database: process.env.POSTGRES_GROUPS_DB,
      models: [User, UserGroups, Role, MedicalDocument, Insurance, Place, Group, Schedule, TrainingByDay, TrainingByDayOfTheWeek, PersonTraining],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([Group, UserGroups, Schedule, TrainingByDay, TrainingByDayOfTheWeek, PersonTraining]),
    RmqModule,
    RmqModule.register({ name: "USERS" }),
    RmqModule.register({ name: "PLACES" }),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
