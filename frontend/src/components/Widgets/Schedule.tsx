import { FC, useEffect, useState } from "react";
import PickDateSelectsGroup from "./PickDateSelectsGroup";
import { Box, Stack } from "@mui/material";
import Calendar from "./Calendar";
import { DateContext } from "@/contexts/dateContext";
import ChangeScheduleButton from "../ModalButtons/ChangeScheduleButton";

interface Props {

}

const Schedule: FC<Props> = ({ }) => {

  const [monthIndex, setMonthIndex] = useState<number>(Number(new Date().toLocaleDateString().slice(3, 5)) - 1);
  const [year, setYear] = useState<number>(Number(new Date().toLocaleDateString().slice(6)));

  return (
    <>
      <DateContext.Provider value={{ monthIndex, setMonthIndex, year, setYear }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <PickDateSelectsGroup />
          <ChangeScheduleButton />
        </Box>
        <Calendar />
      </DateContext.Provider>
    </>
  )
};

export default Schedule;