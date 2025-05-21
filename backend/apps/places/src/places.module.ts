import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RmqModule } from '@app/common';
import { Place } from './models/place.model';
import { TrainingByDay } from 'apps/groups/src/models/trainingByDay.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_PLACES_HOST,
      port: Number(process.env.POSTGRES_PLACES_PORT),
      username: process.env.POSTGRES_PLACES_USER,
      password: process.env.POSTGRES_PLACES_PASSWORD,
      database: process.env.POSTGRES_PLACES_DB,
      models: [TrainingByDay, Place],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([Place]),
    RmqModule.register({ name: "GROUPS" }),
    RmqModule,
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule { }
