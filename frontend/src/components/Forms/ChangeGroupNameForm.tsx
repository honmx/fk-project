import { FC, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { InferType } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "../UI/ControlledTextField";
import { Button, Stack, Typography } from "@mui/material";
import groupsService from "@/services/groupsService";
import { GroupContext } from "@/contexts/groupContext";
import { GroupsContext } from "@/contexts/groupsContext";

const applicationSchema = yup
  .object({
    groupName: yup.string().required()
  })
  .required();

interface IFormInput extends InferType<typeof applicationSchema> { }

interface Props {
  groupName: string;
  groupId?: number;
  handleCloseClick: () => void;
}

const ChangeGroupNameForm: FC<Props> = ({ groupName, groupId, handleCloseClick }) => {

  const { group, setGroup } = useContext(GroupContext);
  const { groups, setGroups } = useContext(GroupsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { control, setValue, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      groupName
    },
    resolver: yupResolver(applicationSchema)
  });

  useEffect(() => {
    setValue("groupName", groupName);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.groupName !== groupName) {
      setIsLoading(true);

      try {
        const groupWithNewName = await groupsService.changeGroupName(groupId || group.id, data.groupName);

        if (!groupWithNewName) return;

        setGroup({ ...group, name: groupWithNewName.name });
        setGroups(groups.map?.(group => group.id === groupWithNewName.id ? groupWithNewName : group));

      } catch (error: any) {
        setError(error.response.data.message);
        return;
        
      } finally {
        setIsLoading(false);
      }
    }
    
    handleCloseClick();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
      <Stack spacing={2}>
        <ControlledTextField
          control={control}
          name="groupName"
          sx={{ minWidth: "290px" }}
        />
        {
          error && <Typography color="error">{error}</Typography>
        }
        <Button type="submit" disabled={isLoading}>Применить</Button>
      </Stack>
    </form>
  )
};

export default ChangeGroupNameForm;