import { Stack, StackProps, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import Title from "../UI/Title";

interface Props extends PropsWithChildren, StackProps {
  title?: string;
}

const SectionWrapper: FC<Props> = ({ title, children, ...restProps }) => {
  return (
    <Stack component="section" direction="column" spacing={5} {...restProps}>
      {
        title &&
        <Title textAlign="center">
          <Typography component="h3" fontWeight={700}>{title}</Typography>
        </Title>
      }
      {children}
    </Stack>
  )
};

export default SectionWrapper;
