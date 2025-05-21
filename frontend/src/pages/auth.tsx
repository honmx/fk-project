import { FC, useContext, useState } from "react";
import { INextPageWithLayout } from "@/types/INextPageWithLayout";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import RegistrationForm from "@/components/Forms/RegistrationForm";
import LoginForm from "@/components/Forms/LoginForm";
import SendCodeToEmailForm from "@/components/Forms/SendCodeToEmailForm";
import ValidateCodeForm from "@/components/Forms/ValidateCodeForm";
import { IPasswordRecoveryData, PasswordRecoveryContext } from "@/contexts/passwordRecoveryContext";
import NewPasswordForm from "@/components/Forms/NewPasswordForm";
import { AuthContext } from "@/contexts/authContext";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useRouter } from "next/router";
import { IRegistrationData, RegistrationContext } from "@/contexts/registrationContext";

interface Props {

}

const AuthPage: INextPageWithLayout<Props> = ({ }) => {

  const router = useRouter();

  const [formIndex, setFormIndex] = useState<number>(0);

  const [passwordRecoveryData, setPasswordRecoveryData] = useState<IPasswordRecoveryData>({} as IPasswordRecoveryData);
  const [registrationData, setRegistrationData] = useState<IRegistrationData>({} as IRegistrationData);

  const { user, isLoading } = useCheckAuth({ routeToPushIfAuth: "/account" });

  if (isLoading || user) return null;

  return (
    <>
      <Head>
        <title>Авторизация</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/footykids-icon.png" />
      </Head>
      <Box sx={{ height: "100%" }}>
        <Container maxWidth="largePhone" sx={{ height: "100%" }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: "20px",
            padding: "40px 0"
          }}>
            {
              ...[
                [
                  <Typography key={0} fontSize={{ smallPhone: 26, middlePhone: 30 }}>Вход или регистрация</Typography>,
                  <LoginForm key={1} onRegistrationClick={() => setFormIndex(1)} onResetPasswordClick={() => setFormIndex(2)} />
                ],
                [
                  <RegistrationContext.Provider key={2} value={{ registrationData, setRegistrationData }}>
                    <Typography fontSize={30}>Регистрация</Typography>
                    <RegistrationForm onLoginClick={() => setFormIndex(0)} onRegistrationClick={() => setFormIndex(5)} />
                  </RegistrationContext.Provider>
                ],
                [
                  <PasswordRecoveryContext.Provider key={3} value={{ passwordRecoveryData, setPasswordRecoveryData }}>
                    <Typography fontSize={{ smallPhone: 24, middlePhone: 30 }}>Восстановление пароля</Typography>
                    <SendCodeToEmailForm onContinueClick={() => setFormIndex(3)} />
                  </PasswordRecoveryContext.Provider>
                ],
                [
                  <PasswordRecoveryContext.Provider key={4} value={{ passwordRecoveryData, setPasswordRecoveryData }}>
                    <Typography fontSize={{ smallPhone: 24, middlePhone: 30 }}>Восстановление пароля</Typography>
                    <Typography fontSize={14}>Мы выслали код Вам на почту, введите его в поле ниже, чтобы продолжить</Typography>
                    <ValidateCodeForm onContinueClick={() => setFormIndex(4)} />
                  </PasswordRecoveryContext.Provider>
                ],
                [
                  <PasswordRecoveryContext.Provider key={5} value={{ passwordRecoveryData, setPasswordRecoveryData }}>
                    <Typography fontSize={{ smallPhone: 24, middlePhone: 30 }}>Восстановление пароля</Typography>
                    <NewPasswordForm onContinueClick={() => setFormIndex(0)} />
                  </PasswordRecoveryContext.Provider>
                ],
                [
                  <RegistrationContext.Provider key={6} value={{ registrationData, setRegistrationData }}>
                    <Typography fontSize={30}>Регистрация</Typography>
                    <Typography fontSize={14}>Мы выслали код Вам на почту, введите его в поле ниже, чтобы продолжить</Typography>
                    <ValidateCodeForm onContinueClick={() => router.push("/account")} />
                  </RegistrationContext.Provider>
                ],
              ][formIndex]
            }
          </Box>
        </Container>
      </Box>
    </>
  )
};

AuthPage.getLayout = (page) => {
  return (
    <Layout
      renderHeader={() => <Header />}
      renderFooter={() => <Footer />}
    >
      <Box sx={{ height: "100%" }}>
        {page}
      </Box>
    </Layout>
  )
}


// export const getServerSideProps: GetServerSideProps = async (context) => {

//   const refreshToken = context.req?.headers.cookie?.split("=")[1] || "";
//   const user = await authService.validateRefreshToken(refreshToken);

//   if (user) {
//     return {
//       redirect: {
//         destination: "/account",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

export default AuthPage;