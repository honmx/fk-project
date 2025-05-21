import { FC, useContext, useState } from "react";
import { DateContext } from "@/contexts/dateContext";
import { GroupContext } from "@/contexts/groupContext";
import { getScheduleIndex } from "@/helpers/getScheduleIndex";
import { Box, Grid, GridProps, IconButton, ListItemButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import DarkForeground from "../UI/DarkForeground";
import { useHover } from "@/hooks/useHover";
import Dropdown from "../UI/Dropdown";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";
import CreateTrainingModal from "../Modals/CreateTrainingModal";
import menuDropdownIcon from "@/assets/menu dropdown icon.svg";
import plusIcon from "@/assets/small plus icon.svg";
import ChangeTrainingModal from "../Modals/ChangeTrainingModal";
import DeleteTrainingModal from "../Modals/DeleteTrainingModal";
import MarkAttendanceModal from "../Modals/MarkAttendanceModal";

interface Props extends GridProps {
  date: Date
}

const CalendarGridCell: FC<Props> = ({ date, sx, ...restProps }) => {

  const { group } = useContext(GroupContext);
  const { monthIndex, year } = useContext(DateContext);

  const { hoverRef, isHover, setIsHover } = useHover();
  useOutsideClick(hoverRef, () => setIsMenuOpen(false));

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // separate modal logic
  const [isChangeTrainingModalActive, setIsChangeTrainingModalActive] = useState<boolean>(false);
  const [isCreateTrainingModalActive, setIsCreateTrainingModalActive] = useState<boolean>(false);
  const [isDeleteTrainingModalActive, setIsDeleteTrainingModalActive] = useState<boolean>(false);
  const [isMarkAttendanceModalActive, setIsMarkAttendanceModalActive] = useState<boolean>(false);

  const scheduleIndex = getScheduleIndex(monthIndex, date, group.schedule);
  const training = group.schedule[scheduleIndex]?.trainingsByDay.find(traning => traning.date === date.toLocaleDateString());
  const currentDate = new Date().toLocaleDateString();

  // console.log(training);

  const clearStates = () => {
    setIsMenuOpen(false);
    setIsHover(false);
  }

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  }

  const handleOpenCreateTrainingModal = () => {
    setIsCreateTrainingModalActive(prev => !prev);
    clearStates();
  }
  
  const handleOpenChangeTrainingModal = () => {
    setIsChangeTrainingModalActive(prev => !prev);
    clearStates();
  }
  
  const handleOpenDeleteTrainingModal = () => {
    setIsDeleteTrainingModalActive(prev => !prev);
    clearStates();
  }
  
  const handleOpenMarkAttendanceModal = () => {
    setIsMarkAttendanceModalActive(prev => !prev);
    clearStates();
  }

  const menuButtons = [
    { text: "Отметить", onClick: handleOpenMarkAttendanceModal },
    { text: "Изменить", onClick: handleOpenChangeTrainingModal },
    { text: "Удалить", onClick: handleOpenDeleteTrainingModal },
  ]

  return (
    <>
      <Grid
        item
        xs={12 / 7}
        sx={{
          position: "relative",
          padding: 0,
          aspectRatio: 1.75,
          zIndex: isMenuOpen ? 100 : 10,
          ...sx
        }}
        {...restProps}
      >
        <Box
          ref={hoverRef}
          sx={{
            height: "100%",
            opacity: date.getMonth() === monthIndex ? 1 : 0.5,
            backgroundColor: date.toLocaleDateString() === currentDate ? "#478DE0" : ""
          }}
        >
          {
            training && <>
              <DarkForeground color="#478DE088" apply={training.date === currentDate}>
                <DarkForeground>
                  <Image
                    src={training.place.photo}
                    alt={training.place.name}
                    width={100}
                    height={50}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </DarkForeground>
              </DarkForeground>
              <Stack spacing={0.5} sx={{ position: "absolute", bottom: 5, right: 5 }}>
                <Typography
                  sx={{ fontSize: 10, color: training ? "#FFF" : "#000", textAlign: "end" }}
                >
                  {training.time}
                </Typography>
                <Typography
                  sx={{ fontSize: 10, color: training ? "#FFF" : "#000" }}
                >
                  {training.place.name}
                </Typography>
              </Stack>
            </>
          }
          <Typography
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              color: training || date.toLocaleDateString() === currentDate ? "#FFF" : "#000",
              fontWeight: training ? 500 : 400
            }}
          >
            {date.getDate()}
          </Typography>
          {
            (isHover || isMenuOpen) && date.getMonth() === monthIndex && (
              <Box sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 100
              }}>
                {
                  training && <>
                    <IconButton
                      color={training || currentDate === date.toLocaleDateString() ? "white" : "black"}
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
                  </>
                }
                {
                  !training && <>
                    <IconButton
                      color={currentDate === date.toLocaleDateString() ? "white" : "black"}
                      onClick={handleOpenCreateTrainingModal}
                    >
                      <Image src={plusIcon} alt="plus icon" width={10} height={10} />
                    </IconButton>
                  </>
                }
              </Box>
            )
          }
        </Box>
      </Grid>
      {
        typeof document !== "undefined" && !training &&
        createPortal(
          <CreateTrainingModal open={isCreateTrainingModalActive} handleCloseClick={handleOpenCreateTrainingModal} date={date.toLocaleDateString()} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && training &&
        createPortal(
          <ChangeTrainingModal open={isChangeTrainingModalActive} handleCloseClick={handleOpenChangeTrainingModal} training={training} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && training &&
        createPortal(
          <DeleteTrainingModal open={isDeleteTrainingModalActive} handleCloseClick={handleOpenDeleteTrainingModal} training={training} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
      {
        typeof document !== "undefined" && training &&
        createPortal(
          <MarkAttendanceModal open={isMarkAttendanceModalActive} handleCloseClick={handleOpenMarkAttendanceModal} training={training} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default CalendarGridCell;