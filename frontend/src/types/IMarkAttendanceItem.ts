import { AttendanceType } from "./AttendanceType";

export interface IMarkAttendanceItem {
  userId: number;
  attendance: AttendanceType | null;
}