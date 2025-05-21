import { IPlace } from "./IPlace";

export interface ITrainingByDayOfTheWeek {
  id: number;
  dayOfTheWeek: number;
  time: string;
  scheduleId: number;
  place: IPlace
}