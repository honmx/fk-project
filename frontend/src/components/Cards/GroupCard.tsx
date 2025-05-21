import { useHover } from "@/hooks/useHover";
import { IGroup } from "@/types/IGroup";
import { Box, Grid, IconButton, ListItemButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import Dropdown from "../UI/Dropdown";
import menuDropdownIcon from "@/assets/menu dropdown icon.svg";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";
import DeleteGroupModal from "../Modals/DeleteGroupModal";
import ChangeGroupNameModal from "../Modals/ChangeGroupNameModal";


interface Props {
  group: Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">;
}

const GroupCard: FC<Props> = ({ group }) => {

  const { hoverRef, isHover, setIsHover } = useHover();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // separate modal logic
  const [isChangeGroupModalActive, setIsChangeGroupModalActive] = useState<boolean>(false);
  const [isDeleteGroupModalActive, setIsDeleteGroupModalActive] = useState<boolean>(false);

  useOutsideClick(hoverRef, () => setIsMenuOpen(false));

  const clearStates = () => {
    setIsMenuOpen(false);
    setIsHover(false);
  }

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  }

  const handleOpenChangeGroupModal = async () => {
    setIsChangeGroupModalActive(prev => !prev);
    clearStates();
  }

  const handleOpenDeleteGroupModal = async () => {
    setIsDeleteGroupModalActive(prev => !prev);
    clearStates();
  }

  const menuButtons = [
    { text: "Изменить", onClick: handleOpenChangeGroupModal },
    { text: "Удалить", onClick: handleOpenDeleteGroupModal },
  ]

  return (
    <>
      <Grid item xs={2} key={group.id}>
        <Box ref={hoverRef} sx={{ position: "relative" }}>
          <Link href={`/groups/${group.id}`}>
            <Paper
              sx={{
                aspectRatio: 1,
                padding: 2,
                transition: "all 0.15s ease",
                "&:hover": { backgroundColor: "#F5F5F5" }
              }}
            >
              <Typography>{group.name}</Typography>
            </Paper>
          </Link>
          {
            (isHover || isMenuOpen) && (
              <Box sx={{
                position: "absolute",
                top: 10,
                right: 5,
                zIndex: 100
              }}>
                <IconButton
                  color="black"
                  onClick={handleMenuClick}
                >
                  <Image src={menuDropdownIcon} alt="menu icon" />
                </IconButton>
                <Dropdown open={isMenuOpen} sx={{ right: 5, top: 10 }}>
                  {
                    menuButtons.map(button => (
                      <ListItemButton key={button.text} onClick={button.onClick} sx={{ paddingTop: 0.75, paddingBottom: 0.75 }}>
                        <Typography sx={{ margin: "0 auto" }}>{button.text}</Typography>
                      </ListItemButton>
                    ))
                  }
                </Dropdown>
              </Box>
            )
          }
        </Box>
      </Grid>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ChangeGroupNameModal open={isChangeGroupModalActive} handleCloseClick={handleOpenChangeGroupModal} groupName={group.name} groupId={group.id} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" &&
        createPortal(
          <DeleteGroupModal open={isDeleteGroupModalActive} handleCloseClick={handleOpenDeleteGroupModal} group={group} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default GroupCard;