import { ChangeEvent, FC, MouseEvent, memo, useEffect, useState } from "react";
import { IChild } from "@/types/IChild";
import { Box, FormControlLabel, Radio, RadioGroup, Stack, StackProps, Typography } from "@mui/material";
import Image from "next/image";
import userPhoto from "@/assets/user.jpg";
import { AttendanceType } from "@/types/AttendanceType";
import { arrayOfAttendanceVariants } from "@/helpers/arrayOfAttendanceVariants";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { getSurname } from "@/helpers/getSurname";
import { getName } from "@/helpers/getName";

interface Props extends StackProps {
  user: IChild;
  attendance: AttendanceType | null;
  handleMarkAttendanceItemChange: (id: number, attendance: AttendanceType) => void;
}

const UserMarkAttendanceItem: FC<Props> = ({ user, attendance, handleMarkAttendanceItemChange, sx, ...restProps }) => {

  const [value, setValue] = useState<AttendanceType | null>(attendance);

  const attendanceVariants = arrayOfAttendanceVariants(["П", "УП", "НП", "Б"]);
  
  useEffect(() => {
    if (!value) return;

    handleMarkAttendanceItemChange(user.id, value);
  }, [value]);

  const handleRadioClick = (e: any) => {
    const value = e?.target?.value;

    if (!value) return;

    handleMarkAttendanceItemChange(user.id, value);
  }

  return (
    <Stack
      direction="row"
      spacing={7.5}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 1,
        paddingBottom: 1,
        ...sx
      }}
      {...restProps}
    >
      <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        <Avatar photo={user.photo} />
        <Box>
          <Typography>{getSurname(user.name)}</Typography>
          <Typography>{getName(user.name)}</Typography>
          <Typography fontSize={12}>{user.birth}</Typography>
        </Box>
      </Stack>
      <Box>
        <RadioGroup row>
          {
            attendanceVariants.map(attendanceVariant => (
              <FormControlLabel
                key={attendanceVariant}
                value={attendanceVariant}
                control={<Radio size="small" checked={attendance === attendanceVariant} onClick={handleRadioClick} />}
                label={attendanceVariant}
                labelPlacement="top"
              />
            ))
          }
        </RadioGroup>
      </Box>
    </Stack>
  )
};

export default UserMarkAttendanceItem;