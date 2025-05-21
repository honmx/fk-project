import { IsNumber, IsString } from "class-validator";

export class DeleteTrainingDto {
  @IsNumber()
  id: number;
  
  @IsString()
  date: string;
}