import { IsNumber } from "class-validator";

export class GetAllPersonTrainingsDto {
  @IsNumber()
  userId: number;
  
  @IsNumber()
  trainingByDayId: number;
}