import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export const useResize = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  const isSmaller = useMediaQuery(theme.breakpoints.down(breakpoint));

  return isSmaller;
}