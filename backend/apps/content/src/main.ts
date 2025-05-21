import { NestFactory } from "@nestjs/core";
import { ContentModule } from "./content.module";
import { RmqService } from "@app/common";

async function bootstrap() {
  const app = await NestFactory.create(ContentModule);

  const rmqService = app.get<RmqService>(RmqService, { strict: false });

  app.connectMicroservice(rmqService.getOptions("CONTENT"));

  app.startAllMicroservices();
}

bootstrap();
