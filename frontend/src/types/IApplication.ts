export interface IApplication {
  id: number;
  childName: string;
  parentName: string;
  dateOfBirth: string;
  phone: string;
  branch: string;
  timeFrom: string;
  timeTo: string;
  status: "Новый" | "Просмотрено" | "Завершено"
}