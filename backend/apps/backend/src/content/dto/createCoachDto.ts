import { IsString, IsNotEmpty, Matches, IsArray, IsOptional } from "class-validator";

export class CreateCoachDto {
  @IsNotEmpty()
  @IsString()
  type: "Тренер" | "Главный тренер" | "Руководитель";
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d\d.\d\d.\d\d\d\d$/)
  birth: string;

  @IsOptional()
  @IsArray()
  education?: string[];

  @Matches(/^\d{1,2}$/)
  startedPlaying: number;

  @IsString()
  firstCoachName: string;
  
  @IsOptional()
  @IsString()
  currentTeam?: string;

  @IsOptional()
  @IsArray()
  teams?: string[];

  @IsOptional()
  @IsArray()
  achievements?: string[];
}