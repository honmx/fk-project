import { selectUserFilterValues } from "@/data/selectUserFilterValues";
import { getNameAndSurname } from "@/helpers/getNameAndSurname";
import { IChild } from "@/types/IChild";
import { UserType } from "@/types/UserType";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useFilteredUsers = <T extends UserType>(users: T[], name: string, selectValueId: number = 0) => {

  const [filteredUsers, setFilteredUsers] = useState<T[]>(users);

  useEffect(() => {
    setFilteredUsers(
      users
        .filter(user => getNameAndSurname(user.name).toLowerCase().includes(name.toLowerCase()))
        // @ts-ignore
        .filter(selectUserFilterValues.find(value => value.id === selectValueId)?.filterFn || (() => true))
    )
  }, [users, name, selectValueId]);

  return { filteredUsers };
}