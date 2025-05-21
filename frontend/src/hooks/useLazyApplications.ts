import usersService from "@/services/usersService";
import { useRequest } from "./useRequest";
import { useContext, useEffect } from "react";
import { UsersContext } from "@/contexts/usersContext";
import { UserType } from "@/types/UserType";
import { ApplicationsContext } from "@/contexts/ApplicationsContext";
import applicationsService from "@/services/applicationsService";

export const useLazyApplications = (debouncedName: string, selectValueId: number, inView: boolean) => {

  const { applications, setApplications } = useContext(ApplicationsContext);

  // to get first bunch of applications
  const {
    data: firstBunchOfApplications,
    setData: setFirstBunchOfApplications,
    isLoading: isFirstBunchOfApplicationsLoading,
    error: firstBunchOfApplicationsError
  } = useRequest(() => applicationsService.getApplicationsLazy(0, debouncedName, selectValueId), [], [debouncedName, selectValueId]);

  // to continue loading according to name and selected filter
  const {
    data: newBunchOfApplications,
    setData: setNewBunchOfApplications,
    isLoading: isNewBunchOfApplicationsLoading,
    error: newBunchOfApplicationsError
  } = useRequest(() => applicationsService.getApplicationsLazy(applications.length, debouncedName, selectValueId), [], [inView], () => !inView);

  useEffect(() => {
    setApplications(firstBunchOfApplications);
  }, [firstBunchOfApplications]);
  
  useEffect(() => {
    setApplications([...applications, ...newBunchOfApplications]);
  }, [newBunchOfApplications]);

  return { applications, isFirstBunchOfApplicationsLoading, isNewBunchOfApplicationsLoading };
}