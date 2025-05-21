import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import usersService from "@/services/usersService";
import { AuthContext } from "@/contexts/authContext";
import { UserType } from "@/types/UserType";
import authService from "@/services/authService";

interface Props extends IModalProps {
  userId: number;
  requestFn: (id: number, photo: File) => Promise<UserType>;
  closeOuterModal?: () => void;
}

const UploadUserImageModal: FC<Props> = ({ open, handleCloseClick, userId, requestFn, closeOuterModal }) => {

  const { setUser } = useContext(AuthContext);

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

      const userWithUploadedPhoto = await requestFn(userId, photo);
      await authService.refresh();

      setUser(userWithUploadedPhoto || null);

      handleCloseClick();
      closeOuterModal?.();
    } catch (error: any) {
      setError(error?.response?.data?.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   if (!photo) return;

  //   console.log(new Blob([photo], { type: "image/jpeg" }));
  // }, [photo]);

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

export default UploadUserImageModal;