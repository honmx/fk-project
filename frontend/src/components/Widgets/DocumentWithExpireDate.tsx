import { Box, IconButton, Stack, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import OpenOrUploadUserImageWrapper from "../Wrappers/OpenOrUploadUserImageWrapper";
import Image from "next/image";
import { getDateFromString } from "@/helpers/getDateFromString";
import { IChild } from "@/types/IChild";
import photoHolder from "@/assets/photo holder.jpg";
import usersService from "@/services/usersService";
import { AuthContext } from "@/contexts/authContext";
import penIcon from "@/assets/pen icon.svg";
import { createPortal } from "react-dom";
import SetExpirationDateModal from "../Modals/SetExpirationDateModal";

interface Props {
  user: IChild;
  title: "Мед. справка:" | "Страховка:";
  image: string | null | undefined;
  expireDate: string | null | undefined;
  requestFn: (userId: number, photo: File) => Promise<IChild>;
}

const DocumentWithExpireDate: FC<Props> = ({ user, title, image, expireDate, requestFn }) => {

  const { user: authUser } = useContext(AuthContext);

  const [isSetMedicalDocumentExpireDateModalActive, setIsSetMedicalDocumentExpireDateModalActive] = useState<boolean>(false);
  const [isSetInsuranceExpireDateModalActive, setIsSetInsuranceExpireDateModalActive] = useState<boolean>(false);

  const handleOpenSetMedicalDocumentExpireDateModal = () => {
    setIsSetMedicalDocumentExpireDateModalActive(prev => !prev);
  }

  const handleOpenSetInsuranceExpireDateModal = () => {
    setIsSetInsuranceExpireDateModalActive(prev => !prev);
  }

  return (
    <>
      <Stack spacing={1} sx={{ width: "50%" }}>
        <Typography fontSize={14}>{title}</Typography>
        <Box sx={{ flex: "1 1 0" }}>
          <OpenOrUploadUserImageWrapper upload={true} image={image || photoHolder} userId={user.id} requestFn={requestFn}>
            <Image
              src={image || photoHolder}
              alt="med. doc."
              width={200}
              height={200}
              style={{ width: "100%", height: 0, minHeight: "100%", objectFit: "cover", borderRadius: 5 }}
            />
          </OpenOrUploadUserImageWrapper>
        </Box>
        <Stack spacing={0.5} direction="row" sx={{ alignItems: "center" }}>
          <Typography fontSize={14}>До</Typography>
          {
            expireDate
              ? <Typography fontSize={14} color={new Date() > getDateFromString(expireDate) ? "error" : "typography.main"}>
                {expireDate}
              </Typography>
              : <Typography fontSize={14}>-</Typography>
          }
          {
            title === "Мед. справка:" &&
            <IconButton color="black" onClick={handleOpenSetMedicalDocumentExpireDateModal}>
              <Image src={penIcon} alt="pen" width={13} height={13} />
            </IconButton>
          }
          {
            title === "Страховка:" &&
            <IconButton color="black" onClick={handleOpenSetInsuranceExpireDateModal}>
              <Image src={penIcon} alt="pen" width={13} height={13} />
            </IconButton>
          }
        </Stack>
      </Stack>
      {
        typeof document !== "undefined" &&
        createPortal(
          <SetExpirationDateModal
            open={isSetMedicalDocumentExpireDateModalActive}
            handleCloseClick={handleOpenSetMedicalDocumentExpireDateModal}
            userId={user.id}
            title="Изменить мед. справку"
            image={user.medicalDocument?.photo}
            expires={user.medicalDocument?.expires}
            requestFn={(id: number, date: string) => usersService.setMedicalDocumentExpiration(id, date)}
          />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" &&
        createPortal(
          <SetExpirationDateModal
            open={isSetInsuranceExpireDateModalActive}
            handleCloseClick={handleOpenSetInsuranceExpireDateModal}
            userId={user.id}
            title="Изменить страховку"
            image={user.insurance?.photo}
            expires={user.insurance?.expires}
            requestFn={(id: number, date: string) => usersService.setInsuranceExpiration(id, date)}
          />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default DocumentWithExpireDate;