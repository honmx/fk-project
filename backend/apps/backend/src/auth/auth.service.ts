import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dto/registerDto';
import { Response } from 'express';
import { LoginDto } from './dto/loginDto';
import { LogoutDto } from './dto/logoutDto';
import { RefreshDto } from './dto/refreshDto';
import { SendCodeDto } from './dto/sendCodeDto';
import { ValidateCodeDto } from './dto/validateCodeDto';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';
import { RegisterCoachDto } from './dto/registerCoachDto';

@Injectable()
export class AuthService {
  constructor(
    @Inject("AUTH") private authClient: ClientProxy
  ) { }

  async register(registerDto: RegisterDto, res: Response) {
    const response = await lastValueFrom(this.authClient.send("register", registerDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return response;
  }

  async registerCoach(registerCoachDto: RegisterCoachDto, res: Response) {
    const response = await lastValueFrom(this.authClient.send("register-coach", registerCoachDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return response;
  }

  async login(loginDto: LoginDto, res: Response) {
    const response = await lastValueFrom(this.authClient.send("login", loginDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return response;
  }

  async logout(logoutDto: LogoutDto, res: Response) {
    const response = await lastValueFrom(this.authClient.send("logout", logoutDto));

    if (response?.status >= 400 || response === "undefined") {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    res.clearCookie("refreshToken");
    return response;
  }

  async refresh(refreshDto: RefreshDto, res: Response) {
    const response = await lastValueFrom(this.authClient.send("refresh", refreshDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return response;
  }

  async validateRefreshToken(refreshToken: string, res: Response) {
    const response = await lastValueFrom(this.authClient.send("validate-refresh-token", { refreshToken }));

    if (response?.status >= 400) {
      res.clearCookie("refreshToken");
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async sendVerificationCode(sendCodeDto: SendCodeDto) {
    const response = await lastValueFrom(this.authClient.send("send-verification-code", sendCodeDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async validateVerificationCode(validateCodeDto: ValidateCodeDto) {
    const response = await lastValueFrom(this.authClient.send("validate-verification-code", validateCodeDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
    const response = await lastValueFrom(this.authClient.send("recover-password", recoverPasswordDto));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }
}
