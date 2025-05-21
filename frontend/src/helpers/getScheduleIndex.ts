import { ISchedule } from "@/types/ISchedule";

export const getScheduleIndex = (monthIndex: number, date: Date, schedule: ISchedule[]) => {
  return schedule.findIndex(scheduleItem => scheduleItem.date === date.toLocaleDateString().slice(3));
}