import { IGroup } from "@/types/IGroup";
import { UserType } from "@/types/UserType";
import { Dispatch, SetStateAction, createContext } from "react";

interface IUsersContext {
  users: UserType[];
  setUsers: Dispatch<SetStateAction<UserType[]>>;
}

export const UsersContext = createContext<IUsersContext>({
  users: [],
  setUsers: () => {}
})