import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import addUserIcon from "@/assets/add user icon.svg";
import { useRequest } from "@/hooks/useRequest";
import usersService from "@/services/usersService";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import UserSelectItem from "../Items/UserSelectItem";
import { IChild } from "@/types/IChild";
import { useSelectedUsers } from "@/hooks/useSelectedUsers";
import UserSelectItemGroup from "../Widgets/UserSelectItemGroup";
import groupsService from "@/services/groupsService";
import { GroupsContext } from "@/contexts/groupsContext";
import { useDebounce } from "@/hooks/useDebounce";
import SelectedUsersItemGroup from "../Widgets/SelectedUsersItemGroup";
import Counter from "../Widgets/Counter";

interface Props extends IModalProps {

}

const CreateGroupModal: FC<Props> = ({ open, handleCloseClick }) => {

  const [name, setName] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [amountOfTrainingsInSubscription, setAmountOfTrainingsInSubscription] = useState<number>(8);
  const [isGroupNameFieldError, setIsGroupNameFieldError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const debouncedName = useDebounce<string>(name, 500);
  const debouncedAmountOfTrainingsInSubscription = useDebounce<number>(amountOfTrainingsInSubscription, 500);

  const { groups, setGroups } = useContext(GroupsContext);

  const { selectedUsers, setSelectedUsers, handleSelectChild } = useSelectedUsers([open]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsGroupNameFieldError(false);
  }, [groupName]);

  useEffect(() => {
    setSelectedUsers([]);
  }, [debouncedAmountOfTrainingsInSubscription]);

  useEffect(() => {
    setGroupName("");
    setName("");
    setAmountOfTrainingsInSubscription(8);
  }, [open]);

  const handleGroupNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDecreaseClick = () => {
    setAmountOfTrainingsInSubscription(prev => prev - 1 || 1);
  }

  const handleIncreaseClick = () => {
    setAmountOfTrainingsInSubscription(prev => prev + 1);
  }

  const handleCreateGroup = async () => {
    if (!groupName) {
      setIsGroupNameFieldError(true);
      ref.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    try {
      setIsLoading(true);

      const newGroup = await groupsService.createGroup(groupName, amountOfTrainingsInSubscription, selectedUsers.map(user => user.id));

      setGroups([...groups, newGroup]);

      handleCloseClick();
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack ref={ref} spacing={3} sx={{ padding: 2 }}>
        <Stack spacing={5} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontSize={28}>Создать группу</Typography>
          <Button disabled={isLoading} onClick={handleCreateGroup}>Создать</Button>
        </Stack>
        <TextField
          placeholder="Название группы"
          value={groupName}
          onChange={handleGroupNameChange}
          error={isGroupNameFieldError}
        />
        <Stack sx={{ alignItems: "center" }}>
          <Typography fontSize={14}>Кол-во занятий в абонементе</Typography>
          <Counter
            count={amountOfTrainingsInSubscription}
            handleDecreaseClick={handleDecreaseClick}
            handleIncreaseClick={handleIncreaseClick}
          />
        </Stack>
        {
          selectedUsers.length > 0 &&
          <SelectedUsersItemGroup
            users={selectedUsers}
            handleSelectChild={handleSelectChild}
          />
        }
        <Stack spacing={5} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <Image src={addUserIcon} alt="add user" width={20} height={20} />
            <Typography fontSize={14}>Добавить в группу</Typography>
          </Stack>
          <TextField variant="standard" placeholder="Имя/фамилия" value={name} onChange={handleNameChange} sx={{ width: 150 }} />
        </Stack>
        {
          error && <Typography color="error">{error}</Typography>
        }
        <UserSelectItemGroup
          selectedUsers={selectedUsers}
          debouncedName={debouncedName}
          handleSelectChild={handleSelectChild}
          amountOfTrainingsInSubscription={debouncedAmountOfTrainingsInSubscription}
        />
      </Stack>
    </ModalWrapper>
  )
};

export default CreateGroupModal;