import { ICommonUserProps } from "./ICommonUserProps";
import { IGroup } from "./IGroup";
import { IHistoryItem } from "./IHistoryItem";
import { IInsurance } from "./IInsurance";
import { IMedicalDocument } from "./IMedicalDocument";
import { IRole } from "./IRole";

export interface IChild extends ICommonUserProps {
  type: "user";
  name: string;
  parentName: string;
  birth: string;
  phone: string;
  trainingsLeft: number;
  groups: Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[] | null;
  role: IRole<"USER">;
  medicalDocument: IMedicalDocument | null;
  insurance: IInsurance | null;
  history: IHistoryItem[];
}