import axios from "axios";
import { bearerAxios } from "./bearerAxios";
import { IAuthResponse } from "@/types/IAuthResponse";

export const $authAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  withCredentials: true,
});

$authAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage?.getItem("token")}`;
  return config;
});

$authAPI.interceptors.response.use(
  config => config,
  async error => {
    const originalRequestConfig = error.config;

    if (error.response?.status === 401 && originalRequestConfig && !originalRequestConfig?._isRetry) {
      originalRequestConfig._isRetry = true;

      try {
        const response = await bearerAxios.get<IAuthResponse>("/auth/refresh");
        localStorage?.setItem("token", response.data.accessToken);
        return $authAPI.request(originalRequestConfig);

      } catch (error) {
        console.log(error);
      }
    }

    throw error;
  }
);