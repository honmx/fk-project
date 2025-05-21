import { ITrainingByDay } from "./ITrainingByDay";
import { ITrainingByDayOfTheWeek } from "./ITrainingByDayOfTheWeek";

export interface ISchedule {
  id: number;
  date: string;
  groupId: number;
  trainingsByDayOfTheWeek: ITrainingByDayOfTheWeek[]
  trainingsByDay: ITrainingByDay[]
}