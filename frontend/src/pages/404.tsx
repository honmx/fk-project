import { FC } from "react";
import { NextPage } from "next";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {

}

const ErrorPage: NextPage = ({ }) => {

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  }

  return (
    <>
      <Head>
        <title>FootyKids</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden"
        }}
      >
        <Container sx={{ flex: "1 1 0" }}>
          <Stack
            spacing={1}
            sx={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              fontWeight={900}
              fontSize={{
                smallPhone: 170,
                tablet: 200,
                laptop: 250
              }}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#00000022"
              }}
            >
              404
            </Typography>
            <Typography
              component="h3"
              fontSize={{
                smallPhone: 16,
                tablet: 22,
                laptop: 30
              }}
            >
              Страница не найдена
            </Typography>
            <Button onClick={handleBackClick}>Назад</Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

export default ErrorPage;