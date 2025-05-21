import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { IPlace } from "@/types/IPlace";
import { PlacesContext } from "@/contexts/placesContext";

interface Props extends IModalProps {
  placeId: number;
  requestFn: (id: number, photo: File) => Promise<IPlace>;
  closeOuterModal?: () => void;
}

const UploadPlaceImageModal: FC<Props> = ({ open, handleCloseClick, placeId, requestFn, closeOuterModal }) => {

  const { places, setPlaces } = useContext(PlacesContext);

  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) return;

    setPhoto(null);
    setIsLoading(false);
    setError("");
  }, [open]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const selectedFiles = e.target.files as FileList;

    const file = selectedFiles?.[0];

    if (!file) return;

    setPhoto(file);
  }

  const handleUploadPhotoClick = async () => {

    if (!photo) return;

    try {
      setIsLoading(true);

      const placeWithUploadedPhoto = await requestFn(placeId, photo);

      setPlaces(places.map(place => place.id === placeWithUploadedPhoto.id ? placeWithUploadedPhoto : place));

      handleCloseClick();
      closeOuterModal?.();
    } catch (error: any) {
      setError(error?.response?.data?.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="600px">
      <Box>
        {
          !photo &&
          <Stack spacing={3} sx={{ padding: 2 }}>
            <Typography fontSize={28}>Выберите фото</Typography>
            <Button onClick={() => ref?.current?.click()}>Выбрать</Button>
          </Stack>
        }
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {
          photo &&
          <>
            <Button color="typography" onClick={() => ref?.current?.click()} fullWidth>Выбрать другое</Button>
            <Box>
              <Image
                src={URL.createObjectURL(new Blob([photo]))}
                alt="preview"
                width={500}
                height={500}
                style={{ maxHeight: "75vh", width: "100%" }}
              />
            </Box>
            <Box sx={{ padding: 2 }}>
              <Button fullWidth disabled={!photo || isLoading} onClick={handleUploadPhotoClick}>Подтвердить</Button>
            </Box>
          </>
        }
      </Box>
    </ModalWrapper>
  )
};

export default UploadPlaceImageModal;