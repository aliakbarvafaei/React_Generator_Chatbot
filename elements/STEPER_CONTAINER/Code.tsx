import React, { HTMLAttributes, useEffect } from "react";
import "./KdStepRoot.scss";

import { styled } from "@mui/system";

const StyledDiv = styled("div")();

export interface KdStepRootProps extends HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  defaultValue?: string | number;
  children: React.ReactNode[];
  orientation?: "vertical" | "horizontal";
  clickSteps?: boolean;
  showConnector?: boolean;
}

function KdStepRoot({
  currentStep,
  setCurrentStep,
  defaultValue,
  children,
  orientation = "horizontal",
  clickSteps = false,
  showConnector = true,
  ...props
}: KdStepRootProps) {
  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === "string")
        setCurrentStep(parseInt(defaultValue));
      else setCurrentStep(defaultValue);
    }
  }, [defaultValue]);
  return (
    <StyledDiv
      {...props}
      className={`${props.className} KdStepRoot ${
        orientation === "vertical"
          ? "KdStepRoot_vertical"
          : "KdStepRoot_horizontal"
      }`}
    >
      {children.map((item, index) => {
        return React.isValidElement(item)
          ? React.cloneElement(item as React.ReactElement, {
              orientation,
              currentStep,
              setCurrentStep,
              clickSteps,
              showConnector,
              key: index,
            })
          : item;
      })}
    </StyledDiv>
  );
}

export default KdStepRoot;
