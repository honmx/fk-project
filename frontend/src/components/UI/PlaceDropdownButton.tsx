import { Box, BoxProps, IconButton, ListItemButton, Typography } from "@mui/material";
import Image from "next/image";
import { Dispatch, FC, MouseEvent, RefObject, SetStateAction, useContext, useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { AuthContext } from "@/contexts/authContext";
import { useHover } from "@/hooks/useHover";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { UserType } from "@/types/UserType";
import { createPortal } from "react-dom";
import ProfileModal from "../Modals/ProfileModal";
import ChDeleteildGroupModal from "../Modals/ChangeChildGroupModal";
import ExpelChildModal from "../Modals/ExpelChildModal";
import ChangeRoleModal from "../Modals/ChangeRoleModal";
import DeleteRoleModal from "../Modals/DeleteRoleModal";
import menuDropdownIcon from "@/assets/menu dropdown icon.svg";
import ChangePlaceModal from "../Modals/ChangePlaceModal";
import { IPlace } from "@/types/IPlace";
import DeletePlaceModal from "../Modals/DeletePlaceModal";

interface Props extends BoxProps {
  place: IPlace;
  hoverRef?: RefObject<HTMLDivElement | HTMLButtonElement>;
  isHover?: boolean;
  setIsHover?: Dispatch<SetStateAction<boolean>>;
}

const PlaceDropdownButton: FC<Props> = ({ place, hoverRef, isHover, setIsHover, sx, ...restProps }) => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useOutsideClick(hoverRef || null, () => setIsMenuOpen(false));

  const [isChangePlaceModalOpen, setIsChangePlaceModalOpen] = useState<boolean>(false);
  const [isDeletePlaceModalOpen, setIsDeletePlaceModalOpen] = useState<boolean>(false);

  const clearStates = (e?: MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(false);
    setIsHover?.(false);
  }

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  }


  const handleOpenChangePlaceModalClick = () => {
    setIsChangePlaceModalOpen(prev => !prev);
    clearStates();
  }

  const handleOpenDeletePlaceModalClick = () => {
    setIsDeletePlaceModalOpen(prev => !prev);
    clearStates();
  }

  const menuButtons = [
    { text: "Изменить", onClick: handleOpenChangePlaceModalClick },
    { text: "Удалить", onClick: handleOpenDeletePlaceModalClick }
  ]

  return (
    <>
      <Box
        sx={{
          zIndex: isMenuOpen ? 1000 : 10,
          ...sx
        }}
        {...restProps}
      >
        {
          (isHover || isMenuOpen) &&
          <Box sx={{ backgroundColor: "glassy.main", borderRadius: 1 }}>
            <IconButton color="black" onClick={handleMenuClick}>
              <Image src={menuDropdownIcon} alt="menu icon" />
            </IconButton>
          </Box>
        }
        <Dropdown open={isMenuOpen} placement="left" sx={{ zIndex: 1000 }}>
          {
            menuButtons.map(button => (
              <ListItemButton key={button.text} onClick={button.onClick} sx={{ paddingTop: 0.75, paddingBottom: 0.75, justifyContent: "center" }}>
                <Typography>{button.text}</Typography>
              </ListItemButton>
            ))
          }
        </Dropdown>
      </Box>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ChangePlaceModal open={isChangePlaceModalOpen} handleCloseClick={handleOpenChangePlaceModalClick} place={place} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" &&
        createPortal(
          <DeletePlaceModal open={isDeletePlaceModalOpen} handleCloseClick={handleOpenDeletePlaceModalClick} place={place} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default PlaceDropdownButton;