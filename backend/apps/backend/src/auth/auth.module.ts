import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RmqModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RmqModule.register({ name: "AUTH" }),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: []
})
export class AuthModule {}
