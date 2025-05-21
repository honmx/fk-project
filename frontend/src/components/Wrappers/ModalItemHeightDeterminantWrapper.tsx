import { Box, BoxProps } from "@mui/material";
import { FC, PropsWithChildren, forwardRef } from "react";

interface Props extends PropsWithChildren, BoxProps {
  fullWidth?: boolean;
}

const ModalItemHeightDeterminantWrapper: FC<Props> = ({ fullWidth, children, sx, ...restProps }) => {
  return (
    <Box
      sx={{
        width: {
          smallPhone: "100%",
          tablet: fullWidth ? "100%" : "50%"
        },
        maxWidth: {
          smallPhone: "400px",
          tablet: "100%"
        },
        ...sx
      }}
      {...restProps}
    >
      {children}
    </Box>
  )
};

export default ModalItemHeightDeterminantWrapper;
