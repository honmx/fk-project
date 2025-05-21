import { FC, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Sidebar from "@/components/Layout/Sidebar";
import groupsService from "@/services/groupsService";
import { IGroup } from "@/types/IGroup";
import Link from "next/link";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import CreateGroupButton from "@/components/ModalButtons/CreateGroupButton";
import { GroupsContext } from "@/contexts/groupsContext";
import GroupCard from "@/components/Cards/GroupCard";
import BackButton from "@/components/UI/BackButton";
import { useRequest } from "@/hooks/useRequest";
import GroupsGroup from "@/components/Widgets/GroupsGroup";

interface Props {

}

const GroupsPage: INextPageWithLayout<Props> = ({ }) => {

  const { user, isLoading } = useCheckAuth({ routeToPushIfNoAuth: "/auth" });

  const { data: groups, setData: setGroups, isLoading: isGroupsLoading, error } = useRequest(() => groupsService.getGroups(), [], []);

  if (isLoading || !user) return null;

  return (
    <>
      <Head>
        <title>FootyKids</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <GroupsContext.Provider value={{ groups, setGroups }}>
        <Box>
          <Container>
            <Stack direction="row" spacing={5} sx={{ justifyContent: "space-between", marginBottom: 2 }}>
              <BackButton />
              <CreateGroupButton />
            </Stack>
            <GroupsGroup groups={groups} />
          </Container>
        </Box>
      </GroupsContext.Provider>
    </>
  )
};

GroupsPage.getLayout = (page) => {
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

export default GroupsPage;