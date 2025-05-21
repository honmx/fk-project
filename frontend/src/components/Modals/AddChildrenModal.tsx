import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import ModalItemWithScrollingContentWrapper from "../Wrappers/ModalItemWithScrollingContentWrapper";
import { IChild } from "@/types/IChild";
import usersService from "@/services/usersService";
import UserSelectItem from "../Items/UserSelectItem";
import groupsService from "@/services/groupsService";
import { GroupContext } from "@/contexts/groupContext";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { useRequest } from "@/hooks/useRequest";
import UserSelectItemGroup from "../Widgets/UserSelectItemGroup";
import { useSelectedUsers } from "@/hooks/useSelectedUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { useLazyUsersAbleToHaveGroup } from "@/hooks/useLazyUsersAbleToHaveGroup";
import { InView, useInView } from "react-intersection-observer";
import SelectedUsersItemGroup from "../Widgets/SelectedUsersItemGroup";

interface Props extends IModalProps {

}

const AddChildrenModal: FC<Props> = ({ open, handleCloseClick }) => {

  const { group, setGroup } = useContext(GroupContext);

  const { selectedUsers, handleSelectChild } = useSelectedUsers([open]);
  const [name, setName] = useState<string>("");
  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    setName("");
  }, [open]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleAddChildrenClick = async () => {
    const newParticipants = await groupsService.addChildren(group.id, selectedUsers.map(user => user.id));

    if (newParticipants) {
      setGroup({ ...group, participants: newParticipants });
    }

    handleCloseClick();
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Stack spacing={10} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontSize={28}>Добавить детей</Typography>
          <Button onClick={handleAddChildrenClick} disabled={selectedUsers.length === 0}>Добавить</Button>
        </Stack>
        {
          selectedUsers.length > 0 &&
          <SelectedUsersItemGroup
            users={selectedUsers}
            handleSelectChild={handleSelectChild}
          />
        }
        <TextField variant="standard" placeholder="Имя/фамилия" value={name} onChange={handleNameChange} sx={{ width: "150px" }} />
        <UserSelectItemGroup
          selectedUsers={selectedUsers}
          debouncedName={debouncedName}
          handleSelectChild={handleSelectChild}
          amountOfTrainingsInSubscription={group.amountOfTrainingsInSubscription}
        />
      </Stack>
    </ModalWrapper>
  )
};

export default AddChildrenModal;