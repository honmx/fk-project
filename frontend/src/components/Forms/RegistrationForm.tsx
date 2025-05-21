import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import ControlledTextField from "../UI/ControlledTextField";
import CustomLink from "../UI/CustomLink";
import authService from "@/services/authService";
import { RegistrationContext } from "@/contexts/registrationContext";

interface Props {
  onLoginClick: () => void;
  onRegistrationClick: () => void;
}

const RegistrationForm: FC<Props> = ({ onLoginClick, onRegistrationClick }) => {

  const [tabsIndex, setTabsIndex] = useState<number>(0);

  const handleTabIndexChange = (e: SyntheticEvent, newValue: number) => {
    setTabsIndex(newValue);
  }

  return (
    <Paper sx={{ padding: 2.5, paddingTop: 1 }}>
      <Tabs value={tabsIndex} onChange={handleTabIndexChange} sx={{ marginBottom: "15px" }}>
        <Tab label="Ребенок" disableRipple />
        <Tab label="Тренер" disableRipple />
      </Tabs>
      {
        tabsIndex === 0
          ? <UserRegistrationForm onRegistrationClick={onRegistrationClick} />
          : <CoachRegistrationForm onRegistrationClick={onRegistrationClick} />
      }
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginTop: 0.5,
        marginBottom: -1.5
      }}>
        <Typography fontSize={14}>Уже есть аккаунт?</Typography>
        <CustomLink
          fontSize={14}
          component={"button" as unknown as "a"}
          underline="none"
          onClick={onLoginClick}
        >
          Войти
        </CustomLink>
      </Box>
    </Paper >
  )
};

// ======================
// USER REGISTRATION FORM
// ======================

const userRegistrationSchema = yup
  .object({
    name: yup.string().required(),
    parentName: yup.string().required(),
    birth: yup.string().matches(/^\d\d.\d\d.\d\d\d\d$/).required(),
    email: yup.string().email().required(),
    phone: yup.string().min(11).max(12).required(),
    password: yup.string().min(8).required(),
    passwordAgain: yup.string().min(8).required(),
  })
  .required();

interface IUserRegistrationFormInput extends InferType<typeof userRegistrationSchema> { }

interface IUserRegitrationFormProps {
  onRegistrationClick: () => void;
}

const UserRegistrationForm: FC<IUserRegitrationFormProps> = ({ onRegistrationClick }) => {

  const { setRegistrationData } = useContext(RegistrationContext);

  const { control, handleSubmit, setError, formState } = useForm<IUserRegistrationFormInput>({
    defaultValues: {
      name: "",
      parentName: "",
      birth: "",
      email: "",
      phone: "",
      password: "",
      passwordAgain: "",
    },
    resolver: yupResolver(userRegistrationSchema)
  });

  const onSubmit: SubmitHandler<IUserRegistrationFormInput> = async (data) => {
    if (data.password !== data.passwordAgain) {
      setError("password", { type: "value", message: "Пароли не совпадают" });
      setError("passwordAgain", { type: "value", message: "Пароли не совпадают" });
      return;
    }

    const { passwordAgain, ...restData } = data;
    setRegistrationData(restData);

    try {
      await authService.sendCode(data.email);
      onRegistrationClick();
    } catch (error: any) {
      setError("root", { message: error.response.data.message });
    }
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={1.5}>
        <ControlledTextField
          control={control}
          name="name"
          label="ФИО ребенка"
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="parentName"
          label="ФИО родителя"
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="birth"
          label="Дата рождения ребенка (ДД.ММ.ГГГГ)"
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="email"
          label="Почта"
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="phone"
          label="Номер телефона"
          fullWidth
        />
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
      </Stack>
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Зарегистрироваться</Button>
    </form>
  );
}


// =======================
// COACH REGISTRATION FORM
// =======================

const coachRegistrationSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    passwordAgain: yup.string().min(8).required(),
  })
  .required();

interface ICoachRegistrationFormInput extends InferType<typeof coachRegistrationSchema> { }

interface ICoachRegitrationFormProps {
  onRegistrationClick: () => void;
}

const CoachRegistrationForm: FC<ICoachRegitrationFormProps> = ({ onRegistrationClick }) => {

  const { setRegistrationData } = useContext(RegistrationContext);

  const { control, handleSubmit, setError, formState } = useForm<ICoachRegistrationFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordAgain: "",
    },
    resolver: yupResolver(coachRegistrationSchema)
  });

  const onSubmit: SubmitHandler<ICoachRegistrationFormInput> = async (data) => {
    if (data.password !== data.passwordAgain) {
      setError("password", { type: "value", message: "Пароли не совпадают" });
      setError("passwordAgain", { type: "value", message: "Пароли не совпадают" });
      return;
    }

    const { passwordAgain, ...restData } = data;
    setRegistrationData(restData);

    try {
      await authService.sendCode(data.email);
      onRegistrationClick();
    } catch (error: any) {
      setError("root", { message: error.response.data.message });
    }
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={1.5}>
        <ControlledTextField
          control={control}
          name="name"
          label="ФИО"
          fullWidth
        />
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
        <ControlledTextField
          control={control}
          name="passwordAgain"
          label="Повторите пароль"
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
      </Stack>
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Зарегистрироваться</Button>
    </form>
  );
}

export default RegistrationForm;