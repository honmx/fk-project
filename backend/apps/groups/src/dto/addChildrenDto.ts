import { IsArray, IsNumber } from "class-validator";

export class AddChildrenDto {
  @IsNumber()
  id: number;

  @IsArray()
  childrenId: number[];
}