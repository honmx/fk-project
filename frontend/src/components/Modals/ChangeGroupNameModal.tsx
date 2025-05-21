import { ChangeEvent, FC, useEffect, useState } from "react";
import { IModalProps } from "@/types/IModalProps";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import ChangeGroupNameForm from "../Forms/ChangeGroupNameForm";

interface Props extends IModalProps {
  groupName: string;
  groupId?: number;
}

const ChangeGroupNameModal: FC<Props> = ({ open, handleCloseClick, groupName, groupId }) => {
  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick}>
      <Stack spacing={3} sx={{ padding: 2 }}>
        <Typography fontSize={24}>Изменить название</Typography>
        <ChangeGroupNameForm groupName={groupName} groupId={groupId} handleCloseClick={handleCloseClick} />
      </Stack>
    </ModalWrapper>
  )
};

export default ChangeGroupNameModal;