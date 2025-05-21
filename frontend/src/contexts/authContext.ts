import { UserType } from "@/types/UserType";
import { Dispatch, SetStateAction, createContext } from "react";

interface IAuthContext {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {}
});