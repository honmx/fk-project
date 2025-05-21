import { ModalProps } from "@mui/material";
import { MouseEvent } from "react";

export interface IModalProps extends Omit<ModalProps, "children">  {
  open: boolean;
  handleCloseClick: (e?: MouseEvent<any>) => void;
}