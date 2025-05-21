import Head from "next/head";
import { GetStaticProps } from "next";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import MainBanner from "@/components/Sections/MainBanner";
import AboutUs from "@/components/Sections/AboutUs";
import Coaches from "@/components/Sections/Coaches";
import Faq from "@/components/Sections/Faq";
import { Box, Stack } from "@mui/material";
import contentService from "@/services/contentService";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import { ICoach } from "@/types/ICoach";
import News from "@/components/Sections/News";
import { INews } from "@/types/INews";
import GetInTouch from "@/components/Sections/GetInTouch";
import GetInTouchTemporary from "@/components/Sections/GetInTouchTemporary";
import Places from "@/components/Sections/Places";
import { useEffect, useState } from "react";
import { $contentAPI } from "@/http/contentAxios";
import ecotime from "@/assets/ecotime.jpg";
import Image from "next/image";
import ErrorPage from "./404";
import axios from "axios";

interface Props {
  coaches: ICoach[] | undefined;
  news: INews[] | undefined;
}

const HomePage: INextPageWithLayout<Props> = ({ coaches, news }) => {

  if (!coaches || !news) return <ErrorPage />;

  return (
    <>
      <Head>
        <title>FootyKids</title>
        <meta name="description" content="FootyKids - футбольная школа для детей от 4 лет" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "&>*:not(:first-child)": {
            paddingTop: "60px",
          }
        }}
      >
        <MainBanner />
        <AboutUs coachesCount={coaches.length} />
        <Coaches coaches={coaches} />
        <News news={news} />
        <Places />
        <Faq />
        {/* <GetInTouchTemporary /> */}
        <GetInTouch />
      </Box>
    </>
  )
}

HomePage.getLayout = (page) => {
  return (
    <Layout
      renderHeader={() => <Header />}
      renderFooter={() => <Footer marginTop={7.5}/>}
    >
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const coaches = await contentService.getCoaches();
  const news = await contentService.getNews();

  return {
    props: {
      coaches,
      news
    }
  }
}

export default HomePage;