import { IsNumber } from "class-validator";

export class DeleteGroupDto {
  @IsNumber()
  id: number;
  
  @IsNumber()
  amountOfTrainingsInSubscription: number;
}