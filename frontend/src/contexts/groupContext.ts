import { IGroup } from "@/types/IGroup";
import { Dispatch, SetStateAction, createContext } from "react";

interface IGroupContext {
  group: IGroup;
  setGroup: Dispatch<SetStateAction<IGroup>>;
}

export const GroupContext = createContext<IGroupContext>({
  group: {} as IGroup,
  setGroup: () => {}
})