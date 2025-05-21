import { IsNumber, IsString } from "class-validator";

export class ChangeTrainingsLeftDto {
  @IsNumber()
  value: number;
}