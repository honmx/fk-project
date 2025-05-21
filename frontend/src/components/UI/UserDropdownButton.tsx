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
import ChangeChildGroupModal from "../Modals/ChangeChildGroupModal";
import ExpelChildModal from "../Modals/ExpelChildModal";
import ChangeRoleModal from "../Modals/ChangeRoleModal";
import DeleteRoleModal from "../Modals/DeleteRoleModal";
import menuDropdownIcon from "@/assets/menu dropdown icon.svg";

interface Props extends BoxProps {
  user: UserType;
  hoverRef?: RefObject<HTMLDivElement | HTMLButtonElement>;
  isHover?: boolean;
  setIsHover?: Dispatch<SetStateAction<boolean>>;
  renderExpelButton?: boolean;
  renderMoreButton?: boolean;
}

const UserDropdownButton: FC<Props> = ({ user, hoverRef, isHover, setIsHover, renderExpelButton = false, renderMoreButton = true, sx, ...restProps }) => {

  const { user: authUser } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [isProfileModalActive, setIsProfileModalActive] = useState<boolean>(false);
  const [isChangeRoleModalActive, setIsChangeRoleModalActive] = useState<boolean>(false);
  const [isDeleteRoleModalActive, setIsDeleteRoleModalActive] = useState<boolean>(false);
  const [isChangeChildGroupModalActive, setIsChangeChildGroupModalActive] = useState<boolean>(false);
  const [isExpelChildModalActive, setIsExpelChildModalActive] = useState<boolean>(false);
  // const [isDeleteUserModalActive, setIsDeleteUserModalActive] = useState<boolean>(false);

  useOutsideClick(hoverRef || null, () => setIsMenuOpen(false));

  const clearStatesAndStopPropagation = (e?: MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    setIsMenuOpen(false);
    setIsHover?.(false);
  }

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  }

  const handleOpenProfileModalClick = (e?: MouseEvent<HTMLDivElement>) => {
    setIsProfileModalActive(prev => !prev);
    clearStatesAndStopPropagation(e);
  }

  const handleOpenChangeRoleModalClick = (e?: MouseEvent<HTMLDivElement>) => {
    setIsChangeRoleModalActive(prev => !prev);
    clearStatesAndStopPropagation(e);
  }

  const handleOpenDeleteRoleModalClick = (e?: MouseEvent<HTMLDivElement>) => {
    setIsDeleteRoleModalActive(prev => !prev);
    clearStatesAndStopPropagation(e);
  }

  const handleOpenChangeChildGroupModalClick = (e?: MouseEvent<HTMLDivElement>) => {
    setIsChangeChildGroupModalActive(prev => !prev);
    clearStatesAndStopPropagation(e);
  }

  const handleOpenExpelChildModalClick = (e?: MouseEvent<HTMLDivElement>) => {
    setIsExpelChildModalActive(prev => !prev);
    clearStatesAndStopPropagation(e);
  }

  // const handleOpenDeleteUserModalClick = (e?: MouseEvent<HTMLDivElement>) => {
  //   setIsDeleteUserModalActive(prev => !prev);
  //   clearStatesAndStopPropagation(e);
  // }

  // add med doc, insurance and subscription
  const menuButtons = [
    { text: "Подробнее", onClick: handleOpenProfileModalClick, render: renderMoreButton },
    { text: "Назначить роль", onClick: handleOpenChangeRoleModalClick, render: user.type === "coach" && authUser?.id !== user.id },
    { text: "Снять роль", onClick: handleOpenDeleteRoleModalClick, render: user.type === "coach" && authUser?.id !== user.id && user.role !== null },
    { text: "Назначить группу", onClick: handleOpenChangeChildGroupModalClick, render: user.type === "user" },
    { text: "Исключить", onClick: handleOpenExpelChildModalClick, render: user.type === "user" && user.groups && user.groups.length > 0 && renderExpelButton },
    // { text: "Удалить", onClick: handleOpenDeleteUserModalClick, render: user.type === "coach" && !user.role && authUser?.id !== user.id || user.type === "user" && !user.group },
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
          <IconButton color="black" onClick={handleMenuClick}>
            <Image src={menuDropdownIcon} alt="menu icon" />
          </IconButton>
        }
        <Dropdown open={isMenuOpen} placement="left" sx={{ zIndex: 1000 }}>
          {
            menuButtons.map(button => (
              button.render &&
              <ListItemButton key={button.text} onClick={button.onClick} sx={{ paddingTop: 0.75, paddingBottom: 0.75 }}>
                <Typography sx={{ textAlign: "center" }}>{button.text}</Typography>
              </ListItemButton>
            ))
          }
        </Dropdown>
      </Box>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ProfileModal open={isProfileModalActive} handleCloseClick={handleOpenProfileModalClick} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && user.type === "user" &&
        createPortal(
          <ChangeChildGroupModal open={isChangeChildGroupModalActive} handleCloseClick={handleOpenChangeChildGroupModalClick} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && user.type === "user" &&
        createPortal(
          <ExpelChildModal open={isExpelChildModalActive} handleCloseClick={handleOpenExpelChildModalClick} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && user.type === "coach" &&
        createPortal(
          <ChangeRoleModal open={isChangeRoleModalActive} handleCloseClick={handleOpenChangeRoleModalClick} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && user.type === "coach" &&
        createPortal(
          <DeleteRoleModal open={isDeleteRoleModalActive} handleCloseClick={handleOpenDeleteRoleModalClick} user={user} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default UserDropdownButton;