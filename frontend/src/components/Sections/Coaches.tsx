import { FC } from "react";
import { Typography } from "@mui/material";
import SectionWrapper from "../Wrappers/SectionWrapper";
import Title from "../UI/Title";
import { ICoach } from "@/types/ICoach";
import CoachesGroup from "../Widgets/CoachesGroup";

interface Props {
  coaches: ICoach[];
}

const Coaches: FC<Props> = ({ coaches }) => {

  if (coaches.length === 0) return;

  return (
    <SectionWrapper id="coaches" title="Тренерский состав">
      <CoachesGroup
        title="Руководитель и главный тренер"
        coaches={coaches.filter(coach => coach.type !== "Тренер")}
      />
      <CoachesGroup
        title="Тренеры"
        coaches={coaches.filter(coach => coach.type === "Тренер")}
      />
    </SectionWrapper>
  )
};

export default Coaches;
