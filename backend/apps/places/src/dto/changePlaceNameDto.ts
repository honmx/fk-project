import { IsNumber, IsString } from "class-validator";

export class ChangePlaceNameDto { 
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}