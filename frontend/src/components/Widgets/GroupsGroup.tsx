import { useRequest } from "@/hooks/useRequest";
import placesService from "@/services/placesService";
import { Box, Grid, Stack } from "@mui/material";
import { FC } from "react";
import AccountPlaceCard from "../Cards/AccountPlaceCard";
import { IPlace } from "@/types/IPlace";
import { IGroup } from "@/types/IGroup";
import GroupCard from "../Cards/GroupCard";

interface Props {
  groups: Pick<IGroup, "id" | "name" | "amountOfTrainingsInSubscription">[];
}

const GroupsGroup: FC<Props> = ({ groups }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2 }}>
      {
        groups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))
      }
    </Box>
  )
};

export default GroupsGroup;