import usersService from "@/services/usersService";
import { useRequest } from "./useRequest";
import { useContext, useEffect } from "react";
import { UsersContext } from "@/contexts/usersContext";
import { UserType } from "@/types/UserType";

export const useLazyUsers = (debouncedName: string, selectValueId: number, inView: boolean) => {

  const { users, setUsers } = useContext(UsersContext);

  // to get first bunch of users
  const {
    data: firstBunchOfUsers,
    setData: setFirstBunchOfUsers,
    isLoading: isFirstBunchOfUsersLoading,
    error: firstBunchOfUsersError
  } = useRequest(() => usersService.getUsersLazy(0, debouncedName, selectValueId), [], [debouncedName, selectValueId]);

  // to continue loading according to name and selected filter
  const {
    data: newBunchOfUsers,
    setData: setNewBunchOfUsers,
    isLoading: isNewBunchOfUsersLoading,
    error: newBunchOfUsersError
  } = useRequest(() => usersService.getUsersLazy(users.length, debouncedName, selectValueId), [], [inView], () => !inView);

  useEffect(() => {
    setUsers(firstBunchOfUsers);
  }, [firstBunchOfUsers]);

  useEffect(() => {
    setUsers([...users, ...newBunchOfUsers]);
  }, [newBunchOfUsers]);

  return { users, isFirstBunchOfUsersLoading, isNewBunchOfUsersLoading };
}