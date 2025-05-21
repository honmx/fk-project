import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoachesModule } from './coaches/coaches.module';
import { Coach } from './coaches/coaches.model';
import { NewsModule } from './news/news.module';
import { News } from './news/news.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_CONTENT_HOST,
      port: Number(process.env.POSTGRES_CONTENT_PORT),
      username: process.env.POSTGRES_CONTENT_USER,
      password: process.env.POSTGRES_CONTENT_PASSWORD,
      database: process.env.POSTGRES_CONTENT_DB,
      models: [Coach, News],
      autoLoadModels: true
    }),
    RmqModule,
    CoachesModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class ContentModule { }
