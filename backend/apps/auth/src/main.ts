import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  
  const rmqService = app.get<RmqService>(RmqService, { strict: false });

  app.use(cookieParser());

  app.connectMicroservice(rmqService.getOptions("AUTH"));

  app.startAllMicroservices();
}
bootstrap();
