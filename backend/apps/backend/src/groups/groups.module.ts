import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({ name: "GROUPS" }),
  ],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupModule {}
