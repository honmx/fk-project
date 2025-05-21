import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  
  const rmqService = app.get<RmqService>(RmqService, { strict: false });

  app.connectMicroservice(rmqService.getOptions("USERS"));

  app.startAllMicroservices();
}
bootstrap();
