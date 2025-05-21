import { FC, useState } from "react";
import { ICoach } from "@/types/ICoach";
import { Box, Button, Paper, PaperProps, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import coachIcon from "@/assets/coach icon.svg";
import { createPortal } from "react-dom";
import CoachModal from "../Modals/CoachModal";

interface Props extends PaperProps {
  coach: ICoach;
}

const CoachCard: FC<Props> = ({ coach, ...restProps }) => {

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const handleOpenModalClick = () => {
    setIsModalActive(prev => !prev);
  }

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minWidth: "260px",
          maxWidth: "260px",
          position: "relative",
          overflow: "hidden"
        }}
        {...restProps}
      >
        <Box sx={{ height: "330px" }}>
          <Image
            src={coach.photo ? coach.photo : coachIcon}
            alt={coach.name}
            priority
            width={1080}
            height={1920}
            style={{
              height: "100%",
              objectFit: "cover",
              filter: coach.photo ? "none" : "invert(50%)"
            }}
          />
        </Box>
        <Typography
          fontWeight={300}
          textAlign="center"
          lineHeight={1.75}
          sx={{
            flex: "1 1 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {coach.name.split(" ").slice(0, 1).join(" ")} <br /> {coach.name.split(" ").slice(1, 3).join(" ")}
        </Typography>
        <Button
          fullWidth
          color="info"
          sx={{
            borderRadius: "0px",
            textTransform: "capitalize",
            fontWeight: 300,
            padding: "6px 8px",
            "&:hover": {
              backgroundColor: "secondary.light"
            }
          }}
          onClick={handleOpenModalClick}
        >
          Посмотреть
        </Button>
      </Paper>
      {
        typeof document !== "undefined" &&
        createPortal(
          <CoachModal open={isModalActive} handleCloseClick={handleOpenModalClick} coach={coach} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default CoachCard;
