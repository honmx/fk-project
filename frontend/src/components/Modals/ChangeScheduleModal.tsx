import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import smallPlusIcon from "@/assets/small plus icon.svg";
import { GroupContext } from "@/contexts/groupContext";
import { ITrainingByDayOfTheWeek } from "@/types/ITrainingByDayOfTheWeek";
import { DateContext } from "@/contexts/dateContext";
import TrainingByDayOfTheWeekItem from "../Items/TrainingByDayOfTheWeekItem";
import { IPlace } from "@/types/IPlace";
import placesService from "@/services/placesService";
import groupsService from "@/services/groupsService";
import { useRequest } from "@/hooks/useRequest";
import plusIcon from "@/assets/plus icon.svg";

interface Props extends IModalProps {

}

const ChangeScheduleModal: FC<Props> = ({ open, handleCloseClick }) => {

  const { group, setGroup } = useContext(GroupContext);
  const { year, monthIndex } = useContext(DateContext);

  const currentSchedule = group.schedule.find(schedule => schedule.date === `0${monthIndex + 1}`.slice(-2) + `.${year}`);

  const [trainings, setTrainings] = useState<ITrainingByDayOfTheWeek[]>(currentSchedule?.trainingsByDayOfTheWeek.sort((a, b) =>
    (a.dayOfTheWeek === 0 ? 7 : a.dayOfTheWeek) - (b.dayOfTheWeek === 0 ? 7 : b.dayOfTheWeek)
  ) || []);

  const [error, setError] = useState<string>("");

  const { data: places, isLoading, error: placesError } = useRequest(() => placesService.getPlaces(), [], [open], () => !open);

  useEffect(() => {
    setTrainings(currentSchedule?.trainingsByDayOfTheWeek.sort((a, b) =>
      (a.dayOfTheWeek === 0 ? 7 : a.dayOfTheWeek) - (b.dayOfTheWeek === 0 ? 7 : b.dayOfTheWeek)
    ) || []);
    setError("");
  }, [year, monthIndex, open]);

  const handleCreateTrainingClick = () => {
    setTrainings([
      ...trainings,
      { id: Math.floor(Math.random() * 10000000), dayOfTheWeek: 1, time: "18:00", place: { id: 1 } as IPlace } as ITrainingByDayOfTheWeek
    ]);
  }

  const handleChangeTraining = (trainingId: number, dayOfTheWeek: number, time: string, placeId: number) => {
    setTrainings(trainings.map(training => training.id === trainingId
      ? { id: trainingId, dayOfTheWeek, time, place: { id: placeId } } as ITrainingByDayOfTheWeek
      : training
    ));
  }

  const handleDeleteTrainingClick = (id: number) => {
    setTrainings(trainings.filter(training => training.id !== id));
  }

  const handleCreateSchedule = async () => {
    if (Array.from(new Set(trainings.map(training => training.dayOfTheWeek))).length !== trainings.length) {
      setError("Дни тренировок должны быть уникальны");
      return;
    }

    try {
      const newSchedule = await groupsService.createSchedule(
        group.id,
        `0${monthIndex + 1}`.slice(-2) + `.${year}`,
        trainings.map(({ dayOfTheWeek, time, place }) => ({ dayOfTheWeek, time, placeId: place.id }))
      );

      if (newSchedule) {
        setGroup({ ...group, schedule: newSchedule });
      }

      handleCloseClick();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    }
  }

  // if (isLoading) {}

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Изменение расписания</Typography>
        <Box>
          <Box>
            {
              trainings.map((training, i) => (
                <TrainingByDayOfTheWeekItem
                  key={training.id}
                  training={training}
                  places={places}
                  onChangeTraining={handleChangeTraining}
                  onDeleteTrainingClick={handleDeleteTrainingClick}
                  sx={{ borderBottom: i !== trainings.length - 1 ? "1px solid #DDD" : 0 }}
                />
              ))
            }
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <IconButton color="black" onClick={handleCreateTrainingClick}>
              <Image src={plusIcon} alt="plus" width={20} height={20} />
            </IconButton>
          </Box>
          {
            error && <Typography color="error">{error}</Typography>
          }
        </Box>
        <Button onClick={handleCreateSchedule}>Применить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default ChangeScheduleModal;