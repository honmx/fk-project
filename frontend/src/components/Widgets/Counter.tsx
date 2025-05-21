import { FC } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import minusIcon from "@/assets/minus icon.svg";
import boldPlusIcon from "@/assets/bold plus icon.svg";

interface Props {
  count: number;
  handleDecreaseClick: () => void;
  handleIncreaseClick: () => void;
}

const Counter: FC<Props> = ({ count, handleDecreaseClick, handleIncreaseClick }) => {
  return (
    <Stack spacing={1} direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
      <IconButton color="black" onClick={handleDecreaseClick} sx={{ filter: "grayscale(100%) invert(0.5)" }}>
        <Image src={minusIcon} alt="убавить" width={18} height={18} />
      </IconButton>
      <Typography fontSize={24}>{count}</Typography>
      <IconButton color="black" onClick={handleIncreaseClick} sx={{ filter: "grayscale(100%) invert(0.5)" }}>
        <Image src={boldPlusIcon} alt="прибавить" width={18} height={18} />
      </IconButton>
    </Stack>
  )
};

export default Counter;