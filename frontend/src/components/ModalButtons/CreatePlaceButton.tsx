import { FC, useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import Image from "next/image";
import smallPlusIcon from "@/assets/small plus icon.svg";
import { createPortal } from "react-dom";
import CreatePlaceModal from "../Modals/CreatePlaceModal";

interface Props extends ButtonProps {

}

const CreatePlaceButton: FC<Props> = ({ sx, ...restProps }) => {

  const [isCreatePlaceModalActive, setIsCreatePlaceModalActive] = useState<boolean>(false);

  const handleOpenCreatePlaceModal = () => {
    setIsCreatePlaceModalActive(prev => !prev);
  }

  return (
    <>
      <Button onClick={handleOpenCreatePlaceModal} sx={{ ...sx }} {...restProps}>
        <Image src={smallPlusIcon} alt="change icon" width={12} height={12} style={{ marginRight: 5 }} />
        Создать
      </Button>
      {
        typeof document !== "undefined" &&
        createPortal(
          <CreatePlaceModal open={isCreatePlaceModalActive} handleCloseClick={handleOpenCreatePlaceModal} />,
          document.body.querySelector("#modal-container") as Element
        )
      }
    </>
  )
};

export default CreatePlaceButton;