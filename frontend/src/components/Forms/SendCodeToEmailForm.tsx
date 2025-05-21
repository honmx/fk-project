import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import ControlledTextField from "../UI/ControlledTextField";
import { PasswordRecoveryContext } from "@/contexts/passwordRecoveryContext";
import authService from "@/services/authService";

const sendCodeToEmailSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

interface ISendCodeToEmailFormInput extends InferType<typeof sendCodeToEmailSchema> { }


interface Props {
  onContinueClick: () => void;
}

const SendCodeToEmailForm: FC<Props> = ({ onContinueClick }) => {

  const { setPasswordRecoveryData } = useContext(PasswordRecoveryContext);

  const { control, handleSubmit, setError, formState } = useForm<ISendCodeToEmailFormInput>({
    defaultValues: {
      email: ""
    },
    resolver: yupResolver(sendCodeToEmailSchema)
  });

  const onSubmit: SubmitHandler<ISendCodeToEmailFormInput> = async (data) => {
    setPasswordRecoveryData(data);

    try {
      await authService.sendCode(data.email);

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
            name="email"
            label="Почта"
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
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Продолжить</Button>
      </form>
    </Paper>
  )
};

export default SendCodeToEmailForm;