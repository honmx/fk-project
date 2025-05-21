import { NestFactory } from '@nestjs/core';
import { PlacesModule } from './places.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(PlacesModule);
  
  const rmqService = app.get<RmqService>(RmqService, { strict: false });

  app.connectMicroservice(rmqService.getOptions("PLACES"));

  app.startAllMicroservices();
}
bootstrap();
