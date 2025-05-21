import { IApplication } from "@/types/IApplication";
import { Dispatch, SetStateAction, createContext } from "react";

interface IApplicationsContext {
  applications: IApplication[];
  setApplications: Dispatch<SetStateAction<IApplication[]>>;
}

export const ApplicationsContext = createContext<IApplicationsContext>({
  applications: [],
  setApplications: () => {}
})