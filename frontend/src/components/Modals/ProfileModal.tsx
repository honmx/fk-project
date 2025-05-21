import { IModalProps } from "@/types/IModalProps";
import { UserType } from "@/types/UserType";
import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import defaultUserPhoto from "@/assets/user.jpg";
import Image from "next/image";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ModalItemHeightDeterminantWrapper from "../Wrappers/ModalItemHeightDeterminantWrapper";
import OpenOrUploadUserImageWrapper from "../Wrappers/OpenOrUploadUserImageWrapper";
import { AuthContext } from "@/contexts/authContext";
import usersService from "@/services/usersService";
import { incline } from "@/helpers/incline";
import userPhoto from "@/assets/user.jpg";
import DocumentWithExpireDate from "../Widgets/DocumentWithExpireDate";
import penIcon from "@/assets/pen icon.svg";
import { createPortal } from "react-dom";
import SetTrainingsLeftModal from "./SetTrainingsLeftModal";

interface Props extends IModalProps {
  user: UserType;
}

const ProfileModal: FC<Props> = ({ open, handleCloseClick, user }) => {

  const { user: authUser } = useContext(AuthContext);

  const [isSetTrainingsLeftModalActive, setIsSetTrainingsLeftModalActive] = useState<boolean>(false);

  const handleOpenSetTrainingsLeftModal = () => {
    setIsSetTrainingsLeftModalActive(prev => !prev);
  }

  return (
    <>
      <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth={user.type === "coach" ? "500px" : "900px"}>
        <Stack direction={user.type === "coach" ? "column" : "row"}>
          <ModalItemHeightDeterminantWrapper fullWidth={user.type === "coach"}>
            <OpenOrUploadUserImageWrapper
              image={user.photo || userPhoto}
              userId={user.id}
              upload={user.id === authUser?.id}
              requestFn={(userId: number, photo: File) => usersService.uploadAvatar(userId, photo)}
              closeOuterModal={handleCloseClick}
            >
              <Image src={user.photo || defaultUserPhoto} alt="user photo" width={500} height={500} />
            </OpenOrUploadUserImageWrapper>
          </ModalItemHeightDeterminantWrapper>
          <ModalItemHeightDeterminantWrapper fullWidth={user.type === "coach"} sx={{ position: "relative" }}>
            {
              user.type === "coach" &&
              <Stack spacing={1} sx={{ padding: 2 }}>
                <Typography fontSize={20}>{user.name}</Typography>
                <Typography>{user.email}</Typography>
                {user.role?.value === "SUPER_ADMIN" && <Typography>Главный тренер</Typography>}
                {user.role?.value === "ADMIN" && <Typography>Тренер</Typography>}
                {user.role === null && <Typography>Тренер (без роли)</Typography>}
              </Stack>
            }
            {
              user.type === "user" &&
              <Stack spacing={2} sx={{ padding: 2, height: "100%" }}>
                <Typography fontSize={20}>{user.name}</Typography>
                <Stack spacing={1}>
                  <Typography><span style={{ fontSize: 14 }}>Родитель:</span> {user.parentName}</Typography>
                  <Typography><span style={{ fontSize: 14 }}>Дата рождения:</span> {user.birth}</Typography>
                  <Typography><span style={{ fontSize: 14 }}>Почта:</span> {user.email}</Typography>
                  <Stack spacing={0.5} direction="row" sx={{ alignItems: "center" }}>
                    <Typography fontSize={14}>Абонемент:</Typography>
                    <Typography color={user.trainingsLeft === 0 ? "" : user.trainingsLeft > 0 ? "typography.main" : "error"}>
                      {user.trainingsLeft}
                    </Typography>
                    <Typography>{incline(user.trainingsLeft, "занятие", "занятия", "занятий")}</Typography>
                    <IconButton color="black" onClick={handleOpenSetTrainingsLeftModal}>
                      <Image src={penIcon} alt="pen" width={13} height={13} />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  {
                    user.groups?.length
                      ? <Stack>
                        {
                          user.groups.map(group => <Typography key={group.id} textAlign="center">{group.name}</Typography>)
                        }
                      </Stack>
                      : <Typography textAlign="center">Без группы</Typography>
                  }
                </Stack>
                <Stack spacing={3} direction="row" sx={{ flex: "1 1 0" }}>
                  <DocumentWithExpireDate
                    user={user}
                    title="Мед. справка:"
                    image={user.medicalDocument?.photo}
                    expireDate={user.medicalDocument?.expires}
                    requestFn={(userId: number, photo: File) => usersService.uploadMedicalDocumentPhoto(userId, photo)}
                  />
                  <DocumentWithExpireDate
                    user={user}
                    title="Страховка:"
                    image={user.insurance?.photo}
                    expireDate={user.insurance?.expires}
                    requestFn={(userId: number, photo: File) => usersService.uploadInsurancePhoto(userId, photo)}
                  />
                </Stack>
              </Stack>
            }
          </ModalItemHeightDeterminantWrapper>
        </Stack>
      </ModalWrapper>
      {
        typeof document !== "undefined" && user.type === "user" &&
        createPortal(
          <SetTrainingsLeftModal open={isSetTrainingsLeftModalActive} handleCloseClick={handleOpenSetTrainingsLeftModal} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default ProfileModal;