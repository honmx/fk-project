import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from "bcrypt";
import { IUser } from './types/IUser';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from '@app/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './models/auth.model';
import { LoginDto } from './dto/loginDto';
import { LogoutDto } from './dto/logoutDto';
import { RefreshDto } from './dto/refreshDto';
import { ConfigService } from '@nestjs/config';
import { SendCodeDto } from './dto/sendCodeDto';
import { Code } from './models/code.model';
import { MailerService } from '@nestjs-modules/mailer';
import { ValidateCodeDto } from './dto/validateCodeDto';
import { RecoverPasswordDto } from './dto/recoverPasswordDto';
import { RegisterCoachDto } from './dto/registerCoachDto';
import { IUserCoach } from './types/IUserCoach';

@Injectable()
export class AuthService {
  constructor(
    @Inject("USERS") private usersClient: ClientProxy,
    @InjectModel(Auth) private authRepository: typeof Auth,
    @InjectModel(Code) private codeRepository: typeof Code,
    private mailerServce: MailerService,
    private readonly configServce: ConfigService,
    private readonly jwtService: JwtService,
    private readonly helpersService: HelpersService,
  ) { }

  async register(dto: RegisterDto) {
    const user = await lastValueFrom(this.usersClient.send("get-user-by-email", { email: dto.email }));

    if (user) {
      return new BadRequestException("This user already exists");
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newUser = await lastValueFrom(this.usersClient.send("create-user", { ...dto, password: hashPassword })) as IUser;

    return await this.generateAndSaveToken(newUser);
  }

  async registerCoach(dto: RegisterCoachDto) {
    const coach = await lastValueFrom(this.usersClient.send("get-user-by-email", { email: dto.email }));

    if (coach) {
      return new BadRequestException("This user already exists");
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newCoach = await lastValueFrom(this.usersClient.send("create-coach", { ...dto, password: hashPassword })) as IUserCoach;

    return await this.generateAndSaveToken(newCoach);
  }

  async login(dto: LoginDto) {
    const user = await lastValueFrom(this.usersClient.send("get-user-by-email", { email: dto.email }));

    if (!user) {
      return new BadRequestException("This user doesnt exist");
    }

    const isPasswordEquals = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordEquals) {
      return new BadRequestException("Wrong password");
    }

    return await this.generateAndSaveToken(user);
  }

  async logout(dto: LogoutDto) {
    const token = await this.authRepository.destroy({ where: { refreshToken: dto.refreshToken } });
    return token;
  }

  async refresh(dto: RefreshDto) {
    const user = await this.validateRefreshToken(dto.refreshToken);

    const refreshTokenFromDb = await this.findToken(dto.refreshToken);

    if (!user || !refreshTokenFromDb) {
      return new BadRequestException("Cant refresh the token");
    }

    const userFromDb = await lastValueFrom(this.usersClient.send("get-user-by-id", { id: user.id }));

    return await this.generateAndSaveToken(userFromDb);
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const user = this.jwtService.verify(refreshToken, { secret: this.configServce.get<string>("JWT_PRIVATE_REFRESH_KEY") });
      return user;
      
    } catch (error) {
      return null;
    }
  }

  async recoverPassword(dto: RecoverPasswordDto) {
    const hashPassword = await bcrypt.hash(dto.password, 5);

    const user = await lastValueFrom(this.usersClient.send("change-user-password", { ...dto, password: hashPassword }));

    return user;
  }

  async sendVerificationCode(dto: SendCodeDto) {
    const code = this.generateCode();

    await this.saveCode(dto.email, code);

    return await this.mailerServce
      .sendMail({
        from: this.configServce.get<string>("MAIL_SMTP_USER"),
        to: dto.email,
        subject: "Код подтверждения",
        html: `
          <p>Ваш код подтверждения</p>
          <p>Код будет действителен 2 минуты</p>
          <h1>${code}</h1>
        `
      }).catch((error) => {
        if (error?.response?.includes("invalid mailbox") || error?.response?.includes("non-local recipient verification failed")) {
          return new BadRequestException("Некорректный email")
        }

        throw error;
      });
  }

  async validateVerificationCode(dto: ValidateCodeDto) {
    const codeFromDb = await this.codeRepository.findOne({ where: { email: dto.email, code: dto.code } });

    if (!codeFromDb) {
      return new BadRequestException("The code doesnt exist");
    }

    const difference = (Date.now() - new Date(codeFromDb.updatedAt).getTime()) / 1000 / 60;

    if (difference > 2) {
      return new BadRequestException("The code has expired");
    }

    return await this.codeRepository.destroy({ where: { email: dto.email, code: dto.code } });
  }

  private async saveCode(email: string, code: number) {
    const codeFromDb = await this.codeRepository.findOne({ where: { email } });

    const response = codeFromDb
      ? await this.codeRepository.update({ code }, { where: { email } })
      : await this.codeRepository.create({ email, code });

    return response;
  }

  private generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  private async generateAndSaveToken(user: IUser | IUserCoach) {
    const tokens = this.generateTokens(user);
    await this.saveToken(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens
    };
  }

  private generateTokens(user: IUser | IUserCoach) {
    const { password, ...payload } = user;

    return {
      accessToken: this.jwtService.sign(payload, { secret: this.configServce.get<string>("JWT_PRIVATE_ACCESS_KEY"), expiresIn: "24h" }),
      refreshToken: this.jwtService.sign(payload, { secret: this.configServce.get<string>("JWT_PRIVATE_REFRESH_KEY"), expiresIn: "30d" }),
    }
  }

  private async saveToken(userId: number, refreshToken: string) {
    const token = await this.authRepository.findOne({ where: { userId } });

    if (token) {
      token.refreshToken = refreshToken;
      return await token.save();
    }

    return await this.authRepository.create({ userId, refreshToken });
  }

  private async findToken(refreshToken: string) {
    const token = await this.authRepository.findOne({ where: { refreshToken } });
    return token;
  }
}
