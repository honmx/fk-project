import { IModalProps } from "@/types/IModalProps";
import { FC, useContext, useEffect, useState } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IChild } from "@/types/IChild";
import { Box, Button, Stack, Typography } from "@mui/material";
import { UserType } from "@/types/UserType";
import Avatar from "../UI/Avatar";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { getSurname } from "@/helpers/getSurname";
import { getName } from "@/helpers/getName";
import Counter from "../Widgets/Counter";
import { getUserGroupAmountOfTrainingsInSubscription } from "@/helpers/getUserGroupAmountOfTrainingsInSubscription";
import { incline } from "@/helpers/incline";
import usersService from "@/services/usersService";
import { GroupContext } from "@/contexts/groupContext";
import { UsersContext } from "@/contexts/usersContext";

interface Props extends IModalProps {
  user: IChild;
}

const SetTrainingsLeftModal: FC<Props> = ({ open, handleCloseClick, user }) => {

  const { group, setGroup } = useContext(GroupContext);
  const { users, setUsers } = useContext(UsersContext);

  const [trainingsToAdd, setTrainingsToAdd] = useState<number>(getUserGroupAmountOfTrainingsInSubscription(user));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setTrainingsToAdd(getUserGroupAmountOfTrainingsInSubscription(user));
    setError("");
  }, [open]);

  const handleDecreaseClick = () => {
    setTrainingsToAdd(prev => prev - 1);
  }

  const handleIncreaseClick = () => {
    setTrainingsToAdd(prev => prev + 1);
  }

  const handleChangeTrainingsLeftClick = async () => {
    try {
      setIsLoading(true);
      
      const newUser = await usersService.changeTrainingsLeft(user.id, trainingsToAdd);

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

  const variants = [-1, 1, 8, 12];

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={28}>Изменить занятия</Typography>
        <Stack spacing={3} direction="row">
          <Stack spacing={1} direction="row">
            <Avatar photo={user.photo} />
            <Stack sx={{ justifyContent: "center" }}>
              <Typography>{getSurname(user.name)}</Typography>
              <Typography>{getName(user.name)}</Typography>
              <Typography fontSize={12}>{user.birth}</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ justifyContent: "center" }}>
            {
              user.groups?.length
                ? <Stack>
                  {
                    user.groups.map(group => <Typography key={group.id}>{group.name}</Typography>)
                  }
                </Stack>
                : <Typography>Без группы</Typography>
            }
          </Stack>
        </Stack>
        <Stack spacing={0.5} direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
          <Typography fontSize={14}>Абонемент:</Typography>
          <Typography color={user.trainingsLeft === 0 ? "" : user.trainingsLeft > 0 ? "typography.main" : "error"}>
            {user.trainingsLeft}
          </Typography>
          <Typography>{incline(user.trainingsLeft, "занятие", "занятия", "занятий")}</Typography>
        </Stack>
        <Stack spacing={1} sx={{ alignItems: "center" }}>
          <Box>
            <Typography fontSize={14}>Добавить к абонементу</Typography>
            <Counter
              count={trainingsToAdd}
              handleDecreaseClick={handleDecreaseClick}
              handleIncreaseClick={handleIncreaseClick}
            />
          </Box>
          <Stack spacing={1} direction="row">
            {
              variants.map(variant => (
                <TrainingsToAddVariant key={variant} value={variant} onClick={() => setTrainingsToAdd(variant)} />
              ))
            }
          </Stack>
        </Stack>
        {
          error && <Typography color="error">{error}</Typography>
        }
        <Button disabled={isLoading} onClick={handleChangeTrainingsLeftClick}>Подтвердить</Button>
      </Stack>
    </ModalWrapper>
  )
};

interface TrainingsToAddVariantProps {
  value: number;
  onClick: () => void;
}

const TrainingsToAddVariant: FC<TrainingsToAddVariantProps> = ({ value, onClick }) => {
  return (
    <Stack
      key={value}
      onClick={onClick}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        border: "1px solid #ddd",
        width: 30,
        height: 30,
        borderRadius: 1,
        cursor: "pointer",
        transition: "all 0.15s ease",
        "&:hover": {
          backgroundColor: "#F8F8F8"
        }
      }}
    >
      <Typography>{value}</Typography>
    </Stack>
  )
};

export default SetTrainingsLeftModal;