import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { ITrainingByDay } from "@/types/ITrainingByDay";
import { GroupContext } from "@/contexts/groupContext";
import UserMarkAttendanceItem from "../Items/UserMarkAttendanceItem";
import { IMarkAttendanceItem } from "@/types/IMarkAttendanceItem";
import { AttendanceType } from "@/types/AttendanceType";
import groupsService from "@/services/groupsService";
import { DateContext } from "@/contexts/dateContext";
import { useRequest } from "@/hooks/useRequest";

interface Props extends IModalProps {
  training: ITrainingByDay;
}

const MarkAttendanceModal: FC<Props> = ({ open, handleCloseClick, training }) => {

  const { group, setGroup } = useContext(GroupContext);

  const {
    data: personTrainings,
    isLoading: isPersonTrainingsLoading,
    error: personTrainingsError
  } = useRequest(() => groupsService.getAttendance(group.id, training.date), [], [open], () => !open);

  const [markedUsers, setMarkedUsers] = useState<IMarkAttendanceItem[]>(group.participants.map(participant => ({ userId: participant.id, attendance: null })));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setMarkedUsers(markedUsers.map(attendanceItem => {
      const currentUserPersonTraining = personTrainings.find(training => training.userId === attendanceItem.userId);

      return currentUserPersonTraining
        ? { userId: currentUserPersonTraining.userId, attendance: currentUserPersonTraining.attendance }
        : attendanceItem
    }))
  }, [personTrainings]);

  useEffect(() => {
    setMarkedUsers(group.participants.map(participant => ({ userId: participant.id, attendance: null })));
    setError("");
  }, [open]);

  const handleMarkAttendanceItemChange = (id: number, attendance: AttendanceType) => {
    const isSameMark = markedUsers.find(user => user.userId === id && user.attendance === attendance);

    setMarkedUsers(
      markedUsers.map(attendanceItem => attendanceItem.userId === id
        ? { userId: id, attendance: isSameMark ? null : attendance }
        : attendanceItem)
    );
  }

  const handleMarkAttendanceClick = async () => {
    try {
      setIsLoading(true);

      const participants = await groupsService.markAttendance(group.id, training.date, markedUsers, group.amountOfTrainingsInSubscription);

      setGroup({ ...group, participants });

      handleCloseClick();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Отметить детей</Typography>
        <Typography>{training.date}, {training.time}, {training.place.name}</Typography>
        {
          isPersonTrainingsLoading
            ? <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
            : <Box>
              {
                group.participants
                  .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                  .map((participant, i) => (
                    <UserMarkAttendanceItem
                      key={participant.id}
                      user={participant}
                      attendance={markedUsers.find(user => user.userId === participant.id)?.attendance || null}
                      handleMarkAttendanceItemChange={handleMarkAttendanceItemChange}
                      sx={{ borderBottom: i < group.participants.length - 1 ? "1px solid #DDD" : 0 }}
                    />
                  ))
              }
              {
                error && <Typography color="error">{error}</Typography>
              }
            </Box>
        }
        <Button onClick={handleMarkAttendanceClick} disabled={isLoading}>Отметить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default MarkAttendanceModal;