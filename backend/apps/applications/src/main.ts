import { NestFactory } from '@nestjs/core';
import { ApplicationsModule } from './applications.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationsModule);
  
  const rmqService = app.get<RmqService>(RmqService, { strict: false });

  app.connectMicroservice(rmqService.getOptions("APPLICATIONS"));

  app.startAllMicroservices();
}
bootstrap();
