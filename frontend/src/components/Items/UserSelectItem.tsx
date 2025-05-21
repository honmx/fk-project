import { ChangeEvent, FC, MouseEvent, MouseEventHandler, forwardRef, useContext, useState } from "react";
import { IChild } from "@/types/IChild";
import { Box, Checkbox, Stack, StackProps, Typography } from "@mui/material";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { GroupContext } from "@/contexts/groupContext";
import { getName } from "@/helpers/getName";
import { getSurname } from "@/helpers/getSurname";

interface Props extends StackProps {
  user: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">;
  handleSelectChild: (user: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">) => void;
  checked: boolean;
}

const UserSelectItem: FC<Props> = forwardRef(({ user, handleSelectChild, checked, sx, ...restProps }, ref) => {

  const { group } = useContext(GroupContext);

  const handleClick = (e: any) => {
    if (e?.target?.classList?.contains("PrivateSwitchBase-input")) return;

    handleSelectChild(user);
  }

  const handleChange = () => {
    handleSelectChild(user);
  }

  return (
    <Stack
      direction="row"
      spacing={5}
      onClick={handleClick}
      ref={ref}
      sx={{
        justifyContent: "space-between",
        paddingTop: 1,
        paddingBottom: 1,
        cursor: "pointer",
        ...sx
      }}
      {...restProps}
    >
      <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        <Avatar photo={user.photo} />
        <Box>
          <Typography>{getSurname(user.name)}</Typography>
          <Typography>{getName(user.name)}</Typography>
          <Typography fontSize={12}>{user.birth}</Typography>
        </Box>
      </Stack>
      <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
        {
          user.groups?.length
            ? <Box>
              {
                user.groups.map(group => <Typography key={group.id}>{group.name}</Typography>)
              }
            </Box>
            : <Typography>Без группы</Typography>
        }
        <Checkbox checked={checked} onChange={handleChange} />
      </Stack>
    </Stack>
  )
});

export default UserSelectItem;