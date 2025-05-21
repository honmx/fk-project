import { UserType } from "./UserType";

export interface IAuthResponse {
  user: UserType,
  accessToken: string;
  refreshToken: string;
}