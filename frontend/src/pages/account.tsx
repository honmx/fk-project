import { ChangeEvent, FC, useEffect, useState } from "react";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Head from "next/head";
import { AuthContext } from "@/contexts/authContext";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Sidebar from "@/components/Layout/Sidebar";
import { coachLinks } from "@/data/coachLinks";
import Link from "next/link";
import Image from "next/image";
import ProfileCard from "@/components/Cards/ProfileCard";

interface Props {

}

const AccountPage: INextPageWithLayout<Props> = ({ }) => {

  const { user, isLoading } = useCheckAuth({ routeToPushIfNoAuth: "/auth" });

  if (isLoading || !user) return null;

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
        <meta name="description" content="Личный кабинет" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <Container maxWidth="tablet" sx={{ height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ProfileCard user={user} />
            </Grid>
            <Grid item container xs={6} spacing={2}>
              {
                coachLinks.map(link => (
                  <Grid item xs={6} key={link.alt}>
                    <Link href={link.href}>
                      <Paper
                        sx={{
                          position: "relative",
                          padding: 2,
                          aspectRatio: 1,
                          transition: "all 0.15s ease",
                          "&:hover": { backgroundColor: "#F5F5F5" }
                        }}
                      >
                        <Typography>{link.text}</Typography>
                        <Image
                          src={link.icon}
                          alt={link.alt}
                          style={{
                            position: "absolute",
                            bottom: -2,
                            right: 0,
                            filter: "grayscale(100%) invert(0.75)"
                          }}
                        />
                      </Paper>
                    </Link>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
};

AccountPage.getLayout = (page) => {
  return (
    <Layout
      renderHeader={() => <Header />}
      renderFooter={() => <Footer />}
      renderSidebar={() => <Sidebar />}
    >
      <Box sx={{ paddingTop: 3, paddingBottom: 3, height: "100%" }}>
        {page}
      </Box>
    </Layout >
  )
}

export default AccountPage;