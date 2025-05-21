import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { LogoutDto } from './dto/logoutDto';
import { RefreshDto } from './dto/refreshDto';
import { SendCodeDto } from './dto/sendCodeDto';
import { ValidateCodeDto } from './dto/validateCodeDto';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';
import { ValidateRefreshTokenDto } from './dto/validateRefreshTokenDto';
import { RegisterCoachDto } from './dto/registerCoachDto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rmqService: RmqService,
  ) { }

  @MessagePattern("register")
  async register(@Payload() dto: RegisterDto, @Ctx() context: RmqContext) {
    const response = await this.authService.register(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("register-coach")
  async registerCoach(@Payload() dto: RegisterCoachDto, @Ctx() context: RmqContext) {
    const response = await this.authService.registerCoach(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("login")
  async login(@Payload() dto: LoginDto, @Ctx() context: RmqContext) {
    const response = await this.authService.login(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("logout")
  async logout(@Payload() dto: LogoutDto, @Ctx() context: RmqContext) {
    const response = await this.authService.logout(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("refresh")
  async refresh(@Payload() dto: RefreshDto, @Ctx() context: RmqContext) {
    const response = await this.authService.refresh(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("validate-refresh-token")
  async validateRefreshToken(@Payload() dto: ValidateRefreshTokenDto, @Ctx() context: RmqContext) {
    const response = await this.authService.validateRefreshToken(dto.refreshToken);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("send-verification-code")
  async sendVerificationCode(@Payload() dto: SendCodeDto, @Ctx() context: RmqContext) {
    const response = await this.authService.sendVerificationCode(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("validate-verification-code")
  async validateVerificationCode(@Payload() dto: ValidateCodeDto, @Ctx() context: RmqContext) {
    const response = await this.authService.validateVerificationCode(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("recover-password")
  async recoverPassword(@Payload() dto: RecoverPasswordDto, @Ctx() context: RmqContext) {
    const response = await this.authService.recoverPassword(dto);
    this.rmqService.ack(context);
    return response;
  }
}
