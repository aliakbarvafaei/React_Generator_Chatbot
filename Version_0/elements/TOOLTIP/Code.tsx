import Zoom from "@mui/material/Zoom";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

import { styled } from "@mui/system";

const StyledSpan = styled("span")();
export type KdTooltipProps = Pick<
  TooltipProps,
  "placement" | "title" | "arrow" | "enterDelay" | "leaveDelay"
> & {
  [key: string]: any;
};

const KdTooltip = ({
  title = "",
  arrow,
  children,
  placement,
  enterDelay,
  leaveDelay,
  ...props
}: KdTooltipProps) => {
  return (
    <Tooltip
      title={title}
      TransitionComponent={Zoom}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      arrow={arrow}
      placement={placement}
    >
      <StyledSpan {...props}>{children}</StyledSpan>
    </Tooltip>
  );
};

export default KdTooltip;
