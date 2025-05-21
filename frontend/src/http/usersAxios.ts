import axios from "axios";
import { bearerAxios } from "./bearerAxios";
import { IAuthResponse } from "@/types/IAuthResponse";

export const $usersAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/users`,
  withCredentials: true,
});

$usersAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage?.getItem("token")}`;
  return config;
});

$usersAPI.interceptors.response.use(
  config => config,
  async error => {
    const originalRequestConfig = error.config;

    if (error.response?.status === 401 && originalRequestConfig && !originalRequestConfig?._isRetry) {
      originalRequestConfig._isRetry = true;

      try {
        const response = await bearerAxios.get<IAuthResponse>("/auth/refresh");
        localStorage?.setItem("token", response.data.accessToken);
        return $usersAPI.request(originalRequestConfig);

      } catch (error) {
        console.log(error);
      }
    }

    throw error;
  }
);