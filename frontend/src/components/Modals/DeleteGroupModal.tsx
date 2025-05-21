import { FC, useContext, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { IGroup } from "@/types/IGroup";
import { Button, Stack, Typography } from "@mui/material";
import { useRequest } from "@/hooks/useRequest";
import groupsService from "@/services/groupsService";
import { GroupsContext } from "@/contexts/groupsContext";

interface Props extends IModalProps {
  group: Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">;
}

const DeleteGroupModal: FC<Props> = ({ open, handleCloseClick, group }) => {

  const { groups, setGroups } = useContext(GroupsContext);

  const { data: participantsCount } = useRequest(() => groupsService.getGroupParticipantsCount(group.id), null, [open], () => !open);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDeleteGroup = async () => {
    try {
      setIsLoading(true);

      await groupsService.deleteGroup(group.id, group.amountOfTrainingsInSubscription);

      setGroups(groups.filter(groupFromContext => groupFromContext.id !== group.id));

      handleCloseClick();
    } catch (error: any) {
      setError(error?.response?.data?.message);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Удалить группу</Typography>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography>{group.name}</Typography>
          {
            participantsCount !== null && <Typography>Участников: {participantsCount}</Typography>
          }
        </Stack>
        {
          error && <Typography color="error">{error}</Typography>
        }
        <Button onClick={handleDeleteGroup} disabled={isLoading}>Удалить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default DeleteGroupModal;