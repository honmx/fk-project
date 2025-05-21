import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/loginDto';
import { SendCodeDto } from './dto/sendCodeDto';
import { ValidateCodeDto } from './dto/validateCodeDto';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';
import { JwtAuthGuard } from '@app/common';
import { RegisterCoachDto } from './dto/registerCoachDto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const response = await this.authService.register(registerDto, res);
    return response;
  }

  @Post("/registerCoach")
  async registerCoach(@Body() registerCoachDto: RegisterCoachDto, @Res({ passthrough: true }) res: Response) {
    const response = await this.authService.registerCoach(registerCoachDto, res);
    return response;
  }

  @Post("/login")
  async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const response = await this.authService.login(loginDto, res);
    return response;
  }

  @Post("/logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.headers.cookie?.split("=")[1] || "";
    
    const response = await this.authService.logout({ refreshToken }, res);
    return response;
  }
  
  @Get("/refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.headers.cookie?.split("=")[1] || "";

    const response = await this.authService.refresh({ refreshToken }, res);
    return response;
  }

  @Get("/validateRefreshToken")
  async validateRefreshToken(@Req() req: Request, res: Response) {
    const cookies = req.headers.cookie?.split("; ") || [];

    const refreshTokenCookieIndex = cookies.findIndex(value => value.includes("refreshToken"));

    const refreshToken = refreshTokenCookieIndex === -1
      ? ""
      : cookies[refreshTokenCookieIndex].split("=")[1];

    const response = await this.authService.validateRefreshToken(refreshToken, res);
    return response;
  }

  @Post("/sendVerificationCode")
  async sendVerificationCode(@Body() sendCodeDto: SendCodeDto) {
    const response = await this.authService.sendVerificationCode(sendCodeDto);
    return response;
  }

  @Post("/validateVerificationCode")
  async validateVerificationCode(@Body() validateCodeDto: ValidateCodeDto) {
    const response = await this.authService.validateVerificationCode(validateCodeDto);
    return response;
  }

  @Put("/recoverPassword")
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    const response = await this.authService.recoverPassword(recoverPasswordDto);
    return response;
  }
}
