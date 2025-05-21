import { IChild } from "@/types/IChild";
import { Box, IconButton, Stack, StackProps, Tooltip, Typography } from "@mui/material";
import { FC, RefObject, useEffect } from "react";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { useHover } from "@/hooks/useHover";
import Image from "next/image";
import crossCircleIcon from "@/assets/cross circle icon.svg";

interface Props extends StackProps {
  user: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">;
  handleSelectChild: (user: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">) => void;
}

const SelectedUserItem: FC<Props> = ({ user, handleSelectChild, sx, ...restProps }) => {

  const { hoverRef, isHover } = useHover();

  return (
    <Stack
      spacing={1}
      sx={{ maxWidth: 50, ...sx }}
      {...restProps}
    >
      <Box ref={hoverRef as RefObject<HTMLDivElement>} sx={{ position: "relative" }}>
        <Avatar photo={user.photo} width={45} style={{ borderRadius: "100vw", margin: "0 auto" }} />
        <IconButton
          disableTouchRipple
          onClick={() => handleSelectChild(user)}
          sx={{
            display: isHover ? "block" : "none",
            transition: "all 0.15s ease",
            padding: 0,
            marginTop: "0 !important",
            position: "absolute",
            top: -5,
            right: -5,
            filter: "grayscale(100%) invert(0.5)",
            ":hover": {
              filter: "grayscale(100%) invert(0.4)",
            }
          }}
        >
          <Image src={crossCircleIcon} alt="cross icon" />
        </IconButton>
      </Box>
      <Tooltip title={getNameAndSurname(user.name)}>
        <Typography
          fontSize={12}
          sx={{
            display: "inline",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {getNameAndSurname(user.name)}
        </Typography>
      </Tooltip>
    </Stack>
  )
};

export default SelectedUserItem;