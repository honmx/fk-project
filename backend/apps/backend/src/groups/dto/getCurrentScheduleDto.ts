import { IsNumber, IsString } from "class-validator";

export class GetCurrentScheduleDto {
  @IsNumber()
  id: number;
  
  @IsNumber()
  month: number;
  
  @IsNumber()
  year: number;
}