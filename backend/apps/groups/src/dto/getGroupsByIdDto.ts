import { IsArray, IsNumber } from "class-validator";

export class GetGroupsByIdDto { 
  @IsArray()
  groupsId: number[];
}