import { IsArray, IsString } from "class-validator";

export class AddChildrenDto { 
  @IsArray()
  childrenId: number[];
}