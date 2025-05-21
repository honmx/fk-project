import { IsArray, IsNumber, IsString } from "class-validator";

export class ChangeGroupNameDto {
  @IsNumber()
  id: number;
  
  @IsString()
  name: string;
}