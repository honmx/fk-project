import { Dispatch, SetStateAction, createContext } from "react";

export interface IPasswordRecoveryData {
  email: string;
}

interface IPasswordRecoveryContext {
  passwordRecoveryData: IPasswordRecoveryData;
  setPasswordRecoveryData: Dispatch<SetStateAction<IPasswordRecoveryData>>;
}

export const PasswordRecoveryContext = createContext<IPasswordRecoveryContext>({
  passwordRecoveryData: {
    email: ""
  },
  setPasswordRecoveryData: () => { }
});