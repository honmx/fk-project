import { Box, Container, Stack } from "@mui/material";
import { FC } from "react";
import AdvantagesCard from "../Cards/AdvantagesCard";
import { incline } from "@/helpers/incline";

interface Props {
  coachesCount: number;
}

const AdvantagesCardsGroup: FC<Props> = ({ coachesCount }) => {
  return (
    <Box>
      <Container>
        <Stack
          direction="row"
          display="grid"
          gridTemplateColumns={{
            smallPhone: "1fr 1fr",
            tablet: "1fr 1fr 1fr 1fr"
          }}
          justifyItems={{
            smallPhone: "center",
            tablet: "none"
          }}
          columnGap={5}
          rowGap={2}
        >
          <AdvantagesCard
            accentText="5+" usualText="лет опыта"
            data-aos="zoom-in" data-aos-delay="0"
          />
          <AdvantagesCard
            accentText={coachesCount.toString()} usualText={incline(coachesCount, "тренер", "тренера", "тренеров")}
            data-aos="zoom-in" data-aos-delay="50"
          />
          <AdvantagesCard
            accentText="250+" usualText="детей"
            data-aos="zoom-in" data-aos-delay="100"
          />
          <AdvantagesCard
            accentText="5+" usualText="лет опыта"
            data-aos="zoom-in" data-aos-delay="150"
          />
        </Stack>
      </Container>
    </Box>
  )
};

export default AdvantagesCardsGroup;
