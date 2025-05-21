import { Box, Button, Container, Stack } from "@mui/material";
import Head from "next/head";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Sidebar from "@/components/Layout/Sidebar";
import { IGroup } from "@/types/IGroup";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import BackButton from "@/components/UI/BackButton";
import CreatePlaceButton from "@/components/ModalButtons/CreatePlaceButton";
import PlacesGroup from "@/components/Widgets/PlacesGroup";
import { PlacesContext } from "@/contexts/placesContext";
import { useState } from "react";
import { IPlace } from "@/types/IPlace";
import { useRequest } from "@/hooks/useRequest";
import placesService from "@/services/placesService";

interface Props {

}

const PlacesPage: INextPageWithLayout<Props> = ({ }) => {

  const { user, isLoading } = useCheckAuth({ routeToPushIfNoAuth: "/auth" });

  const { data: places, setData: setPlaces, isLoading: isPlacesLoading, error } = useRequest(() => placesService.getPlaces(), [], []);

  if (isLoading || !user) return null;

  return (
    <>
      <Head>
        <title>FootyKids</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <PlacesContext.Provider value={{ places, setPlaces }}>
        <Container maxWidth="tablet" sx={{ height: "100%" }}>
          <Stack spacing={3}>
            <Stack spacing={5} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <BackButton />
              <CreatePlaceButton />
            </Stack>
            <PlacesGroup places={places} />
          </Stack>
        </Container>
      </PlacesContext.Provider>
    </>
  )
};

PlacesPage.getLayout = (page) => {
  return (
    <Layout
      renderHeader={() => <Header />}
      renderFooter={() => <Footer />}
      renderSidebar={() => <Sidebar />}
    >
      <Box sx={{ paddingTop: 3, paddingBottom: 3, height: "100%" }}>
        {page}
      </Box>
    </Layout>
  )
}

export default PlacesPage;