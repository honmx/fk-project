import { Box, Container, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Sidebar from "@/components/Layout/Sidebar";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import BackButton from "@/components/UI/BackButton";
import { selectApplicationsFilterValues } from "@/data/selectApplicationsFilterValues";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { IApplication } from "@/types/IApplication";
import { ApplicationsContext } from "@/contexts/ApplicationsContext";
import ApplicationsGroup from "@/components/Widgets/ApplicationsGroup";

interface Props {

}

const ApplicationsPage: INextPageWithLayout<Props> = ({ }) => {

  const { user, isLoading } = useCheckAuth({ routeToPushIfNoAuth: "/auth" });

  const [applications, setApplications] = useState<IApplication[]>([]);
  const [name, setName] = useState<string>("");
  const [selectValueId, setSelectValueId] = useState<number>(selectApplicationsFilterValues[0].id);
  
  const debouncedName = useDebounce(name, 500);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setSelectValueId(Number(e.target.value));
  }

  if (isLoading || !user) return null;

  return (
    <>
      <Head>
        <title>FootyKids</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <ApplicationsContext.Provider value={{ applications, setApplications }}>
        <Container maxWidth="tablet" sx={{ height: "100%" }}>
          <BackButton sx={{ marginBottom: 2 }} />
          <Paper sx={{ padding: 2, overflow: "visible" }}>
            <Stack spacing={3}>
              <Stack spacing={5} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography fontSize={28}>Заявки</Typography>
                <Select value={selectValueId} onChange={handleSelectChange}>
                  {
                    selectApplicationsFilterValues.map(filterValue => (
                      <MenuItem key={filterValue.id} value={filterValue.id}>{filterValue.text}</MenuItem>
                    ))
                  }
                </Select>
              </Stack>
              <TextField variant="standard" placeholder="Имя/фамилия" value={name} onChange={handleNameChange} sx={{ width: "200px" }} />
              <ApplicationsGroup debouncedName={debouncedName} selectValueId={selectValueId} />
            </Stack>
          </Paper>
        </Container>
      </ApplicationsContext.Provider>
    </>
  )
};

ApplicationsPage.getLayout = (page) => {
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

export default ApplicationsPage;