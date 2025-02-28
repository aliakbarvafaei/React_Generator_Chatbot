import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { KdpaTooltip } from "../../Tooltips";
import { CircularProgress } from "@mui/material";

// import "./kdpaPrimaryButton.scss";

export interface KdpaPrimaryButtonProps extends ButtonProps {
  children?: React.ReactNode;
  icon?: JSX.Element;
  tooltipText?: string;
  loading?: boolean;
  onClick?: () => void;
  [x: string]: any;
}

function KdpaPrimaryButton({
  children,
  icon,
  tooltipText,
  onClick,
  loading,
  disabled,
  ...props
}: KdpaPrimaryButtonProps) {
  const ButtonContent = (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{ minWidth: "36px" }}
      startIcon={icon}
      {...props}
      disabled={loading || disabled}
    >
      {loading ? (
        <CircularProgress
          color="inherit"
          size={18}
          sx={{ marginY: "4px", marginX: "12px" }}
        />
      ) : (
        children
      )}
    </Button>
  );

  return tooltipText ? (
    <KdpaTooltip title={tooltipText}>{ButtonContent}</KdpaTooltip>
  ) : (
    ButtonContent
  );
}

export default KdpaPrimaryButton;
