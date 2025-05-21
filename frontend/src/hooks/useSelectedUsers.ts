import { IChild } from "@/types/IChild";
import { useCallback, useEffect, useState } from "react";

export const useSelectedUsers = (deps?: any[]) => {
  const [selectedUsers, setSelectedUsers] = useState<Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">[]>([]);

  useEffect(() => {
    setSelectedUsers([]);
  }, deps || []);

  const handleSelectChild = useCallback((selectedUser: Pick<IChild, "id" | "name" | "photo" | "birth" | "groups">) => {
    const isUserAlreadySelected = selectedUsers.find(user => user.id === selectedUser.id) !== undefined

    if (isUserAlreadySelected) {
      setSelectedUsers(selectedUsers.filter(user => user.id !== selectedUser.id));
    } else {
      setSelectedUsers([...selectedUsers, selectedUser]);
    }
  }, deps ? [selectedUsers, ...deps] : [selectedUsers]);

  return { selectedUsers, setSelectedUsers, handleSelectChild }
}