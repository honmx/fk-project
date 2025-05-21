import { useHover } from "@/hooks/useHover";
import { Box, IconButton, ListItemButton, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { FC, PropsWithChildren, useState } from "react";
import Dropdown from "../UI/Dropdown";
import menuDropdownIcon from "@/assets/menu dropdown icon.svg";
import { createPortal } from "react-dom";
import ViewImageModal from "../Modals/ViewImageModal";
import userPhoto from "@/assets/user.jpg";
import UploadImageModal from "../Modals/UploadUserImageModal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { UserType } from "@/types/UserType";

interface Props extends PropsWithChildren {
  image: string | StaticImageData;
  userId?: number;
  view?: boolean;
  upload?: boolean;
  requestFn?: (id: number, photo: File) => Promise<UserType>;
  closeOuterModal?: () => void;
}

const OpenOrUploadUserImageWrapper: FC<Props> = ({ image, userId, view = true, upload = false, requestFn, closeOuterModal, children }) => {

  const { hoverRef, isHover, setIsHover } = useHover();
  useOutsideClick(hoverRef, () => setIsMenuOpen(false));

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isViewImageModalActive, setIsViewImageModalActive] = useState<boolean>(false);
  const [isUploadImageModalActive, setIsUploadImageModalActive] = useState<boolean>(false);


  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  }

  const clearStates = () => {
    setIsMenuOpen(false);
    setIsHover(false);
  }

  const handleOpenViewImageModal = () => {
    setIsViewImageModalActive(prev => !prev);
    clearStates();
  }

  const handleOpenUploadImageModal = () => {
    setIsUploadImageModalActive(prev => !prev);
    clearStates();
  }

  if (!view && !upload) return children;

  return (
    <>
      <Box ref={hoverRef} sx={{ position: "relative", height: "100%" }}>
        {
          (isHover || isMenuOpen) &&
          <Box sx={{ position: "absolute", top: 5, right: 5, backgroundColor: "glassy.main", borderRadius: 1 }}>
            <IconButton
              color="black"
              onClick={handleMenuClick}
            >
              <Image src={menuDropdownIcon} alt="menu icon" />
            </IconButton>
            <Dropdown open={isMenuOpen} placement="left" sx={{ right: 5, top: 10 }}>
              {
                view &&
                <ListItemButton onClick={handleOpenViewImageModal} sx={{ paddingTop: 0.75, paddingBottom: 0.75 }}>
                  <Typography sx={{ margin: "0 auto" }}>Посмотреть</Typography>
                </ListItemButton>
              }
              {
                upload &&
                <ListItemButton onClick={handleOpenUploadImageModal} sx={{ paddingTop: 0.75, paddingBottom: 0.75 }}>
                  <Typography sx={{ margin: "0 auto" }}>Загрузить</Typography>
                </ListItemButton>
              }
            </Dropdown>
          </Box>
        }
        <Box onClick={handleOpenViewImageModal} sx={{ height: "100%", cursor: "pointer" }}>
          {children}
        </Box>
      </Box>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ViewImageModal
            open={isViewImageModalActive}
            handleCloseClick={handleOpenViewImageModal}
            image={image}
          />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && upload && userId && requestFn &&
        createPortal(
          <UploadImageModal
            open={isUploadImageModalActive}
            handleCloseClick={handleOpenUploadImageModal}
            userId={userId}
            requestFn={requestFn}
            closeOuterModal={closeOuterModal}
          />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default OpenOrUploadUserImageWrapper;