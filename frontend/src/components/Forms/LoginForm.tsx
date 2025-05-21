import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Input, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import ControlledTextField from "../UI/ControlledTextField";
import CustomLink from "../UI/CustomLink";
import authService from "@/services/authService";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/authContext";
import { PasswordRecoveryContext } from "@/contexts/passwordRecoveryContext";
import { RegistrationContext } from "@/contexts/registrationContext";

const userLoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  .required();

interface IUserLoginFormInput extends InferType<typeof userLoginSchema> { }

interface Props {
  onRegistrationClick: () => void;
  onResetPasswordClick: () => void;
}

const LoginForm: FC<Props> = ({ onRegistrationClick, onResetPasswordClick }) => {

  const router = useRouter();

  const { setUser } = useContext(AuthContext);
  const { setPasswordRecoveryData } = useContext(PasswordRecoveryContext);
  const { setRegistrationData } = useContext(RegistrationContext);

  const { control, handleSubmit, setError, formState } = useForm<IUserLoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(userLoginSchema)
  });

  useEffect(() => {
    setPasswordRecoveryData({ email: "" });
    setRegistrationData({ name: "", parentName: "", birth: "", email: "", phone: "", password: "", });
  }, []);

  const onSubmit: SubmitHandler<IUserLoginFormInput> = async (data) => {
    try {
      const userData = await authService.login({ email: data.email, password: data.password });
      setUser(userData.user);
    } catch (error: any) {
      setError("root", { message: error.response.data.message });
    }
  }

  return (
    <Paper sx={{ padding: 2.5 }}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={1.5}>
          <ControlledTextField
            control={control}
            name="email"
            label="Почта"
            fullWidth
          />
          <ControlledTextField
            control={control}
            name="password"
            label="Пароль"
            type="password"
            fullWidth
          />
          {
            formState.errors.root?.message &&
            <Typography color="error">
              {
                Array.isArray(formState.errors.root.message)
                  ? formState.errors.root?.message[0]
                  : formState.errors.root?.message
              }
            </Typography>
          }
          <CustomLink
            component={"a" as unknown as "a"}
            underline="none"
            fontSize={14}
            sx={{ alignSelf: "flex-end", cursor: "pointer" }}
            onClick={onResetPasswordClick}
          >
            Забыли пароль?
          </CustomLink>
        </Stack>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Войти</Button>
      </form>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginTop: 0.5,
        marginBottom: -1.5
      }}>
        <Typography fontSize={14}>Нет аккаунта?</Typography>
        <CustomLink
          fontSize={14}
          component={"button" as unknown as "a"}
          underline="none"
          onClick={onRegistrationClick}
        >
          Регистрация
        </CustomLink>
      </Box>
    </Paper>
  )
};

export default LoginForm;