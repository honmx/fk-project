import { ISectionPlace } from "@/types/ISectionPlace";
import { Box, Paper, PaperProps, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import DarkForeground from "../UI/DarkForeground";

interface Props extends PaperProps {
  place: ISectionPlace;
}

const SectionPlaceCard: FC<Props> = ({ place, ...restProps }) => {
  return (
    <Paper {...restProps}>
      <Image
        src={place.photo}
        alt={place.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover"
        }}
      />
      <Box sx={{ padding: 2 }}>
        <Typography>{place.name}</Typography>
        <Typography>{place.address}</Typography>
      </Box>
    </Paper>
  )
};

export default SectionPlaceCard;
