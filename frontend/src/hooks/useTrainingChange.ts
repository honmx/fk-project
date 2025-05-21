import { DateContext } from "@/contexts/dateContext";
import { ChangedTrainingType } from "@/types/IChangedTraining";
import { IPlace } from "@/types/IPlace";
import { useContext, useEffect, useState } from "react";

export const useTrainingChange = (date: string, places: IPlace[]) => {

  const { monthIndex, year } = useContext(DateContext);

  const [changedTraining, setChangedTraining] = useState<ChangedTrainingType>({
    id: Math.round(Math.random() * 10000),
    date,
    time: "18:00",
    place: { id: places?.[0]?.id || 1 } as IPlace,
  });

  useEffect(() => {
    setChangedTraining({
      id: Math.round(Math.random() * 10000),
      date,
      time: "18:00",
      place: { id: places?.[0]?.id } as IPlace,
    });
  }, [places]);

  const handleChangeTraining = (date: number, time: string, placeId: number) => {
    setChangedTraining({
      id: changedTraining.id,
      date: `${date < 10 ? `0${date}` : date}.` + `0${monthIndex + 1}`.slice(-2) + `.${year}`,
      time,
      place: { id: placeId } as IPlace
    });
  }

  return { changedTraining, handleChangeTraining };
}