import { IsArray, IsNumber, IsString } from "class-validator";

export class DeletePersonTrainingsDto {
  @IsArray()
  personTrainingsId: number[];
}