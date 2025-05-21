import { Dispatch, SetStateAction, createContext } from "react";

export interface IRegistrationData {
  name: string;
  parentName?: string | null;
  birth?: string | null;
  email: string;
  phone?: string | null;
  password: string;
}

interface IRegistrationContext {
  registrationData: IRegistrationData;
  setRegistrationData: Dispatch<SetStateAction<IRegistrationData>>;
}

export const RegistrationContext = createContext<IRegistrationContext>({
  registrationData: {
    name: "",
    parentName: null,
    birth: null,
    email: "",
    phone: null,
    password: "",
  },
  setRegistrationData: () => {}
});