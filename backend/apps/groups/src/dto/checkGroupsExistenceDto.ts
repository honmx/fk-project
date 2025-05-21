import { IsArray, IsNumber } from "class-validator";

export class CheckGroupsExistenceDto { 
  @IsArray()
  groupsId: number[];
}