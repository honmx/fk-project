import { UserType } from "@/types/UserType";
import { Box, CircularProgress } from "@mui/material";
import { FC, memo, useContext, useEffect } from "react";
import UserItem from "../Items/UserItem";
import { useRequest } from "@/hooks/useRequest";
import usersService from "@/services/usersService";
import { UsersContext } from "@/contexts/usersContext";
import { useInView } from "react-intersection-observer";
import { useLazyUsers } from "@/hooks/useLazyUsers";

interface Props {
  debouncedName: string;
  selectValueId: number;
}

const UsersGroup: FC<Props> = memo(({ debouncedName, selectValueId }) => {

  const [ref, inView, entry] = useInView({ threshold: 0.1, triggerOnce: true });

  const { users, isFirstBunchOfUsersLoading, isNewBunchOfUsersLoading } = useLazyUsers(debouncedName, selectValueId, inView);

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
            <UserItem
              key={user.id}
              user={user}
              renderType
              ref={i === users.length - 1 ? ref : null}
              sx={{ borderBottom: i !== users.length - 1 ? "1px solid #DDD" : 0 }}
            />
          ))
      }
      {
        isNewBunchOfUsersLoading && <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={15} />
        </Box>
      }
    </Box>
  )
});

export default UsersGroup;