import { IsString } from "class-validator";

export class ChangePlaceNameDto { 
  @IsString()
  name: string;
}