import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:3000", "http://frontend:3000", "http://localhost:80", "http://localhost", "http://localho.st", "http://frontend:80"],
    credentials: true
  });
    
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000, () => {
    console.log("api gateway listening on 5000");
  });
}
bootstrap();
