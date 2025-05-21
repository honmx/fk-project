import { IsArray, IsNumber } from "class-validator";

export class GetUsersAbleToHaveGroupDto {
  @IsNumber()
  groupId: number;

  @IsNumber()
  amountOfTrainingsInSubscription: number;
}