import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, Length, MaxLength } from "class-validator";

export class ChangeGroupDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  groupsId: number[];

  @IsNumber()
  previousGroupAmountOfTrainingsInSubscription: number;
}