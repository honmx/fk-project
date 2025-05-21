import { FC } from "react";
import { MenuItem, Select, SelectProps, TextField, TextFieldProps, TextFieldVariants, Typography } from "@mui/material";
import { Control, Controller, ControllerProps, FieldValues } from "react-hook-form";
import { OmittedControllerProps } from "@/types/OmittedControllerProps";

type Props = SelectProps & OmittedControllerProps & {
  values: {
    id: number;
    text: string;
  }[]
};

const ControlledSelect: FC<Props> = ({ values, control, name, rules, sx, ...restProps }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState, formState }) => (
        <>
          <Select
            value={field.value}
            onChange={field.onChange}
            error={!!formState.errors[name]?.type}
            sx={{
              backgroundColor: "input.background",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid transparent",
              },
              ...sx
            }}
            {...restProps}
          >
            {
              values.map(value => (
                <MenuItem key={value.id} value={value.text}>{value.text}</MenuItem>
              ))
            }
          </Select>
        </>
      )}
    />
  )
};

export default ControlledSelect;
