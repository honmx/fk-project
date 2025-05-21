import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RmqModule } from '@app/common';
import { Application } from './models/application.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_APPLICATIONS_HOST,
      port: Number(process.env.POSTGRES_APPLICATIONS_PORT),
      username: process.env.POSTGRES_APPLICATIONS_USER,
      password: process.env.POSTGRES_APPLICATIONS_PASSWORD,
      database: process.env.POSTGRES_APPLICATIONS_DB,
      models: [Application],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([Application]),
    RmqModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule { }
