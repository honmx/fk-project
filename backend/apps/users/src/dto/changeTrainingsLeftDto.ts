import { IsNumber, IsString } from "class-validator";

export class ChangeTrainingsLeftDto {
  @IsNumber()
  id: number;

  @IsNumber()
  value: number;
}