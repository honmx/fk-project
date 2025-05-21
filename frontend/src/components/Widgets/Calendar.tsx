import { FC, useContext, useEffect, useState } from "react";
import { DateContext } from "@/contexts/dateContext";
import { GroupContext } from "@/contexts/groupContext";
import { daysOfTheWeek } from "@/data/daysOfTheWeek";
import { getCurrentCalendarDates } from "@/helpers/getCurrentCalendarDates";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import CalendarGridCell from "./CalendarGridCell";

interface Props {

}

const Calendar: FC<Props> = ({ }) => {

  const { group } = useContext(GroupContext);
  const { monthIndex, year } = useContext(DateContext);

  const [currentCalendarDates, setCurrentCalendarDates] = useState<Date[]>([]);

  useEffect(() => {
    setCurrentCalendarDates(getCurrentCalendarDates(year, monthIndex));
  }, [year, monthIndex]);

  return (
    <Paper sx={{ overflow: "visible" }}>
      <Grid container>
        {
          daysOfTheWeek.map(day => (
            <Grid key={day.dayIndex} item xs={12 / 7} sx={{ textAlign: "center", padding: 0.5, fontWeight: 300, borderBottom: "1px solid #CCC" }}>
              <Typography>{day.value}</Typography>
            </Grid>
          ))
        }
        {
          currentCalendarDates.map((date, i) => (
            <CalendarGridCell
              key={date.toLocaleDateString()}
              date={date}
              sx={{
                borderBottom: currentCalendarDates.length - i > 7 ? "1px solid #CCC" : 0,
                borderRight: (i + 1) % 7 !== 0 || i === 0 ? "1px solid #CCC" : 0
              }}
            />
          ))
        }
      </Grid>
    </Paper>
  )
};

export default Calendar;