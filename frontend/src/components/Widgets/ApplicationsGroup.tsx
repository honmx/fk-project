import { UserType } from "@/types/UserType";
import { Box, CircularProgress } from "@mui/material";
import { FC, memo, useContext, useEffect } from "react";
import UserItem from "../Items/UserItem";
import { useRequest } from "@/hooks/useRequest";
import usersService from "@/services/usersService";
import { UsersContext } from "@/contexts/usersContext";
import { useInView } from "react-intersection-observer";
import { useLazyUsers } from "@/hooks/useLazyUsers";
import ApplicationItem from "../Items/ApplicationItem";
import { IApplication } from "@/types/IApplication";
import { useLazyApplications } from "@/hooks/useLazyApplications";

interface Props {
  debouncedName: string;
  selectValueId: number;
}

const ApplicationsGroup: FC<Props> = memo(({ debouncedName, selectValueId }) => {

  const [ref, inView, entry] = useInView({ threshold: 0.1, triggerOnce: true });

  const { applications, isFirstBunchOfApplicationsLoading, isNewBunchOfApplicationsLoading } = useLazyApplications(debouncedName, selectValueId, inView);

  if (isFirstBunchOfApplicationsLoading) {
    return <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  }

  return (
    <Box>
      {
        applications
          .map((application, i) => (
            <ApplicationItem
              key={application.id}
              application={application}
              ref={i === applications.length - 1 ? ref : null}
              sx={{ borderBottom: i !== applications.length - 1 ? "1px solid #DDD" : 0 }}
            />
          ))
      }
      {
        isNewBunchOfApplicationsLoading && <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={15} />
        </Box>
      }
    </Box>
  )
});

export default ApplicationsGroup;