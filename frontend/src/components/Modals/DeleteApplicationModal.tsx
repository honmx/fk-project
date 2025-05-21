import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { IGroup } from "@/types/IGroup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRequest } from "@/hooks/useRequest";
import groupsService from "@/services/groupsService";
import { GroupsContext } from "@/contexts/groupsContext";
import { IApplication } from "@/types/IApplication";
import { ApplicationsContext } from "@/contexts/ApplicationsContext";
import ApplicationItem from "../Items/ApplicationItem";
import Avatar from "../UI/Avatar";
import { getShortenName } from "@/helpers/getShortenName";
import applicationsService from "@/services/applicationsService";

interface Props extends IModalProps {
  application: IApplication;
}

const DeleteApplicationModal: FC<Props> = ({ open, handleCloseClick, application }) => {

  const { applications, setApplications } = useContext(ApplicationsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (open) return;

    setError("");
  }, [open]);

  const handleDeleteGroup = async () => {
    try {
      setIsLoading(true);

      await applicationsService.deleteApplication(application.id);

      setApplications(applications.filter(applicationFromContext => applicationFromContext.id !== application.id));

      handleCloseClick();
    } catch (error: any) {
      setError(error.response.data.message);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Удалить заявку</Typography>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <Avatar photo={null} />
            <Box>
              <Typography
                fontWeight={600}
                fontSize={14}
                sx={{ textDecoration: application.status === "Завершено" ? "line-through" : "" }}
                color={application.status === "Новый" ? "success.main" : "secondary.main"}
              >
                {application.status}
              </Typography>
              <Typography>{getShortenName(application.parentName)}</Typography>
              <Typography>{getShortenName(application.childName)}</Typography>
              <Typography fontSize={12}>{application.dateOfBirth}</Typography>
            </Box>
          </Stack>
        </Stack>
        {
          error && <Typography color="error">{error}</Typography>
        }
        <Button onClick={handleDeleteGroup} disabled={isLoading}>Удалить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default DeleteApplicationModal;