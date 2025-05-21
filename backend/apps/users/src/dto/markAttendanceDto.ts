import { IsArray, IsNumber, IsString } from "class-validator";

export class MarkAttendanceDto {
  @IsNumber()
  groupId: number;

  @IsString()
  date: string;

  @IsNumber()
  amountOfTrainingsInSubscription: number;

  @IsArray()
  personTrainings: {
    id: number;
    attendance: "П" | "УП" | "НП" | "Б";
    trainingByDayId: number;
    userId: number;
  }[]

  @IsArray()
  attendanceData: {
    userId: number;
    attendance: "П" | "УП" | "НП" | "Б" | null;
  }[];
}