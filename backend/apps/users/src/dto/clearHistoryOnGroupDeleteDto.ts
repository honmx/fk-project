import { IsEmail, IsNumber, IsString } from "class-validator";

export class ClearHistoryOnGroupDeleteDto {
  @IsNumber()
  groupId: number;

  @IsNumber()
  previousAmountOfTrainingsInSubscription: number;
}