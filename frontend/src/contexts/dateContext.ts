import { Dispatch, SetStateAction, createContext } from "react";

interface IDateContext {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}

export const DateContext = createContext<IDateContext>({
  monthIndex: 0,
  setMonthIndex: () => {},
  year: 0,
  setYear: () => {},
});