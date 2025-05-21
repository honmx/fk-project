import { Button } from "@mui/material";
import Image from "next/image";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import ChangeScheduleModal from "../Modals/ChangeScheduleModal";
import changeIcon from "@/assets/change icon.svg";

interface Props {

}

const ChangeScheduleButton: FC<Props> = ({ }) => {

  const [isChangeScheduleModalActive, setIsChangeScheduleModalActive] = useState<boolean>(false);

  const handleOpenChangeScheduleModal = () => {
    setIsChangeScheduleModalActive(prev => !prev);
  }

  return (
    <>
      <Button onClick={handleOpenChangeScheduleModal}>
        <Image src={changeIcon} alt="change icon" width={15} height={15} style={{ marginRight: 5 }} />
        Изменить расписание
      </Button>
      {
        typeof document !== "undefined" &&
        createPortal(
          <ChangeScheduleModal open={isChangeScheduleModalActive} handleCloseClick={handleOpenChangeScheduleModal} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default ChangeScheduleButton;