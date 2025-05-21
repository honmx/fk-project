import { $usersAPI } from "@/http/usersAxios"
import { IChild } from "@/types/IChild"
import { IRole } from "@/types/IRole";
import { IUserCoach } from "@/types/IUserCoach";
import { IUserGeneralCoach } from "@/types/IUserGeneralCoach";
import { UserType } from "@/types/UserType";

const getAllUsers = async () => {
  const { data: users } = await $usersAPI.get<UserType[]>(`/`);
  return users;
}

const getUsersLazy = async (offset: number, name: string, filterId: number) => {
  const { data: users } = await $usersAPI.get<UserType[]>(`/lazy?offset=${offset}&name=${name}&filterId=${filterId}`);
  return users;
}

const getUsersAbleToHaveGroupLazy = async (groupId: number, amountOfTrainingsInSubscription: number, offset: number, name: string) => {
  const { data: users } = await $usersAPI.get<IChild[]>(`ableToHaveGroup/${groupId}/${amountOfTrainingsInSubscription}/lazy?offset=${offset}&name=${name}`);
  return users;
}

// const getUsersWithoutGroup = async () => {
//   const { data: users } = await $usersAPI.get<IChild[]>("/withoutGroup");
//   return users;
// }

const getUsersAbleToHaveGroup = async (groupId: number) => {
  const { data: users } = await $usersAPI.get<IChild[]>(`/ableToHaveGroup/${groupId || 0}`);
  return users;
}

const expelChild = async (userId: number, groupId: number, previousGroupAmountOfTrainingsInSubscription: number) => {
  try {
    const { data: expelledChild } = await $usersAPI.patch<IChild>(`/${userId}/removeGroup`, { groupId, previousGroupAmountOfTrainingsInSubscription });
    return expelledChild;

  } catch (error) {
    console.log(error);
  }
}

const changeGroup = async (userId: number, groupsId: number[], previousGroupAmountOfTrainingsInSubscription: number | null) => {
  const { data: user } = await $usersAPI.patch<IChild>(`/${userId}/changeGroup`, { groupsId, previousGroupAmountOfTrainingsInSubscription });
  return user;
}

const getCoachRoles = async () => {
  const { data: roles } = await $usersAPI.get<IRole[]>(`/coachRoles`);
  return roles;
}

const changeRole = async (userId: number, roleId: number) => {
  try {
    const { data: user } = await $usersAPI.patch<IUserCoach | IUserGeneralCoach>(`/${userId}/changeRole`, { roleId });
    return user;

  } catch (error) {
    console.log(error);
  }
}

const deleteRole = async (userId: number) => {
  try {
    const { data: user } = await $usersAPI.patch<IUserCoach | IUserGeneralCoach>(`/${userId}/deleteRole`);
    return user;

  } catch (error) {
    console.log(error);
  }
}

const changeTrainingsLeft = async (id: number, value: number) => {
  const { data: user } = await $usersAPI.patch<IChild>(`/${id}/changeTrainingsLeft`, { value });
  return user;
}

const uploadAvatar = async (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const { data: user } = await $usersAPI.patch<UserType>(`/${id}/uploadAvatar`, formData);
  return user;
}

const uploadMedicalDocumentPhoto = async (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const { data: user } = await $usersAPI.patch<IChild>(`/${id}/uploadMedicalDocumentPhoto`, formData);
  return user;
}

const setMedicalDocumentExpiration = async (id: number, expires: string) => {
  const { data: user } = await $usersAPI.patch<IChild>(`/${id}/setMedicalDocumentExpiration`, { expires });
  return user;
}

const uploadInsurancePhoto = async (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("photo", photo);

  const { data: user } = await $usersAPI.patch<IChild>(`/${id}/uploadInsurancePhoto`, formData);
  return user;
}

const setInsuranceExpiration = async (id: number, expires: string) => {
  const { data: user } = await $usersAPI.patch<IChild>(`/${id}/setInsuranceExpiration`, { expires });
  return user;
}

export default {
  getAllUsers,
  getUsersLazy,
  getUsersAbleToHaveGroupLazy,
  // getUsersWithoutGroup,
  // getUsersAbleToHaveGroup,
  expelChild,
  changeGroup,
  getCoachRoles,
  changeRole,
  deleteRole,
  changeTrainingsLeft,
  uploadAvatar,
  uploadMedicalDocumentPhoto,
  setMedicalDocumentExpiration,
  uploadInsurancePhoto,
  setInsuranceExpiration,
}