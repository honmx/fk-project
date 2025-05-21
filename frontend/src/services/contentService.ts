import { $contentAPI } from "@/http/contentAxios"
import { ICoach } from "@/types/ICoach";
import { INews } from "@/types/INews";

const getCoaches = async () => {
  try {
    const { data: coaches } = await $contentAPI.get<ICoach[]>("/coaches");
    return coaches;

  } catch (error) {
    console.log(error);
  }
}

const getNews = async () => {
  try {
    const { data: news } = await $contentAPI.get<INews[]>("/news");
    return news;

  } catch (error) {
    console.log(error);
  }
}

export default {
  getCoaches,
  getNews
}