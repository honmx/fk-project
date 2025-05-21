import { FC, useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import Image from "next/image";
import smallPlusIcon from "@/assets/small plus icon.svg";
import { createPortal } from "react-dom";
import CreateGroupModal from "../Modals/CreateGroupModal";

interface Props extends ButtonProps {

}

const CreateGroupButton: FC<Props> = ({ sx, ...restProps }) => {

  const [isCreateGroupModalActive, setIsCreateGroupModalActive] = useState<boolean>(false);

  const handleOpenCreateGroupModal = () => {
    setIsCreateGroupModalActive(prev => !prev);
  }

  return (
    <>
      <Button onClick={handleOpenCreateGroupModal} sx={{ ...sx }} {...restProps}>
        <Image src={smallPlusIcon} alt="change icon" width={12} height={12} style={{ marginRight: 5 }} />
        Создать
      </Button>
      {
        typeof document !== "undefined" &&
        createPortal(
          <CreateGroupModal open={isCreateGroupModalActive} handleCloseClick={handleOpenCreateGroupModal} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default CreateGroupButton;