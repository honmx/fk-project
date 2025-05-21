import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({ name: "APPLICATIONS" }),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
