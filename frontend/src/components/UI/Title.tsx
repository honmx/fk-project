import { FC, ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import leftSide from "@/assets/title-left-side-bg.svg";
import rightSide from "@/assets/title-right-side-bg.svg";
import Image from "next/image";

interface Props extends BoxProps {
  type?: "main" | "regular"
  children: ReactNode;
}

const Title: FC<Props> = ({ type = "regular", children, ...restProps }) => {
  return (
    <Box  {...restProps} data-aos="zoom-in" data-aos-duration="300">
      <Box
        sx={{
          display: "inline-grid",
          position: "relative",
        }}
      >
        <Box sx={{
          padding: "10px 0",
          color: "typography.light",
          zIndex: 10,
          "&>*": {
            fontSize: {
              smallPhone: "24px !important",
              largePhone: "26px !important",
              tablet: "30px !important",
            }
          }
        }}>
          {children}
        </Box>
        <Box sx={{
          position: "absolute",
          display: "flex",
          width: type === "main" ? "120%" : "calc(120% + '50px')",
          height: "100%",
          left: type === "main" ? "-12%" : "-30px",
          right: type === "main" ? "-13%" : "-45px"
        }}>
          <Image src={leftSide} alt="left side" style={{ height: "100%", width: "auto" }} />
          <Box sx={{
            flex: "1 1 0",
            backgroundColor: "primary.main"
          }} />
          <Image src={rightSide} alt="right side" style={{ height: "100%", width: "auto" }} />
        </Box>
      </Box>
    </Box>
  )
};

export default Title;
