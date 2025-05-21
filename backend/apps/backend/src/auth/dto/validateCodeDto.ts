import { IsEmail, IsInt, IsString, Max, Min } from "class-validator";

export class ValidateCodeDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsInt()
  @Min(1000)
  @Max(9999)
  code: number;
}