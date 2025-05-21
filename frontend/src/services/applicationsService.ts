import { $applicationsAPI } from "@/http/applicationsAxios";
import { IApplication } from "@/types/IApplication";

const getApplications = async () => {
  const { data: applications } = await $applicationsAPI.patch<IApplication[]>(`/`);
  return applications;
}

const getApplicationsLazy = async (offset: number, name: string, filterId: number) => {
  const { data: applications } = await $applicationsAPI.get<IApplication[]>(`/lazy?offset=${offset}&name=${name}&filterId=${filterId}`);
  return applications;
}

const createApplication = async (data: Omit<IApplication, "id" | "status">) => {
  const { data: application } = await $applicationsAPI.post<IApplication>(`/`, data);
  return application;
}

const updateStatus = async (id: number, status: "Просмотрено" | "Завершено") => {
  const { data: application } = await $applicationsAPI.patch<IApplication>(`/${id}/updateStatus`, { status });
  return application;
}

const deleteApplication = async (id: number) => {
  const { data: application } = await $applicationsAPI.delete<IApplication>(`/${id}`);
  return application;
}

export default {
  getApplications,
  getApplicationsLazy,
  createApplication,
  updateStatus,
  deleteApplication
}