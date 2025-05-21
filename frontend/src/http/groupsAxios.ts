import axios from "axios";

export const $groupsAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/groups`
});