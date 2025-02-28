import React, { ReactNode } from "react";
import IconButton from "@mui/material/IconButton";
import { KdpaTooltip } from "../../Tooltips";

export interface KdpaIconButtonProps {
  icon?: ReactNode;
  tooltipText?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
  [x: string]: any;
}

function KdpaIconButton({
  icon,
  tooltipText = "",
  placement = "top",
  ...props
}: KdpaIconButtonProps) {
  const { disabled, onClick, children, ...restOfProps } = props;

  const IconButtonContent = (
    <IconButton disabled={disabled ?? false} onClick={onClick} {...restOfProps}>
      {children ? children : icon}
    </IconButton>
  );

  return tooltipText ? (
    <KdpaTooltip title={tooltipText} placement={placement}>
      {IconButtonContent}
    </KdpaTooltip>
  ) : (
    IconButtonContent
  );
}

export default KdpaIconButton;
