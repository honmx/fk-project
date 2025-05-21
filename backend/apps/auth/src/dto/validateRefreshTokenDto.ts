import { IsString } from "class-validator";

export class ValidateRefreshTokenDto {
  @IsString()
  refreshToken: string;
}