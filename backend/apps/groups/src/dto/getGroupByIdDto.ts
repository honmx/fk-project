import { IsNumber } from "class-validator";

export class GetGroupByIdDto { 
  @IsNumber()
  id: number;
}