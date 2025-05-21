import { NestFactory } from '@nestjs/core';
import { GroupsModule } from './groups.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GroupsModule);
  
  const rmqService = app.get<RmqService>(RmqService, { strict: false });

  app.connectMicroservice(rmqService.getOptions("GROUPS"));

  app.startAllMicroservices();
}
bootstrap();
