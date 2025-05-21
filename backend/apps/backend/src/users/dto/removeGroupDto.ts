import { IsEmail, IsNumber, IsString } from "class-validator";

export class RemoveGroupDto {
  @IsNumber()
  groupId: number;

  @IsNumber()
  previousGroupAmountOfTrainingsInSubscription: number;
}