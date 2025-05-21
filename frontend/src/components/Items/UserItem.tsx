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

interface Props extends BoxProps {
  user: UserType;
  renderType?: boolean;
  renderExpelButton?: boolean;
}

const UserItem: FC<Props> = forwardRef(({ user, renderType = false, renderExpelButton = false, sx, ...restProps }, ref) => {

  const { user: authUser } = useContext(AuthContext);

  const { hoverRef, isHover, setIsHover } = useHover();

  const [isProfileModalActive, setIsProfileModalActive] = useState<boolean>(false);

  const handleOpenProfileModalClick = (e?: MouseEvent<HTMLDivElement>) => {
    setIsProfileModalActive(prev => !prev);
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
        <Box ref={ref} onClick={handleOpenProfileModalClick}>
          <Grid
            container
            direction="row"
            columnGap={2}
            sx={{
              paddingTop: 1,
              paddingBottom: 1,
              paddingRight: 3,
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#F8F8F8" }
            }}
          >
            <Grid item xs={4.5}>
              <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
                <Avatar photo={user.photo} />
                <Box>
                  <Typography>{getNameAndSurname(user.name)} {authUser?.id === user.id && "(Вы)"}</Typography>
                  {
                    user.type === "user" &&
                    <Typography fontSize={12}>{user.birth}</Typography>
                  }
                </Box>
              </Stack>
            </Grid>
            {
              renderType &&
              <Grid item xs={2}>
                {user.type === "user" && <Typography>Ребенок</Typography>}
                {user.type === "coach" && user.role?.value === "SUPER_ADMIN" && <Typography>Главный тренер</Typography>}
                {user.type === "coach" && user.role?.value === "ADMIN" && <Typography>Тренер</Typography>}
                {user.type === "coach" && user.role === null && <Typography>Тренер (без роли)</Typography>}
              </Grid>
            }
            <Grid item xs={2}>
              {
                user.type === "user" && (
                  user.groups?.length
                    ? <Box>
                      {
                        user.groups.map(group => <Typography key={group.id}>{group.name}</Typography>)
                      }
                    </Box>
                    : <Typography>Без группы</Typography>
                )
              }
            </Grid>
            {
              user.type === "user" &&
              <Grid item xs={renderType ? 2.75 : 3.5}>
                <Box>
                  <Stack spacing={0.5} direction="row">
                    <Typography fontSize={14}>Мед. справка:</Typography>
                    <Typography fontSize={14}>до</Typography>
                    {
                      user.medicalDocument?.expires
                        ? <Typography fontSize={14} color={new Date() > getDateFromString(user.medicalDocument.expires) ? "error" : "typography.main"}>
                          {user.medicalDocument.expires}
                        </Typography>
                        : <Typography fontSize={14}>-</Typography>
                    }
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography fontSize={14}>Страховка:</Typography>
                    <Typography fontSize={14}>до</Typography>
                    {
                      user.insurance?.expires
                        ? <Typography fontSize={14} color={new Date() > getDateFromString(user.insurance.expires) ? "error" : "typography.main"}>
                          {user.insurance.expires}
                        </Typography>
                        : <Typography fontSize={14}>-</Typography>
                    }
                  </Stack>
                  <Stack spacing={0.5} direction="row">
                    <Typography fontSize={14}>Абонемент:</Typography>
                    <Typography fontSize={14} color={user.trainingsLeft === 0 ? "" : user.trainingsLeft > 0 ? "typography.main" : "error"}>
                      {user.trainingsLeft}
                    </Typography>
                    <Typography fontSize={14}>{incline(user.trainingsLeft, "занятие", "занятия", "занятий")}</Typography>
                  </Stack>
                </Box>
              </Grid>
            }
          </Grid>
        </Box>
        <UserDropdownButton
          user={user}
          hoverRef={hoverRef}
          isHover={isHover}
          setIsHover={setIsHover}
          renderExpelButton={renderExpelButton}
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
          <ProfileModal open={isProfileModalActive} handleCloseClick={handleOpenProfileModalClick} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
});

export default UserItem;