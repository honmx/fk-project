import { $authAPI } from "@/http/authAxios";
import { bearerAxios } from "@/http/bearerAxios";
import { IAuthResponse } from "@/types/IAuthResponse";
import { UserType } from "@/types/UserType";

interface LoginProps {
  email: string;
  password: string;
}

const login = async (loginProps: LoginProps): Promise<IAuthResponse> => {
  const { data: user } = await $authAPI.post<IAuthResponse>("/login", loginProps);
  localStorage.setItem("token", user.accessToken);
  return user;
}

const logout = async (): Promise<void> => {
  await $authAPI.post("/logout");
  localStorage.removeItem("token");
}

const refresh = async () => {
  const { data: userData } = await bearerAxios.get<IAuthResponse>("/auth/refresh");
  localStorage.setItem("token", userData.accessToken);
  return userData;
}

interface RegisterProps {
  name?: string;
  parentName?: string | null;
  birth?: string | null;
  email: string;
  phone?: string | null;
  password: string;
}

const register = async (registerProps: RegisterProps): Promise<IAuthResponse> => {
  const { data: user } = await $authAPI.post<IAuthResponse>("/register", registerProps);
  localStorage.setItem("token", user.accessToken);
  return user;
}

const registerCoach = async (registerProps: RegisterProps): Promise<IAuthResponse> => {
  const { data: user } = await $authAPI.post<IAuthResponse>("/registerCoach", registerProps);
  localStorage.setItem("token", user.accessToken);
  return user;
}

interface RecoverPasswordProps {
  email: string;
  password: string;
}

const recoverPassword = async (recoverPasswordProps: RecoverPasswordProps): Promise<UserType> => {
  const { data: user } = await $authAPI.put<UserType>("/recoverPassword", recoverPasswordProps);
  return user;
}

const sendCode = async (email: string) => {
  await $authAPI.post("/sendVerificationCode", { email });
}
interface ValidateCodeProps {
  email: string;
  code: number;
}

const validateCode = async ({ email, code }: ValidateCodeProps) => {
  await $authAPI.post("/validateVerificationCode", { email, code });
}

const validateRefreshToken = async (): Promise<UserType | undefined> => {
  try {
    const { data: user } = await $authAPI.get<UserType>("/validateRefreshToken");
    return user;

  } catch (error) {
    return undefined;
  }
}

export default {
  login,
  logout,
  refresh,
  register,
  registerCoach,
  recoverPassword,
  sendCode,
  validateCode,
  validateRefreshToken
}