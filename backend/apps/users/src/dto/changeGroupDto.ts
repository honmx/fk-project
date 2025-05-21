import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNumber, IsString, Length, MaxLength } from "class-validator";

export class ChangeGroupDto {
  @IsNumber()
  id: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  groupsId: number[];

  @IsNumber()
  previousGroupAmountOfTrainingsInSubscription: number;
}