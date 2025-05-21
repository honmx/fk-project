import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RmqModule } from '@app/common';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { Group } from 'apps/groups/src/models/group.model';
import { PersonTraining } from 'apps/groups/src/models/personTraining.model';
import { TrainingByDay } from 'apps/groups/src/models/trainingByDay.model';
import { Place } from 'apps/places/src/models/place.model';
import { Schedule } from 'apps/groups/src/models/schedule.model';
import { TrainingByDayOfTheWeek } from 'apps/groups/src/models/trainingByDayOfTheWeek.model';
import { MedicalDocument } from './models/medicalDocument.model';
import { Insurance } from './models/insurance.model';
import { UserGroups } from './models/userGroups.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_USERS_HOST,
      port: Number(process.env.POSTGRES_USERS_PORT),
      username: process.env.POSTGRES_USERS_USER,
      password: process.env.POSTGRES_USERS_PASSWORD,
      database: process.env.POSTGRES_USERS_DB,
      models: [User, UserGroups, Role, MedicalDocument, Insurance, Group, TrainingByDay, TrainingByDayOfTheWeek, Place, PersonTraining, Schedule],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([User, Role, UserGroups, MedicalDocument, Insurance]),
    RmqModule.register({ name: "GROUPS" }),
    RmqModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
