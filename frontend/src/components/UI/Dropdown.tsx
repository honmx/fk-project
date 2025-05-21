import { Backdrop, Box, BoxProps, Paper } from "@mui/material";
import { FC, RefObject, useEffect } from "react";

interface Props extends BoxProps {
  open: boolean;
  placement?: "center" | "left" | "right";
}

const Dropdown: FC<Props> = ({ open, placement = "center", children, sx, ...restProps }) => {

  return (
    open && <>
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          height: "5px",
          width: "100%",
        }}
        {...restProps}
      />
      <Paper
        sx={{
          position: "absolute",
          top: "calc(100% + 5px)",
          left: placement === "center" ? "50%" : placement === "left" ? "100%" : 0,
          transform: placement === "center" ? "translateX(-50%)" : placement === "left" ? "translateX(-100%)" : "100%",
          border: "1px solid #DDDDDD",
        }}
      >
        {children}
      </Paper>
    </>
  )
};

export default Dropdown;