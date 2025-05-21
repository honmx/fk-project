import { IRole } from "./IRole";

export interface IUser {
  id: number;
  name: string;
  parentName: string | null;
  birth: string | null;
  photo: string | null;
  email: string;
  password: string;
  phone: string | null;
  role: IRole;
}