import { FC, RefObject, useState } from "react";
import { IPlace } from "@/types/IPlace";
import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import DarkForeground from "../UI/DarkForeground";
import { useHover } from "@/hooks/useHover";
import { createPortal } from "react-dom";
import ChangePlaceModal from "../Modals/ChangePlaceModal";
import PlaceDropdownButton from "../UI/PlaceDropdownButton";

interface Props {
  place: IPlace;
}

const AccountPlaceCard: FC<Props> = ({ place }) => {

  const { hoverRef, isHover, setIsHover } = useHover();

  return (
    <>
      <Paper
        ref={hoverRef as RefObject<HTMLDivElement>}
        sx={{ position: "relative", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ flex: "1 1 0" }}>
          <Image src={place.photo} alt="place photo" width={500} height={500} style={{ height: "100%", objectFit: "cover" }} />
        </Box>
        <Box sx={{ padding: 1 }}>
          <Typography>{place.name}</Typography>
        </Box>
        <PlaceDropdownButton
          place={place}
          hoverRef={hoverRef}
          isHover={isHover}
          setIsHover={setIsHover}
          sx={{
            position: "absolute",
            top: 5,
            right: 5
          }}
        />
      </Paper>
    </>
  )
};

export default AccountPlaceCard;