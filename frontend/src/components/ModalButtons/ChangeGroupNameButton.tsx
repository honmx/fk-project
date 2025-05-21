import { IconButton } from "@mui/material";
import Image from "next/image";
import { FC, useContext, useState } from "react";
import penIcon from "@/assets/pen icon.svg";
import { createPortal } from "react-dom";
import ChangeGroupNameModal from "../Modals/ChangeGroupNameModal";
import { GroupContext } from "@/contexts/groupContext";

interface Props {

}

const ChangeGroupNameButton: FC<Props> = ({ }) => {

  const { group } = useContext(GroupContext);

  const [isChangeGroupNameModalActive, setIsChangeGroupNameModalActive] = useState<boolean>(false);

  const handleOpenChangeGroupNameModal = () => {
    setIsChangeGroupNameModalActive(prev => !prev);
  }

  return (
    <>
      <IconButton color="black" onClick={handleOpenChangeGroupNameModal}>
        <Image src={penIcon} alt="pen icon" width={17} height={17} />
      </IconButton>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ChangeGroupNameModal open={isChangeGroupNameModalActive} handleCloseClick={handleOpenChangeGroupNameModal} groupName={group.name} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default ChangeGroupNameButton;