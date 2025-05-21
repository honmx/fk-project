import { FC, useContext } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { GroupContext } from "@/contexts/groupContext";
import UserItem from "../Items/UserItem";
import AddChildrenModalButton from "../ModalButtons/AddChildrenModalButton";

interface Props {

}

const Participants: FC<Props> = ({ }) => {

  const { group } = useContext(GroupContext);

  return (
    <>
      <Paper sx={{ padding: 3, overflow: "visible" }}>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography fontSize={28}>Участники</Typography>
            <AddChildrenModalButton />
          </Box>
          <Box>
            {
              group.participants
                .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                .map((participant, i) => (
                  <UserItem
                    key={participant.id}
                    user={participant}
                    renderExpelButton
                    sx={{ borderBottom: i !== group.participants.length - 1 ? "1px solid #DDD" : 0 }}
                  />
                ))
            }
          </Box>
        </Stack>
      </Paper>
    </>
  )
};

export default Participants;