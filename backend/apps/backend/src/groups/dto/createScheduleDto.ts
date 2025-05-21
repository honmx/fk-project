import { IsArray, IsString } from "class-validator";

export class CreateScheduleDto { 
  @IsString()
  date: string;
  
  @IsArray()
  trainingsByDayOfTheWeek: {
    dayOfTheWeek: number;
    time: string;
    placeId: number;
  }[];
}