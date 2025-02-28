import React, { ReactElement, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { KdpaCollapse } from "../Collapse";
import { KdpaTooltip } from "../Tooltips";
import { KdpaGrid, KdpaGridProps } from "../Grid";
import { useTheme } from "@mui/system";
import { styled } from "@mui/system";

const StyledDiv = styled("div")();
export interface KdpaSegmentProps extends KdpaGridProps {
  children?: ReactElement;
  label: string;
  maxLength?: number;
  expandable?: boolean;
  defaultOpen?: boolean;
}

function KdpaSegment({
  children,
  label = "",
  maxLength = 23,
  expandable = false,
  defaultOpen = true,
  color,
  ...props
}: KdpaSegmentProps) {
  const labelSize = Math.min(maxLength, label.length) * 7;
  const [isOpened, setIsOpened] = useState(defaultOpen ?? true);

  const theme = useTheme();

  const primaryColor =
    color || theme.palette?.primary?.main || "var(--bs-primary,#7367AA)";
  const borderColor = color || "#ebe9f1";

  const handleToggleSegment = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <KdpaGrid sx={{ ...props.style, ...props.sx, width: "100%" }}>
      <KdpaGrid
        xs={12}
        container
        sx={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: borderColor,
          position: "relative",
          marginLeft: "0.1rem",
          marginRight: "0.1rem",
          borderRadius: "0.357rem !important",
          borderTopWidth: "0px !important",
          padding: "1rem 0.1rem",
          "::before": {
            content: '""',
            backgroundColor: borderColor,
            position: "absolute",
            top: 0,
            right: "2px",
            width: `calc(${labelSize === 0 ? "100%" : `90% - ${labelSize}px`})`, // Replace labelSize with the actual value
            height: "0.7px",
          },
          "::after": {
            content: '""',
            backgroundColor: borderColor,
            position: "absolute",
            top: 0,
            right: "2px",
            width: "20px",
            height: "0.7px",
          },
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "10px",
            fontSize: "80%",
            padding: "0 13px",
            width: `calc(100px + ${labelSize}px)`,
          }}
        >
          <KdpaTooltip title={label}>
            <span>
              {label.length > maxLength ? (
                <>{label.substring(0, maxLength)} ...</>
              ) : (
                label
              )}
            </span>
          </KdpaTooltip>
        </span>
        {expandable && (
          <StyledDiv
            sx={{
              position: "absolute",
              top: "-8px",
              right: "20px",
              fontSize: "80%",
              padding: "0 16px",
              width: "20px",
              color: primaryColor,
            }}
          >
            {isOpened ? (
              <AiOutlineMinusCircle size={18} onClick={handleToggleSegment} />
            ) : (
              <AiOutlinePlusCircle size={18} onClick={handleToggleSegment} />
            )}
          </StyledDiv>
        )}
        <KdpaCollapse
          in={expandable ? isOpened : true}
          style={{ width: "100%" }}
        >
          <React.Fragment>{children}</React.Fragment>
        </KdpaCollapse>
      </KdpaGrid>
    </KdpaGrid>
  );
}

export default KdpaSegment;
