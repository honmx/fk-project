import { FC, useContext, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { IUserCoach } from "@/types/IUserCoach";
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { IUserGeneralCoach } from "@/types/IUserGeneralCoach";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { useRequest } from "@/hooks/useRequest";
import usersService from "@/services/usersService";
import { UsersContext } from "@/contexts/usersContext";

interface Props extends IModalProps {
  user: IUserCoach | IUserGeneralCoach;
}

const ChangeRoleModal: FC<Props> = ({ open, handleCloseClick, user }) => {

  const { users, setUsers } = useContext(UsersContext);

  const { data: roles, isLoading, error } = useRequest(() => usersService.getCoachRoles(), [], [], () => !open);

  const [selectedRoleId, setSelectedRoleId] = useState<number>(user.role?.id || roles[0]?.id || 2);

  const handleRoleIdChange = (e: SelectChangeEvent<number>) => {
    setSelectedRoleId(Number(e.target.value));
  }

  const handleChangeRoleClick = async () => {
    if (selectedRoleId !== user.role?.id) {
      const newUser = await usersService.changeRole(user.id, selectedRoleId);

      if (newUser) {
        setUsers(users.map(user => user.id === newUser.id ? newUser : user));
      }
    }

    handleCloseClick();
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Сменить роль</Typography>
        <Stack spacing={3} direction="row" sx={{ alignItems: "center" }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Avatar photo={user.photo} />
            <Typography>{getNameAndSurname(user.name)}</Typography>
          </Stack>
          <Box>
            <Select value={selectedRoleId} onChange={handleRoleIdChange}>
              {
                roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.text}</MenuItem>
                ))
              }
            </Select>
          </Box>
        </Stack>
        <Button onClick={handleChangeRoleClick}>Назначить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default ChangeRoleModal;