import { FC } from "react";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { IModalProps } from "@/types/IModalProps";
import { Box } from "@mui/material";
import Image, { StaticImageData } from "next/image";

interface Props extends IModalProps {
  image: string | StaticImageData;
}

const ViewImageModal: FC<Props> = ({ open, handleCloseClick, image }) => {
  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} maxWidth="800px">
      <Image src={image} alt="image" width={500} height={500} style={{ maxHeight: "75vh", width: "auto" }} />
    </ModalWrapper>
  )
};

export default ViewImageModal;