import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { InferType } from "yup";
import ControlledTextField from "../UI/ControlledTextField";
import { PasswordRecoveryContext } from "@/contexts/passwordRecoveryContext";
import { RegistrationContext } from "@/contexts/registrationContext";
import authService from "@/services/authService";
import { AuthContext } from "@/contexts/authContext";

const validateCodeSchema = yup
  .object({
    code: yup.string().min(4).max(4).matches(/^\d\d\d\d$/).required(),
  })
  .required();

interface ValidateCodeFormInput extends InferType<typeof validateCodeSchema> { }


interface Props {
  onContinueClick: () => void;
}

const ValidateCodeForm: FC<Props> = ({ onContinueClick }) => {

  const { setUser } = useContext(AuthContext);
  const { registrationData } = useContext(RegistrationContext);
  const { passwordRecoveryData } = useContext(PasswordRecoveryContext);

  const { control, handleSubmit, setError, formState } = useForm<ValidateCodeFormInput>({
    defaultValues: {
      code: ""
    },
    resolver: yupResolver(validateCodeSchema)
  });


  const onSubmit: SubmitHandler<ValidateCodeFormInput> = async (data) => {
    try {
      await authService.validateCode({
        email: passwordRecoveryData.email || registrationData.email,
        code: Number(data.code)
      });

      if (registrationData.parentName) {
        const userData = await authService.register(registrationData);
        setUser(userData.user);
      }
      else if (registrationData.email) {
        const userData = await authService.registerCoach(registrationData);
        setUser(userData.user);
      }

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
            name="code"
            label="Код"
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

export default ValidateCodeForm;