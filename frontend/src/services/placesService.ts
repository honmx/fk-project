import { $placesAPI } from "@/http/placesAxios"
import { IPlace } from "@/types/IPlace"

const getPlaces = async () => {
  const { data: places } = await $placesAPI.get<IPlace[]>("/");
  return places;
}

const createPlace = async (name: string, photo: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("photo", photo);

  const { data: place } = await $placesAPI.post<IPlace>("/", formData);
  return place;
}

const uploadPlacePhoto = async (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const { data: place } = await $placesAPI.patch<IPlace>(`/${id}/uploadPhoto`, formData);
  return place;
}

const changePlaceName = async (id: number, name: string) => {
  const { data: place } = await $placesAPI.patch<IPlace>(`/${id}/changeName`, { name });
  return place;
}

const deletePlace = async (id: number) => {
  const { data: place } = await $placesAPI.delete<IPlace>(`/${id}`);
  return place;
}

export default {
  getPlaces,
  createPlace,
  uploadPlacePhoto,
  changePlaceName,
  deletePlace
}