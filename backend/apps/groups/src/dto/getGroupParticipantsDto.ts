import { IsNumber } from "class-validator";

export class GetGroupParticipantsDto { 
  @IsNumber()
  id: number;
}