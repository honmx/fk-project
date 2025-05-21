import axios from "axios";

export const $placesAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/places`
});