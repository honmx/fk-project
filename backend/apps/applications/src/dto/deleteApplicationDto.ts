import { IsNumber } from "class-validator";

export class DeleteApplicationDto {
  @IsNumber()
  id: number;
}