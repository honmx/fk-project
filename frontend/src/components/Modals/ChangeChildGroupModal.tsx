import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Chip, FormLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import groupsService from "@/services/groupsService";
import { IGroup } from "@/types/IGroup";
import { IChild } from "@/types/IChild";
import Image from "next/image";
import userPhoto from "@/assets/user.jpg";
import Avatar from "../UI/Avatar";
import usersService from "@/services/usersService";
import { GroupContext } from "@/contexts/groupContext";
import { UsersContext } from "@/contexts/usersContext";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { useRequest } from "@/hooks/useRequest";

interface Props extends IModalProps {
  user: IChild;
}

const ChangeChildGroupModal: FC<Props> = ({ open, handleCloseClick, user }) => {

  const { group, setGroup } = useContext(GroupContext);
  const { users, setUsers } = useContext(UsersContext);

  // const [groups, setGroups] = useState<Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[]>([]);
  const [selectedGroupsId, setSelectedGroupsId] = useState<number[]>(user.groups?.map(group => group.id) || []);
  const [error, setError] = useState<string>("");

  const { data: groups } = useRequest(() => groupsService.getGroups(), [], [open], () => !open);

  useEffect(() => {
    setSelectedGroupsId(user.groups?.map(group => group.id) || [groups[0]?.id] || 0);
    setError("");
  }, [open]);

  // replace with userequest
  // useEffect(() => {
  //   (async () => {
  //     const groups = await groupsService.getGroups();
  //     setGroups(groups || []);
  //   })()
  // }, [open]);

  const handleGroupChange = (e: SelectChangeEvent<number[]>) => {
    if (e.target.value.length > 2) return;

    setSelectedGroupsId(e.target.value as number[]);
  }

  const handleChangeGroupClick = async () => {
    if (!(selectedGroupsId.length === user.groups?.length
      && selectedGroupsId.every(value => user.groups?.map(group => group.id).includes(value))
    ) || selectedGroupsId.length !== user.groups?.length) {

      if (selectedGroupsId.length === 0) {
        setError("Необходимо назначить хотя бы одну группу");
        return;
      }

      if (Array.from(new Set(selectedGroupsId
        .map(groupId => groups.find(group => group.id === groupId))
        .map(group => group?.amountOfTrainingsInSubscription))).length > 1
      ) {
        setError("Нельзя назначить группы с разным количеством занятий в абонементе");
        return;
      }

      try {
        const previousAmountOfTrainingsInSubscription = groups.find(group => user.groups?.find(userGroup => group.id === userGroup.id))?.amountOfTrainingsInSubscription;

        const userWithChangedGroup = await usersService.changeGroup(user.id, selectedGroupsId, previousAmountOfTrainingsInSubscription || null);

        if (!userWithChangedGroup) return;

        const userWithChangedGroupGroupsId = userWithChangedGroup.groups?.map(group => group.id);

        setGroup({
          ...group,
          participants: group?.participants
            ?.map(user => user.id === userWithChangedGroup.id ? userWithChangedGroup : user)
            ?.filter(user =>
              user.id !== userWithChangedGroup.id
              || (user.id === userWithChangedGroup.id && userWithChangedGroupGroupsId?.includes(group.id))
            )
        });
        setUsers(users.map(user => user.id === userWithChangedGroup.id ? userWithChangedGroup : user));
        
      } catch (error: any) {
        setError(error.response.data.message);
        return;
      }
    }

    handleCloseClick();
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Назначить группу</Typography>
        <Stack spacing={3} direction="row" sx={{ alignItems: "center" }}>
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <Avatar photo={user.photo} />
            <Box>
              <Typography>{getNameAndSurname(user.name)}</Typography>
              <Typography fontSize={12}>{user.birth}</Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography fontSize={14}>Группы (макс. 2)</Typography>
          <Select
            multiple
            value={selectedGroupsId}
            onChange={handleGroupChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {
                  selected.map((value) => (
                    <Chip key={value} label={groups.find(group => group.id === value)?.name} />
                  ))
                }
              </Box>
            )}
          >
            {
              groups.map(group => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              ))
            }
          </Select>
          {
            error &&
            <Typography color="error">{error}</Typography>
          }
        </Stack>
        <Button onClick={handleChangeGroupClick}>Подтвердить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default ChangeChildGroupModal;