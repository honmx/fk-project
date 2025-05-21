import { IModalProps } from "@/types/IModalProps";
import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ITrainingByDay } from "@/types/ITrainingByDay";
import CalendarGridCell from "../Widgets/CalendarGridCell";
import groupsService from "@/services/groupsService";
import { GroupContext } from "@/contexts/groupContext";

interface Props extends IModalProps {
  training: ITrainingByDay;
}

const DeleteTrainingModal: FC<Props> = ({ open, handleCloseClick, training }) => {

  const { group, setGroup } = useContext(GroupContext);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
  }, [open]);

  const handleDeleteTrainingClick = async () => {
    try {
      const newSchedule = await groupsService.deleteTraining(group.id, training.date);

      if (newSchedule) {
        setGroup({ ...group, schedule: newSchedule });
      }

      handleCloseClick();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={26}>Удаление тренировки</Typography>
        <Box>
          <Typography>{training.date}, {training.time}, {training.place.name}</Typography>
          {
            error &&
            <Typography color="error">{error}</Typography>
          }
        </Box>
        <Button onClick={handleDeleteTrainingClick}>Удалить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default DeleteTrainingModal;