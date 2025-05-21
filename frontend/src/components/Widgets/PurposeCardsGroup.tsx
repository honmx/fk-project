import { purposes } from "@/data/purposes";
import { Box, Container } from "@mui/material";
import { FC } from "react";
import PurposeCard from "../Cards/PurposeCard";
import Subtitle from "../UI/Subtitle";

interface Props {

}

const PurposeCardsGroup: FC<Props> = ({ }) => {
  return (
    <Box>
      <Subtitle textAlign="center">Цели проекта</Subtitle>
      <Container sx={{
        display: "grid",
        gridTemplateAreas: {
          smallPhone: `
              "a"
              "b"
              "c"
              "d"
            `,
          smallTablet: `
              "a a a . . . ."
              "a a a . b b b"
              "c c c . b b b"
              "c c c . d d d"
              "c c c . d d d"
              ". . . . d d d"
            `,
        },
      }}>
        {
          purposes.map((purpose, i) => (
            <PurposeCard
              key={purpose.text}
              count={purpose.count}
              gridArea={purpose.gridArea}
              justifySelf={{
                smallPhone: "none",
                smallTablet: purpose.justifySelf
              }}
              data-aos={i % 2 === 0 ? "slide-right" : "slide-left"}
            >
              {purpose.text}
            </PurposeCard>
          ))
        }
      </Container>
    </Box>
  )
};

export default PurposeCardsGroup;
