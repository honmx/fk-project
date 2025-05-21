import { IChild } from "@/types/IChild";

export const getUserGroupAmountOfTrainingsInSubscription = (user: IChild) => {
  return user.groups && user.groups.length > 0
    ? user.groups[0].amountOfTrainingsInSubscription
    : 8;
}