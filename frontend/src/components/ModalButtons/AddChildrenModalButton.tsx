import { FC, useState } from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import smallPlusIcon from "@/assets/small plus icon.svg";
import { createPortal } from "react-dom";
import AddChildrenModal from "../Modals/AddChildrenModal";


interface Props {

}

const AddChildrenModalButton: FC<Props> = ({ }) => {

  const [isAddChildrenModalActive, setIsAddChildrenModalActive] = useState<boolean>(false);

  const handleOpenAddChildrenModal = () => {
    setIsAddChildrenModalActive(prev => !prev);
  }

  return (
    <>
      <Button onClick={handleOpenAddChildrenModal}>
        <Image src={smallPlusIcon} alt="change icon" width={12} height={12} style={{ marginRight: 5 }} />
        Добавить
      </Button>
      {
        typeof document !== "undefined" &&
        createPortal(
          <AddChildrenModal open={isAddChildrenModalActive} handleCloseClick={handleOpenAddChildrenModal} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default AddChildrenModalButton;