import { IPlace } from "@/types/IPlace";
import { Dispatch, SetStateAction, createContext } from "react";

interface IPlacesContext {
  places: IPlace[];
  setPlaces: Dispatch<SetStateAction<IPlace[]>>;
}

export const PlacesContext = createContext<IPlacesContext>({
  places: {} as IPlace[],
  setPlaces: () => {}
})