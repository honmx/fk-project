import { IsEmail, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
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