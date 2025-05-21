import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(" ");

      if (bearer !== "Bearer" && !token) {
        throw new UnauthorizedException("The user is not authorized");
      }

      const user = this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_PRIVATE_ACCESS_KEY") });
      req.user = user;

      return true;

    } catch (error) {
      throw new UnauthorizedException("The user is not authorizeddddddd");
    }
  }
}