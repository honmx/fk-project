import { IsNumber, IsString } from "class-validator";

export class CreateTrainingDto {
  @IsNumber()
  id: number;

  @IsString()
  date: string;
  
  @IsString()
  time: string;

  @IsNumber()
  placeId: number;
}