import { FC } from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import banner from "@/assets/photo-bg.jpg";
import DarkForeground from "@/components/UI/DarkForeground";
import Title from "@/components/UI/Title";
import SectionWrapper from "../Wrappers/SectionWrapper";

interface Props {

}

const MainBanner: FC<Props> = ({ }) => {

  return (
    <SectionWrapper id="#" sx={{ position: "relative", marginTop: "-69.8px" }}>
      <DarkForeground>
        <Image src={banner} alt="banner" style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "top",
          filter: "grayscale(100%)",
        }} />
      </DarkForeground>
      <Box
        position="absolute"
        sx={{
          top: "50%",
          left: "15px",
          transform: "translateY(-50%)",
          color: "typography.light"
        }}>
        <Stack direction="column" spacing={3}>
          <Title type="main" data-aos="zoom-in">
            <Typography
              fontSize={{
                smallPhone: "50px !important",
                middlePhone: "65px !important",
                largePhone: "80px !important",
                tablet: "85px !important",
                laptop: "90px !important",
                desktop: "100px !important"
              }}
              fontWeight={700}
              component="h1"
            >
              FootyKids
            </Typography>
          </Title>
          <Typography
            lineHeight={1.2}
            fontSize={{
              smallPhone: 16,
              tablet: 22,
              desktop: 28,
            }}
            fontWeight={600}
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            Футбольная школа <br /> для детей от 4 лет
          </Typography>
          <Typography
            lineHeight={1.2}
            fontSize={{
              smallPhone: 16,
              tablet: 22,
              desktop: 28,
            }}
            fontWeight={600}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Мы учим детей любить спорт!
          </Typography>
          <Box data-aos="zoom-in" data-aos-delay="200">
            <Button
              component={Link}
              href="#contact"
              color="glassy"
              sx={{ alignSelf: "flex-start" }}
            >
              Бесплатное занятие
            </Button>
          </Box>
        </Stack>
      </Box>
    </SectionWrapper>
  )
};

export default MainBanner;
