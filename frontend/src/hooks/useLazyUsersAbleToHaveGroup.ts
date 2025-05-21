import usersService from "@/services/usersService";
import { useRequest } from "./useRequest";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "@/contexts/usersContext";
import { UserType } from "@/types/UserType";
import { GroupContext } from "@/contexts/groupContext";
import { IChild } from "@/types/IChild";

export const useLazyUsersAbleToHaveGroup = (amountOfTrainingsInSubscription: number, debouncedName: string, inView: boolean) => {
  
  const { group } = useContext(GroupContext);
  
  const [users, setUsers] = useState<IChild[]>([]);

  // to get first bunch of users
  const {
    data: firstBunchOfUsers,
    setData: setFirstBunchOfUsers,
    isLoading: isFirstBunchOfUsersLoading,
    error: firstBunchOfUsersError
  } = useRequest(() => usersService.getUsersAbleToHaveGroupLazy(group.id || 0, amountOfTrainingsInSubscription, 0, debouncedName), [], [debouncedName, amountOfTrainingsInSubscription]);

  // to continue loading according to name and selected filter
  const {
    data: newBunchOfUsers,
    setData: setNewBunchOfUsers,
    isLoading: isNewBunchOfUsersLoading,
    error: newBunchOfUsersError
  } = useRequest(() => usersService.getUsersAbleToHaveGroupLazy(group.id || 0, amountOfTrainingsInSubscription, users.length, debouncedName), [], [inView], () => !inView);

  useEffect(() => {
    setUsers(firstBunchOfUsers);
  }, [firstBunchOfUsers]);

  useEffect(() => {
    setUsers([...users, ...newBunchOfUsers]);
  }, [newBunchOfUsers]);

  return { users, isFirstBunchOfUsersLoading, isNewBunchOfUsersLoading };
}