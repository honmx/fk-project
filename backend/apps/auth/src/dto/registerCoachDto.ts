import { IsEmail, IsString, Length, Matches } from "class-validator";

export class RegisterCoachDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
  
  @IsString()
  name: string;
}