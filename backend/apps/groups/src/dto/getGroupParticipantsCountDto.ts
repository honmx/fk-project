import { IsNumber } from "class-validator";

export class GetGroupParticipantsCountDto { 
  @IsNumber()
  id: number;
}