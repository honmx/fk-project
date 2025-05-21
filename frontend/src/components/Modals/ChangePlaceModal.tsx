import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, Typography } from "@mui/material";
import { IPlace } from "@/types/IPlace";
import Image from "next/image";
import OpenOrUploadPlaceImageWrapper from "../Wrappers/OpenOrUploadPlaceImageWrapper";
import placesService from "@/services/placesService";
import * as yup from "yup";
import { InferType } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "../UI/ControlledTextField";
import { PlacesContext } from "@/contexts/placesContext";

const applicationSchema = yup
  .object({
    placeName: yup.string().required()
  })
  .required();

interface IFormInput extends InferType<typeof applicationSchema> { }


interface Props extends IModalProps {
  place: IPlace;
}

const ChangePlaceModal: FC<Props> = ({ open, handleCloseClick, place }) => {

  const { places, setPlaces } = useContext(PlacesContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { control, handleSubmit, reset, getValues } = useForm<IFormInput>({
    defaultValues: {
      placeName: place.name
    },
    resolver: yupResolver(applicationSchema)
  });

  useEffect(() => {
    if (open) return;

    setError("");
    reset();
  }, [open]);

  const onSubmit: SubmitHandler<IFormInput> = async ({ placeName }) => {
    if (getValues().placeName === place.name) {
      handleCloseClick();
      return;
    };

    try {
      setIsLoading(true);

      const newPlace = await placesService.changePlaceName(place.id, placeName);

      setPlaces(places.map(place => place.id === newPlace.id ? newPlace : place));

      handleCloseClick();

    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="400px">
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Изменить место</Typography>
        <OpenOrUploadPlaceImageWrapper
          image={place.photo}
          upload
          placeId={place.id}
          requestFn={(id: number, photo: File) => placesService.uploadPlacePhoto(id, photo)}
        >
          <Image src={place.photo} alt="place photo" width={500} height={500} />
        </OpenOrUploadPlaceImageWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1.5}>
            <ControlledTextField
              control={control}
              name="placeName"
              label="Название"
              fullWidth
            />
            {
              error && <Typography color="error">{error}</Typography>
            }
            <Button type="submit" disabled={isLoading}>Подтвердить</Button>
          </Stack>
        </form>
      </Stack>
    </ModalWrapper>
  )
};

export default ChangePlaceModal;