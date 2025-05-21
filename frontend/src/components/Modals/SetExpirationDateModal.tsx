import { IModalProps } from "@/types/IModalProps";
import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IChild } from "@/types/IChild";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import OpenOrUploadUserImageWrapper from "../Wrappers/OpenOrUploadUserImageWrapper";
import photoHolder from "@/assets/photo holder.jpg";
import * as yup from "yup";
import { InferType } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "../UI/ControlledTextField";
import { GroupContext } from "@/contexts/groupContext";
import { UsersContext } from "@/contexts/usersContext";

const applicationSchema = yup
  .object({
    expires: yup.string().matches(/^\d\d.\d\d.\d\d\d\d$/).required(),
  })
  .required();

interface IFormInput extends InferType<typeof applicationSchema> { }

interface Props extends IModalProps {
  userId: number;
  title: string;
  image: string | null | undefined;
  expires: string | null | undefined;
  requestFn: (id: number, date: string) => Promise<IChild>;
}

const SetExpirationDateModal: FC<Props> = ({ open, handleCloseClick, userId, title, image, expires, requestFn }) => {

  const { group, setGroup } = useContext(GroupContext);
  const { users, setUsers } = useContext(UsersContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      expires: expires || "",
    },
    resolver: yupResolver(applicationSchema)
  });

  useEffect(() => {
    setError("");
  }, [open]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);

      const newUser = await requestFn(userId, data.expires);

      setGroup({
        ...group,
        participants: group.participants?.map(participant =>
          participant.id === newUser.id
            ? newUser
            : participant
        )
      });
      setUsers(users.map(user => user.id === newUser.id ? newUser : user));

      handleCloseClick();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="350px">
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>{title}</Typography>
        <OpenOrUploadUserImageWrapper image={image || photoHolder}>
          <Image src={image || photoHolder} alt={title} width={500} height={500} style={{ aspectRatio: 1, objectFit: "cover", borderRadius: 5 }} />
        </OpenOrUploadUserImageWrapper>
        {
          error && <Typography color="error">{error}</Typography>
        }
        <form
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
          >
          <ControlledTextField
            control={control}
            name="expires"
            label="До (ДД.ММ.ГГГГ)"
            fullWidth
          />
          <Button type="submit" disabled={isLoading} sx={{ marginTop: 2 }}>Подтвердить</Button>
        </form>
      </Stack>
    </ModalWrapper>
  )
};

export default SetExpirationDateModal;