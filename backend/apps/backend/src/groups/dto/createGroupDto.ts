import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateGroupDto { 
  @IsString()
  name: string;

  @IsNumber()
  amountOfTrainingsInSubscription: number;
  
  @IsArray()
  participantsId: number[];
}