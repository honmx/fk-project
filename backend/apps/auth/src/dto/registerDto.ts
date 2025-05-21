import { IsString, IsEmail, Length, Matches } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;
  
  @IsString()
  name: string;

  @IsString()
  parentName: string;

  @IsString()
  @Matches(/^\d\d.\d\d.\d\d\d\d$/)
  birth: string;

  @IsString()
  @Length(11, 12)
  phone: string;
}