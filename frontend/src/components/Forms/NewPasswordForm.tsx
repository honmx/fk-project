import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import ControlledTextField from "../UI/ControlledTextField";
import CustomLink from "../UI/CustomLink";
import authService from "@/services/authService";
import { PasswordRecoveryContext } from "@/contexts/passwordRecoveryContext";

const newPasswordSchema = yup
  .object({
    password: yup.string().min(8).required(),
    passwordAgain: yup.string().min(8).required()
  })
  .required();

interface IUserNewPasswordFormInput extends InferType<typeof newPasswordSchema> { }

interface Props {
  onContinueClick: () => void;
}

const NewPasswordForm: FC<Props> = ({ onContinueClick }) => {

  const { passwordRecoveryData } = useContext(PasswordRecoveryContext);

  const { control, handleSubmit, setError } = useForm<IUserNewPasswordFormInput>({
    defaultValues: {
      password: "",
      passwordAgain: "",
    },
    resolver: yupResolver(newPasswordSchema)
  });

  const onSubmit: SubmitHandler<IUserNewPasswordFormInput> = async (data) => {
    if (data.password !== data.passwordAgain) {
      setError("password", { type: "value", message: "Пароли не совпадают" });
      setError("passwordAgain", { type: "value", message: "Пароли не совпадают" });
      return;
    }

    try {
      await authService.recoverPassword({
        email: passwordRecoveryData.email,
        password: data.password
      });

      onContinueClick();
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
            name="password"
            label="Пароль"
            type="password"
            fullWidth
          />
          <ControlledTextField
            control={control}
            name="passwordAgain"
            label="Повторите пароль"
            type="password"
            fullWidth
          />
        </Stack>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Сменить пароль</Button>
      </form>
    </Paper>
  )
};

export default NewPasswordForm;