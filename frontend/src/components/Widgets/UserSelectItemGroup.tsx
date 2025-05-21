import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import { IChild } from "@/types/IChild";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FC, memo, useState } from "react";
import UserSelectItem from "../Items/UserSelectItem";
import { useInView } from "react-intersection-observer";
import { useLazyUsersAbleToHaveGroup } from "@/hooks/useLazyUsersAbleToHaveGroup";

interface Props {
  selectedUsers: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">[];
  debouncedName: string;
  handleSelectChild: (user: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">) => void;
  amountOfTrainingsInSubscription: number;
}

const UserSelectItemGroup: FC<Props> = memo(({ selectedUsers, debouncedName, handleSelectChild, amountOfTrainingsInSubscription }) => {

  const [ref, inView, entry] = useInView({ threshold: 0.1, triggerOnce: true });

  const {
    users,
    isFirstBunchOfUsersLoading,
    isNewBunchOfUsersLoading
  } = useLazyUsersAbleToHaveGroup(amountOfTrainingsInSubscription, debouncedName, inView);

  if (isFirstBunchOfUsersLoading) {
    return <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  }

  return (
    <Box>
      {
        users
          .map((user, i) => (
            <UserSelectItem
              key={user.id}
              user={user as Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">}
              handleSelectChild={handleSelectChild}
              checked={!!selectedUsers.find(selectedUser => selectedUser.id === user.id)}
              ref={i === users.length - 1 ? ref : null}
              sx={{ borderBottom: i < users.length - 1 ? "1px solid #DDD" : 0 }}
            />
          ))
      }
      {
        users.length === 0 && !isFirstBunchOfUsersLoading && !isNewBunchOfUsersLoading && <>
          <Typography textAlign="center" sx={{ margin: "25px 0" }}>Отсутствуют пользователи, которых можно добавить</Typography>
        </>
      }
      {
        isNewBunchOfUsersLoading && <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={15} />
        </Box>
      }
    </Box>
  )
});

export default UserSelectItemGroup;