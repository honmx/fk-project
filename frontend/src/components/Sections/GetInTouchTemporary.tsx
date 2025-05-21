import { FC } from "react";
import SectionWrapper from "../Wrappers/SectionWrapper";
import bg from "@/assets/get-in-touch-bg.jpg";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DarkForeground from "../UI/DarkForeground";
import Link from "next/link";

interface Props {

}

const GetInTouchTemporary: FC<Props> = ({ }) => {
  return (
    <SectionWrapper id="contact" title="Записаться">
      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <Box sx={{ height: "100%" }}>
          <DarkForeground>
            <Image
              src={bg}
              alt="background photo"
              priority
              style={{
                height: "min(700px, 60vh)",
                objectFit: "cover",
                filter: "grayscale(100%)"
              }}
            />
          </DarkForeground>
        </Box>
        <Container sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
          <Stack spacing={2}>
            <Typography
              color="typography.light"
              fontSize={{
                smallPhone: 30,
                tablet: 50,
              }}
              fontWeight={500}
              textAlign="center"
            >
              Запишитесь на бесплатное пробное занятие
            </Typography>
            <Typography
              color="typography.light"
              fontSize={{
                smallPhone: 20,
                tablet: 26,
              }}
              fontWeight={500}
              textAlign="center"
            >
              +7-900-000-00-00
            </Typography>
            <Button
              component={Link}
              href="tel:+79000000000"
              color="glassy"
              sx={{ alignSelf: "center" }}
            >
              Позвонить
            </Button>
          </Stack>
        </Container>
      </Box>
    </SectionWrapper >
  )
};

export default GetInTouchTemporary;
