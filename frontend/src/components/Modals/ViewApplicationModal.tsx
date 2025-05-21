import { FC, useContext, useEffect } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { IApplication } from "@/types/IApplication";
import Avatar from "../UI/Avatar";
import { getShortenName } from "@/helpers/getShortenName";
import Link from "next/link";
import { useRequest } from "@/hooks/useRequest";
import applicationsService from "@/services/applicationsService";
import { ApplicationsContext } from "@/contexts/ApplicationsContext";

interface Props extends IModalProps {
  application: IApplication;
}

const ViewApplicationModal: FC<Props> = ({ open, handleCloseClick, application }) => {

  const { applications, setApplications } = useContext(ApplicationsContext);

  const { data: updatedApplication } = useRequest(
    () => applicationsService.updateStatus(application.id, "Просмотрено"),
    application,
    [open],
    () => !open || application.status !== "Новый"
  );

  useEffect(() => {
    if (!open) return;

    return () => {
      setApplications(applications.map(applicationFromContext => applicationFromContext.id === updatedApplication.id ? updatedApplication : applicationFromContext));
    }
  }, [updatedApplication.status, open]);

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="500px">
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Stack spacing={3} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontSize={28}>Посмотреть</Typography>
          <Typography
            fontWeight={600}
            sx={{ textDecoration: application.status === "Завершено" ? "line-through" : "" }}
            color={application.status === "Новый" ? "success.main" : "secondary.main"}
          >
            {application.status}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <Avatar photo={null} />
            <Box>
              <Typography><span style={{ fontStyle: "italic", fontSize: 14 }}>Родитель:</span> {application.parentName}</Typography>
              <Typography><span style={{ fontStyle: "italic", fontSize: 14 }}>Ребенок:</span> {application.childName}</Typography>
              <Typography fontSize={12}>{application.dateOfBirth}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={5} sx={{ justifyContent: "space-between", alignItems: "flex-end" }}>
            <Box>
              <Link href={`tel:${application.phone}`} type="phone" onClick={(e) => e.stopPropagation()}>
                <Typography sx={{ display: "inline-block" }}>{application.phone}</Typography>
              </Link>
              <Typography><span style={{ fontStyle: "italic", fontSize: 14 }}>Перезвонить:</span> {application.timeFrom} - {application.timeTo}</Typography>
            </Box>
            <Typography>{application.branch}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </ModalWrapper>
  )
};

export default ViewApplicationModal;