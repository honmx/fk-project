import { IsEmail, IsNumber, IsString } from "class-validator";

export class RemoveGroupDto {
  @IsNumber()
  id: number;

  @IsNumber()
  groupId: number;

  @IsNumber()
  previousGroupAmountOfTrainingsInSubscription: number;
}