import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetUsersAbleToHaveGroupLazyDto {
  @IsNumber()
  groupId: number;
  
  @IsNumber()
  amountOfTrainingsInSubscription: number;
  
  offset: number;
  name: string;
}