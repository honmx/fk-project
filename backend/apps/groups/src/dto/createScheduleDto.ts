import { IsArray, IsNumber, IsString } from "class-validator";
import { ITrainingByDayOfTheWeek } from "../types/ITrainingByDayOfTheWeek";

export class CreateScheduleDto {
  @IsNumber()
  id: number;

  @IsString()
  date: string;
  
  @IsArray()
  trainingsByDayOfTheWeek: ITrainingByDayOfTheWeek[];
}