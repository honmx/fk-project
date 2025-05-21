import { IsArray, IsString } from "class-validator";

export class ChangeGroupNameDto { 
  @IsString()
  name: string;
}