import { IsNumber, IsString } from "class-validator";

export class CreateTrainingDto { 
  @IsString()
  date: string;
  
  @IsString()
  time: string;

  @IsNumber()
  placeId: number;
}