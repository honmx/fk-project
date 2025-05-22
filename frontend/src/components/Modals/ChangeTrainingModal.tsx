import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { getCurrentCalendarDates } from "@/helpers/getCurrentCalendarDates";
import { DateContext } from "@/contexts/dateContext";
import { ITrainingByDay } from "@/types/ITrainingByDay";
import TrainingByDayItem from "../Items/TrainingByDayItem";
import groupsService from "@/services/groupsService";
import { GroupContext } from "@/contexts/groupContext";
import { IPlace } from "@/types/IPlace";
import { useTrainingChange } from "@/hooks/useTrainingChange";
import { useTrainingRequest } from "@/hooks/useTrainingRequest";
import { useRequest } from "@/hooks/useRequest";
import placesService from "@/services/placesService";

interface Props extends IModalProps {
  training: ITrainingByDay;
}

const ChangeTrainingModal: FC<Props> = ({ open, handleCloseClick, training }) => {

  const { group } = useContext(GroupContext);

  const [error, setError] = useState<string>("");

  const { data: places, isLoading, error: placesError } = useRequest(() => placesService.getPlaces(), [], [open], () => !open);

  // @ts-ignore
  const { changedTraining, handleChangeTraining } = useTrainingChange(training);

  const { makeRequest } = useTrainingRequest({
    initialTraining: training,
    changedTraining,
    handleErrorChange: (message: string) => setError(message),
    requestFn: () => groupsService.changeTraining(group.id, training.id, changedTraining.date, changedTraining.time, changedTraining.place.id),
    handleCloseClick
  });

  useEffect(() => {
    handleChangeTraining(Number(training.date.slice(0, 2)), training.time, training.place.id);
    setError("");
  }, [open]);

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Изменение тренировки</Typography>
        <Box>
          <TrainingByDayItem
            training={changedTraining}
            onChangeTraining={handleChangeTraining}
            places={places}
          />
          {
            error && <Typography color="error">{error}</Typography>
          }
        </Box>
        <Button onClick={makeRequest}>Применить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default ChangeTrainingModal;