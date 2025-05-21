import { FC, useContext } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, Typography } from "@mui/material";
import { IChild } from "@/types/IChild";
import Image from "next/image";
import userPhoto from "@/assets/user.jpg";
import usersService from "@/services/usersService";
import { GroupContext } from "@/contexts/groupContext";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { UsersContext } from "@/contexts/usersContext";

interface Props extends IModalProps {
  user: IChild;
}

const ExpelChildModal: FC<Props> = ({ open, handleCloseClick, user }) => {

  const { group, setGroup } = useContext(GroupContext);
  const { users, setUsers } = useContext(UsersContext);

  const handleExpelClick = async () => {
    const expelledChild = await usersService.expelChild(user.id, group.id, group.amountOfTrainingsInSubscription);

    if (expelledChild) {
      setGroup({ ...group, participants: group.participants?.filter(participant => participant.id !== expelledChild.id) });
      setUsers(users.map(user => user.id === expelledChild.id ? expelledChild : user));
    }

    handleCloseClick();
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Исключить</Typography>
        <Stack spacing={3} direction="row" sx={{ alignItems: "center" }}>
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <Avatar photo={user.photo} />
            <Box>
              <Typography>{getNameAndSurname(user.name)}</Typography>
              <Typography fontSize={12}>{user.birth}</Typography>
            </Box>
          </Stack>
          <Box>
            {
              user.groups?.map(group => <Typography key={group.id}>{group.name}</Typography>)
            }
          </Box>
        </Stack>
        <Button onClick={handleExpelClick}>Исключить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default ExpelChildModal;