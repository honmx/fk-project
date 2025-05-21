import { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import CoachCard from "../Cards/CoachCard";
import Carousel from "../UI/Carousel";
import { useResize } from "@/hooks/useResize";
import { ICoach } from "@/types/ICoach";
import Subtitle from "../UI/Subtitle";

interface Props {
  title: string;
  coaches: ICoach[];
}

const CoachesGroup: FC<Props> = ({ title, coaches }) => {

  const isTablet = useResize("laptop");

  return (
    <Box>
      <Container>
        <Subtitle sx={{ marginBottom: 3 }}>{title}</Subtitle>
        {
          !isTablet &&
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 3,
            }}
          >
            {
              coaches.map((coach, i) => (
                <CoachCard
                  key={coach.id}
                  coach={coach}
                  data-aos="zoom-in"
                  data-aos-delay={i * 50}
                />
              ))
            }
          </Box>
        }
      </Container>
      {
        isTablet &&
        <Carousel>
          {
            coaches.map((coach, i) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                data-aos="zoom-in"
                data-aos-delay={i * 50}
              />
            ))
          }
        </Carousel>
      }
    </Box>
  )
};

export default CoachesGroup;
