import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import * as yup from "yup";
import { InferType } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "../UI/ControlledTextField";
import placesService from "@/services/placesService";
import { PlacesContext } from "@/contexts/placesContext";

const applicationSchema = yup
  .object({
    placeName: yup.string().required()
  })
  .required();

interface IFormInput extends InferType<typeof applicationSchema> { }

interface Props extends IModalProps {

}

const CreatePlaceModal: FC<Props> = ({ open, handleCloseClick }) => {

  const { places, setPlaces } = useContext(PlacesContext);

  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      placeName: ""
    },
    resolver: yupResolver(applicationSchema)
  });

  useEffect(() => {
    if (open) return;

    setPhoto(null);
    setIsLoading(false);
    setError("");
    reset();
  }, [open]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const selectedFiles = e.target.files as FileList;

    const file = selectedFiles?.[0];

    if (!file) return;

    setPhoto(file);
  }

  const onSubmit: SubmitHandler<IFormInput> = async ({ placeName }) => {

    if (!photo) {
      setError("Не выбрано фото");
      return;
    }

    try {
      setIsLoading(true);
      const newPlace = await placesService.createPlace(placeName, photo);
      setPlaces([...places, newPlace]);

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
        <Typography fontSize={28}>Создать место</Typography>
        <Box>
          {
            photo &&
            <Box>
              <Image
                src={URL.createObjectURL(new Blob([photo]))}
                alt="preview"
                width={500}
                height={500}
                style={{ maxHeight: "75vh", width: "100%" }}
              />
            </Box>
          }
          <Button color="typography" onClick={() => ref?.current?.click()} fullWidth>{photo ? "Выбрать другое" : "Выбрать фото"}</Button>
        </Box>
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
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Stack>
    </ModalWrapper>
  )
};

export default CreatePlaceModal;