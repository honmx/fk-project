import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {

}

const ModalItemWithScrollingContentWrapper: FC<Props> = ({ children }) => {
  return (
    <Box sx={{
      width: {
        smallPhone: 0,
        tablet: "50%"
      },
      minWidth: {
        smallPhone: "100%",
        tablet: "50%"
      },
      minHeight: "100%"
    }}
    >
      <Box sx={{
        height: {
          smallPhone: "100%",
          tablet: 0
        },
        minHeight: "100%",
        overflow: "auto",
        padding: 3
      }}
      >
        {children}
      </Box>
    </Box>
  )
};

export default ModalItemWithScrollingContentWrapper;
