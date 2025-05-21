import { IGroup } from "@/types/IGroup";

export const sortGroupSchedules = (group: IGroup) => {
  return {
    ...group,
    schedule: group.schedule.sort((a, b) => {
      const [aMonth, aYear] = a.date.split(".");
      const [bMonth, bYear] = b.date.split(".");

      const aDate = new Date(Number(aYear), Number(aMonth));
      const bDate = new Date(Number(bYear), Number(bMonth));

      return aDate > bDate ? 1 : -1;
    })
  }
}