import { FC, MouseEvent, MouseEventHandler, forwardRef, useContext, useEffect, useState } from "react";
import { IChild } from "@/types/IChild";
import { Box, BoxProps, Grid, IconButton, ListItemButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import userPhoto from "@/assets/user.jpg";
import menuDropdownIcon from "@/assets/menu dropdown icon.svg";
import { UserType } from "@/types/UserType";
import { getDateFromString } from "@/helpers/getDateFromString";
import { incline } from "@/helpers/incline";
import Dropdown from "../UI/Dropdown";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useHover } from "@/hooks/useHover";
import { createPortal } from "react-dom";
import ExpelChildModal from "../Modals/ExpelChildModal";
import ChangeChildGroupModal from "../Modals/ChangeChildGroupModal";
import Avatar from "../UI/Avatar";
import ProfileModal from "../Modals/ProfileModal";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import ChangeRoleModal from "../Modals/ChangeRoleModal";
import { AuthContext } from "@/contexts/authContext";
import DeleteRoleModal from "../Modals/DeleteRoleModal";
import UserDropdownButton from "../UI/UserDropdownButton";
import { IApplication } from "@/types/IApplication";
import { getShortenName } from "@/helpers/getShortenName";
import Link from "next/link";
import ApplicationDropdownButton from "../UI/ApplicationDropdownButton";
import ViewApplicationModal from "../Modals/ViewApplicationModal";

interface Props extends BoxProps {
  application: IApplication;
}

const ApplicationItem: FC<Props> = forwardRef(({ application, sx, ...restProps }, ref) => {

  const { hoverRef, isHover, setIsHover } = useHover();

  const [isViewApplicationModalOpen, setIsViewApplicationModalOpen] = useState<boolean>(false);

  const handleOpenViewApplicationModalClick = () => {
    setIsViewApplicationModalOpen(prev => !prev);
  }

  return (
    <>
      <Box
        ref={hoverRef}
        sx={{
          position: "relative",
          ...sx
        }}
        {...restProps}
      >
        <Box ref={ref} onClick={handleOpenViewApplicationModalClick}>
          <Grid
            container
            direction="row"
            columnGap={2}
            sx={{
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 3,
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#F8F8F8" }
            }}
          >
            <Grid item xs={5}>
              <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                <Avatar photo={null} />
                <Box>
                  <Typography>{getShortenName(application.parentName)}</Typography>
                  <Typography>{getShortenName(application.childName)}</Typography>
                  <Typography fontSize={12}>{application.dateOfBirth}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ display: "inline-block" }}>{application.phone}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                textAlign="right"
                fontWeight={600}
                sx={{ textDecoration: application.status === "Завершено" ? "line-through" : "" }}
                color={application.status === "Новый" ? "success.main" : "secondary.main"}
              >
                {application.status}
              </Typography>
              <Typography textAlign="right" fontSize={15}>{application.branch}</Typography>
              <Typography fontSize={13} textAlign="right">{application.timeFrom} - {application.timeTo}</Typography>
            </Grid>
          </Grid>
        </Box>
        <ApplicationDropdownButton
          application={application}
          hoverRef={hoverRef}
          isHover={isHover}
          setIsHover={setIsHover}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
          }}
        />
      </Box>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ViewApplicationModal open={isViewApplicationModalOpen} handleCloseClick={handleOpenViewApplicationModalClick} application={application} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
});

export default ApplicationItem;