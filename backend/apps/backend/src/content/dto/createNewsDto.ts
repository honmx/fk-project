import { IsString } from "class-validator";

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  text: string;
}