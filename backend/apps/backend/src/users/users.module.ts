import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FileModule, HelpersModule, RmqModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RmqModule.register({ name: "USERS" }),
    JwtModule,
    FileModule,
    HelpersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: []
})
export class UsersModule {}
