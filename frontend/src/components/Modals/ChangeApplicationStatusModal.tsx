import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { IApplication } from "@/types/IApplication";
import ApplicationItem from "../Items/ApplicationItem";
import { getShortenName } from "@/helpers/getShortenName";
import Avatar from "../UI/Avatar";
import { ApplicationsContext } from "@/contexts/ApplicationsContext";
import applicationsService from "@/services/applicationsService";

interface Props extends IModalProps {
  application: IApplication;
}

const ChangeApplicationStatusModal: FC<Props> = ({ open, handleCloseClick, application }) => {

  const { applications, setApplications } = useContext(ApplicationsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (open) return;

    setError("");
  }, [open]);

  const handleChangeStatus = async () => {
    try {
      setIsLoading(true);

      const updatedApplication = await applicationsService.updateStatus(application.id, "Завершено");

      setApplications(applications.map(applicationFromContext => applicationFromContext.id === updatedApplication.id ? updatedApplication : applicationFromContext));

      handleCloseClick();
    } catch (error: any) {
      setError(error.response.data.message);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="800px">
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Завершить</Typography>
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
        {
          error && <Typography color="error">{error}</Typography>
        }
        <Button disabled={isLoading} onClick={handleChangeStatus}>Подтвердить</Button>
      </Stack>
    </ModalWrapper>
  )
};

export default ChangeApplicationStatusModal;