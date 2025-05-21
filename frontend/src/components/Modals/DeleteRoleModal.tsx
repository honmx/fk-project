import { IModalProps } from "@/types/IModalProps";
import { IUserCoach } from "@/types/IUserCoach";
import { IUserGeneralCoach } from "@/types/IUserGeneralCoach";
import { FC, useContext } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { Box, Button, Stack, Typography } from "@mui/material";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import usersService from "@/services/usersService";
import { UsersContext } from "@/contexts/usersContext";

interface Props extends IModalProps {
  user: IUserCoach | IUserGeneralCoach;
}

const DeleteRoleModal: FC<Props> = ({ open, handleCloseClick, user }) => {

  const { users, setUsers } = useContext(UsersContext);

  const handleDeleteRole = async () => {
    const newUser = await usersService.deleteRole(user.id);

    if (newUser) {
      setUsers(users.map(user => user.id === newUser.id ? newUser : user));
    }

    handleCloseClick();
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Снять роль</Typography>
        <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
          <Avatar photo={user.photo} />
          <Typography>{getNameAndSurname(user.name)}</Typography>
          <Typography>{user.role?.text}</Typography>
        </Stack>
        <Button onClick={handleDeleteRole}>Подтвердить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default DeleteRoleModal;