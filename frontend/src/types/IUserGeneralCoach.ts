import { ICommonUserProps } from "./ICommonUserProps";
import { IRole } from "./IRole";

export interface IUserGeneralCoach extends ICommonUserProps {
  type: "coach";
  role: IRole<"SUPER_ADMIN"> | null;
}