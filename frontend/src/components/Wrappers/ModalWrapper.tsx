import { FC, useEffect, useRef, useState } from "react";
import { Box, IconButton, Modal, ModalProps, Paper, SxProps, Typography } from "@mui/material";
import crossIcon from "@/assets/cross icon.svg";
import penIcon from "@/assets/pen icon.svg";
import Image from "next/image";

interface Props extends ModalProps {
  open: boolean,
  handleCloseClick: () => void;
  edit?: boolean;
  handleEditClick?: () => void;
  maxWidth?: string;
}

const ModalWrapper: FC<Props> = ({ open, handleCloseClick, edit, handleEditClick, maxWidth = "100%", children, sx, ...restProps }) => {

  const ref = useRef<HTMLDivElement>(null);

  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    setIsOverflowing(ref.current?.getBoundingClientRect().height > window.innerHeight - 100);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleCloseClick}
      disablePortal
      disableAutoFocus={true}
      sx={{ overflowY: "auto", paddingTop: 4, paddingBottom: 4, paddingInline: 5, margin: "0 auto", ...sx, maxWidth: "auto" }}
      {...restProps}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: isOverflowing ? "stretch" : "center",
          minHeight: "100%",
        }}
      >
        <Box sx={{ position: "relative", margin: isOverflowing ? "50px 0" : "0" }}>
          <Paper ref={ref} sx={{ maxWidth: maxWidth || "1000px", overflow: "hidden", minWidth: 280 }}>
            {children}
          </Paper>
          <IconButton onClick={handleCloseClick} sx={{
            position: "absolute",
            top: 0,
            right: "-40px",
            width: "40px"
          }}>
            <Image src={crossIcon} alt="cross icon" />
          </IconButton>
          {
            edit &&
            <IconButton onClick={handleEditClick} sx={{
              position: "absolute",
              top: "40px",
              right: "-40px",
              width: "40px"
            }}>
              <Image src={penIcon} alt="pen icon" />
            </IconButton>
          }
        </Box>
      </Box>
    </Modal>
  )
};

export default ModalWrapper;
