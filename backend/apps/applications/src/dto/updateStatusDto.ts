import { IsNumber, IsString } from "class-validator";

export class UpdateStatusDto {
  @IsNumber()
  id: number;

  @IsString()
  status: "Новый" | "Просмотрено" | "Завершено";
}