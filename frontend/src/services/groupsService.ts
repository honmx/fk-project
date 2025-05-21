import { $groupsAPI } from "@/http/groupsAxios"
import { IChild } from "@/types/IChild";
import { IGroup } from "@/types/IGroup";
import { IMarkAttendanceItem } from "@/types/IMarkAttendanceItem";
import { IRequestTrainingByDayOfTheWeek } from "@/types/IRequestTrainingByDayOfTheWeek";
import { ISchedule } from "@/types/ISchedule";

const getGroups = async () => {
  const { data: groups } = await $groupsAPI.get<Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[]>("/");
  return groups;
}

const getGroupByName = async (groupName: string) => {
  try {
    const { data: group } = await $groupsAPI.get<IGroup>(`/group/${groupName}`);
    return group;

  } catch (error) {
    console.log(error);
  }
}

const getGroupById = async (groupId: number) => {
  try {
    const { data: group } = await $groupsAPI.get<IGroup>(`/${groupId}`);
    return group;

  } catch (error) {
    console.log(error);
  }
}

const getGroupParticipantsCount = async (groupId: number) => {
  const { data: participantsCount } = await $groupsAPI.get<number>(`${groupId}/participantsCount`);
  return participantsCount;
}

const createGroup = async (name: string, amountOfTrainingsInSubscription: number, participantsId: number[]) => {
  const { data: group } = await $groupsAPI.post("/", { name, participantsId, amountOfTrainingsInSubscription });
  return group;
}

const changeGroupName = async (groupId: number, groupName: string) => {
  const { data: groupWithNewName } = await $groupsAPI.patch<Pick<IGroup, "id" | "name">>(`/${groupId}/changeName`, { name: groupName });
  return groupWithNewName;
}

const deleteGroup = async (groupId: number, amountOfTrainingsInSubscription: number) => {
  await $groupsAPI.delete(`/${groupId}/${amountOfTrainingsInSubscription}`);
}

const getCurrentSchedule = async (groupId: number, month: number, year: number) => {
  try {
    const { data: schedule } = await $groupsAPI.get<ISchedule[]>(`/${groupId}/getCurrentSchedule/${year}/${month}`);
    return schedule;

  } catch (error) {
    console.log(error);
  }
}

const createSchedule = async (groupId: number, date: string, trainingsByDayOfTheWeek: IRequestTrainingByDayOfTheWeek[]) => {
  const { data: schedule } = await $groupsAPI.patch<ISchedule[]>(`/${groupId}/createSchedule`, { date, trainingsByDayOfTheWeek });
  return schedule;
}

const createTraining = async (groupId: number, date: string, time: string, placeId: number) => {
  try {
    const { data: schedule } = await $groupsAPI.patch<ISchedule[]>(`/${groupId}/createTraining`, { date, time, placeId });
    return schedule;

  } catch (error) {
    console.log(error);
  }
}

const changeTraining = async (groupId: number, id: number, date: string, time: string, placeId: number) => {
  const { data: schedule } = await $groupsAPI.patch<ISchedule[]>(`/${groupId}/changeTraining`, { id, date, time, placeId });
  return schedule;
}

const deleteTraining = async (groupId: number, date: string) => {
  const { data: schedule } = await $groupsAPI.delete<ISchedule[]>(`/${groupId}/deleteTraining/${date}`);
  return schedule;
}

const addChildren = async (groupId: number, usersId: number[]) => {
  try {
    const { data: users } = await $groupsAPI.patch<IChild[]>(`/${groupId}/addChildren`, { childrenId: usersId });
    return users;

  } catch (error) {
    console.log(error);
  }
}

const markAttendance = async (groupId: number, date: string, attendanceData: IMarkAttendanceItem[], amountOfTrainingsInSubscription: number) => {
  const { data: result } = await $groupsAPI.patch<IChild[]>(`/${groupId}/markAttendance`, { date, attendanceData, amountOfTrainingsInSubscription });
  return result;
}

const getAttendance = async (groupId: number, date: string) => {
  const { data: attendanceData } = await $groupsAPI.get<IMarkAttendanceItem[]>(`/${groupId}/getAttendance/${date}`);
  return attendanceData;
}

export default {
  getGroups,
  getGroupByName,
  getGroupById,
  getGroupParticipantsCount,
  createGroup,
  changeGroupName,
  deleteGroup,
  getCurrentSchedule,
  createSchedule,
  createTraining,
  changeTraining,
  deleteTraining,
  addChildren,
  markAttendance,
  getAttendance,
}