import { IsArray, IsString } from "class-validator";

export class GetGroupByNameDto { 
  @IsString()
  name: string;
}