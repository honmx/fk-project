import { IRole } from "./IRole";

export interface IUserCoach {
  id: number;
  email: string;
  password: string;
  role: IRole;
}