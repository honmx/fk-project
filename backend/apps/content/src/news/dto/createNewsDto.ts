import { IsArray, IsString } from "class-validator";

export class CreateNewsDto {
  @IsArray()
  photos: string[];

  @IsString()
  title: string;
  
  @IsString()
  text: string;
}