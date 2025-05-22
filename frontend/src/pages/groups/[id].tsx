import { FC, useContext, useEffect, useState } from "react";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import {
  Box,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Sidebar from "@/components/Layout/Sidebar";
import groupsService from "@/services/groupsService";
import { IGroup } from "@/types/IGroup";
import Link from "next/link";
import { GroupContext } from "@/contexts/groupContext";
import Image from "next/image";
import penIcon from "@/assets/pen icon.svg";
import { createPortal } from "react-dom";
import ChangeGroupNameModal from "@/components/Modals/ChangeGroupNameModal";
import Schedule from "@/components/Widgets/Schedule";
import { sortGroupSchedules } from "@/helpers/sortGroupSchedules";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Participants from "@/components/Widgets/Participants";
import ChangeGroupNameButton from "@/components/ModalButtons/ChangeGroupNameButton";
import BackButton from "@/components/UI/BackButton";

interface Props {
  group: IGroup;
}

const GroupPage: INextPageWithLayout<Props> = ({ group }) => {
  const { user, isLoading } = useCheckAuth({ routeToPushIfNoAuth: "/auth" });

  const [groupFromContext, setGroupFromContext] = useState<IGroup>(
    sortGroupSchedules(group)
  );

  if (isLoading || !user) return null;

  return (
    <>
      <Head>
        <title>FootyKids</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <GroupContext.Provider
        value={{ group: groupFromContext, setGroup: setGroupFromContext }}
      >
        <Container sx={{ height: "100%", position: "relative" }}>
          <Stack spacing={3}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <BackButton
                sx={{ position: "absolute", left: 0, aspectRatio: 0 }}
              />
              <Typography fontSize={22}>{groupFromContext.name}</Typography>
              <ChangeGroupNameButton />
            </Stack>
            <Schedule />
            <Participants />
          </Stack>
        </Container>
      </GroupContext.Provider>
    </>
  );
};

GroupPage.getLayout = (page) => {
  return (
    <Layout
      renderHeader={() => <Header />}
      renderFooter={() => <Footer />}
      renderSidebar={() => <Sidebar />}
    >
      <Box sx={{ paddingTop: 3, paddingBottom: 3, height: "100%" }}>{page}</Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const group = await groupsService.getGroupById(Number(context.params?.id));

  return {
    props: {
      group,
    },
  };
};

export default GroupPage;
