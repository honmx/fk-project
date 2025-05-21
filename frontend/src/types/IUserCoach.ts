import { ICommonUserProps } from "./ICommonUserProps";
import { IRole } from "./IRole";

export interface IUserCoach extends ICommonUserProps {
  type: "coach";
  role: IRole<"ADMIN"> | null;
}