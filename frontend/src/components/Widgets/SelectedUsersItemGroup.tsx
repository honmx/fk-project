import { IChild } from "@/types/IChild";
import { Box, Stack } from "@mui/material";
import { FC } from "react";
import SelectedUserItem from "../Items/SelectedUserItem";

interface Props {
  users: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">[];
  handleSelectChild: (user: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">) => void;
}

const SelectedUsersItemGroup: FC<Props> = ({ users, handleSelectChild }) => {
  return (
    <Box sx={{ overflowX: "auto", overflowY: "hidden", "&::-webkit-scrollbar": { height: "5px" } }}>
      <Stack spacing={1} direction="row" sx={{ width: 0, minWidth: "100%", padding: 1 }}>
        {
          users.map((user, i) => (
            <SelectedUserItem
              key={user.id}
              user={user}
              handleSelectChild={handleSelectChild}
              sx={{ paddingRight: i === users.length - 1 ? "3px !important": 0 }}
            />
          ))
        }
      </Stack>
    </Box>
  )
};

export default SelectedUsersItemGroup;