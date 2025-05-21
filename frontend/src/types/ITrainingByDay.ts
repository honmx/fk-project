import { IPlace } from "./IPlace";

export interface ITrainingByDay {
  id: number;
  date: string;
  time: string;
  scheduleId: number;
  place: IPlace
}