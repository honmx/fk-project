import { DateContext } from "@/contexts/dateContext";
import { GroupContext } from "@/contexts/groupContext";
import { ChangedTrainingType } from "@/types/IChangedTraining";
import { ISchedule } from "@/types/ISchedule";
import { ITrainingByDay } from "@/types/ITrainingByDay";
import { useContext } from "react";

interface IProps {
  initialTraining: ChangedTrainingType;
  changedTraining: ChangedTrainingType;
  handleErrorChange: (message: string) => void;
  requestFn: () => Promise<ISchedule[] | undefined>;
  handleCloseClick: () => void;
}

export const useTrainingRequest = ({ initialTraining, changedTraining, handleErrorChange, requestFn, handleCloseClick }: IProps) => {

  const { group, setGroup } = useContext(GroupContext);
  const { year, monthIndex } = useContext(DateContext);

  const currentSchedule = group.schedule.find(schedule => schedule.date === `0${monthIndex + 1}`.slice(-2) + `.${year}`);

  const makeRequest = async () => {
    if (initialTraining.date !== changedTraining.date
      && currentSchedule?.trainingsByDay.find(trainingByDay => changedTraining.date === trainingByDay.date)
    ) {
      handleErrorChange("У вас уже есть тренировка в эту дату");
      return;
    }

    try {
      const newSchedule = await requestFn();
      
      if (newSchedule) {
        setGroup({ ...group, schedule: newSchedule });
      }
  
      handleCloseClick();

    } catch (error: any) {
      handleErrorChange(error?.response?.data?.message);
    }
  }

  return { makeRequest };
}