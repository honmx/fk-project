import { IGroup } from "@/types/IGroup";
import { Dispatch, SetStateAction, createContext } from "react";

interface IGroupsContext {
  groups: Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[];
  setGroups: Dispatch<SetStateAction<Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[]>>;
}

export const GroupsContext = createContext<IGroupsContext>({
  groups: {} as Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[],
  setGroups: () => {}
})