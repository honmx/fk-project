import { IsNumber, IsString } from "class-validator";

export class GetAttendanceDto {
  @IsNumber()
  id: number;
  
  @IsString()
  date: string;
}