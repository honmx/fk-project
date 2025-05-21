import { AttendanceType } from "./AttendanceType";
import { ITrainingByDay } from "./ITrainingByDay";

export interface IHistoryItem {
  id: number;
  attendance: AttendanceType;
  training: ITrainingByDay;
}