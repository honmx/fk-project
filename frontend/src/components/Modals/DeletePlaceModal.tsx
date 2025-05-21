import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { IPlace } from "@/types/IPlace";
import Image from "next/image";
import placesService from "@/services/placesService";
import { PlacesContext } from "@/contexts/placesContext";
import ControlledTextField from "../UI/ControlledTextField";

interface Props extends IModalProps {
  place: IPlace;
}

const DeletePlaceModal: FC<Props> = ({ open, handleCloseClick, place }) => {

  const { places, setPlaces } = useContext(PlacesContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    setError("");
  }, [open]);

  const handleDeletePlace = async () => {
    try {
      setIsLoading(true)

      await placesService.deletePlace(place.id);

      setPlaces(places.filter(contextPlace => contextPlace.id !== place.id));

      handleCloseClick();

    } catch (error: any) {
      setError(error?.response?.data?.message)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="350px">
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Удалить место</Typography>
        <Box>
          <Image src={place.photo} alt="place photo" width={500} height={500} />
        </Box>
        {
          error && <Typography color="error">{error}</Typography>
        }
        <Button fullWidth disabled={isLoading} onClick={handleDeletePlace}>Удалить</Button>
    </Stack>
    </ModalWrapper >
  )
};

export default DeletePlaceModal;