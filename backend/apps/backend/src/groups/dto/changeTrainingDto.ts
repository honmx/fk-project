import { IsNumber, IsString } from "class-validator";

export class ChangeTrainingDto {
  @IsNumber()
  id: number;

  @IsString()
  date: string;
  
  @IsString()
  time: string;

  @IsNumber()
  placeId: number;
}