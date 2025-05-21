import { ITrainingByDay } from "./ITrainingByDay";

export type ChangedTrainingType = Pick<ITrainingByDay, "id" | "date" | "time" | "place">;