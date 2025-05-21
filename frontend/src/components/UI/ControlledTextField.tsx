import { FC } from "react";
import { TextField, TextFieldProps, TextFieldVariants, Typography } from "@mui/material";
import { Control, Controller, ControllerProps, FieldValues } from "react-hook-form";
import { OmittedControllerProps } from "@/types/OmittedControllerProps";

type Props = TextFieldProps & OmittedControllerProps;

const ControlledTextField: FC<Props> = ({ control, name, rules, ...restProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState, formState }) => (
        <>
          <TextField
            value={field.value}
            onChange={field.onChange}
            error={!!formState.errors[name]?.type}
            {...restProps}
          />
        </>
      )}
    />
  )
};

export default ControlledTextField;
