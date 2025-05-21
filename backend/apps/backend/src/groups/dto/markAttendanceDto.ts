import { IsArray, IsNumber, IsString } from "class-validator";

export class MarkAttendanceDto { 
  @IsString()
  date: string;

  @IsArray()
  attendanceData: {
    userId: number;
    attendance: "П" | "УП" | "НП" | "Б" | null;
  }[];
}