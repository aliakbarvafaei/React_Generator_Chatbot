import React from "react";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { BsX } from "react-icons/bs";

export interface KdModalProps extends Omit<DialogProps, "open"> {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  hasHeader?: boolean;
  backdropClick?: boolean;
  [x: string]: any;
}

function KdModal({
  title,
  children,
  onClose,
  isOpen,
  fullWidth = true,
  hasHeader = true,
  backdropClick = true,
  ...props
}: KdModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={(e, reason) => {
        if (reason === "backdropClick" && !backdropClick) {
          return;
        }
        onClose?.();
      }}
      fullWidth={fullWidth}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px",
          ...props?.sx,
        },
      }}
    >
      {hasHeader && (
        <DialogTitle
          id="alert-dialog-title"
          variant="body1"
          sx={{
            display: "flex",
            padding: "0px !important",
            paddingBottom: "20px !important",
            fontSize: "16px",
            fontWeight: 600,
            paddingLeft: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{title}</span>

          <IconButton onClick={onClose}>
            <BsX />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ padding: "1px" }}>{children}</DialogContent>
    </Dialog>
  );
}

export default KdModal;
