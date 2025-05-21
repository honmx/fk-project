import { Typography, TypographyProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, TypographyProps {

}

const Subtitle: FC<Props> = ({ children, ...restProps }) => {
  return (
    <Typography
      fontSize={{
        smallPhone: 18,
        middlePhone: 20,
        largePhone: 24,
        tablet: 26
      }}
      fontWeight={300}
      data-aos="fade-up"
      {...restProps}
    >
      {children}
    </Typography>
  )
};

export default Subtitle;
