export interface IUser {
  id: number;
  type: "user" | "coach";
  email: string;
  password: string;
  photo: string | null;
  name: string;
  parentName?: string | null;
  birth?: string | null;
  roleId?: number | null;
}