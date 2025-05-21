import { IsEmail, IsString } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}