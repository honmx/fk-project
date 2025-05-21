import { Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  tabletDirection?: "row" | "column"; 
  smallPhoneDirection?: "row" | "column"; 
}

const ModalContentDirectionDeterminant: FC<Props> = ({ tabletDirection, smallPhoneDirection, children }) => {
  return (
    <Stack
      direction={{
        smallPhone: smallPhoneDirection || "column-reverse",
        tablet: tabletDirection || "row"
      }}
    >
      {children}
    </Stack>
  )
};

export default ModalContentDirectionDeterminant;
