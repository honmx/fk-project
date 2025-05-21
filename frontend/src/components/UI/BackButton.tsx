import { FC } from "react";
import { IconButton, IconButtonProps, Typography } from "@mui/material";
import Image from "next/image";
import doubleArrowLeft from "@/assets/double arrow left.svg";
import { useRouter } from "next/router";

interface Props extends IconButtonProps {

}

const BackButton: FC<Props> = ({ sx, ...restProps }) => {

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  }

  return (
    <IconButton
      color="black"
      onClick={handleBackClick}
      disableRipple
      sx={{ filter: "grayscale(100%) invert(0.6)", aspectRatio: "auto", ...sx }}
      {...restProps}
    >
      <Image src={doubleArrowLeft} alt="" width={20} height={20} />
      <Typography textTransform="uppercase" fontSize={20} sx={{ marginLeft: 1, color: "#000" }}>Назад</Typography>
    </IconButton>
  )
};

export default BackButton;