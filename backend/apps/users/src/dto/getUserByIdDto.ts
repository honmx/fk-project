import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetUserByIdDto {
  @IsNumber()
  id: number;
}