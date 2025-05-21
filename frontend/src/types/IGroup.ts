import { ISchedule } from "./ISchedule";
import { IChild } from "./IChild";

export interface IGroup {
  id: number;
  name: string;
  amountOfTrainingsInSubscription: number;
  participants: IChild[],
  schedule: ISchedule[],
}