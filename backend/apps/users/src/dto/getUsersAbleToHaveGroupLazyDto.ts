import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetUsersAbleToHaveGroupLazyDto {
  @IsNumber()
  amountOfTrainingsInSubscription: number;

  @IsNumber()
  groupId: number;

  offset: number;
  name: string;
}