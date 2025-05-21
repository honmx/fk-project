import axios from "axios";

export const $applicationsAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/applications`,
});