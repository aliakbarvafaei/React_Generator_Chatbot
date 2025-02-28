import React from "react";
import Stepper, { StepperProps } from "@mui/material/Stepper";
import { Step, StepConnector } from "@mui/material";
import "./KdStepList.scss";

export interface KdStepListProps extends StepperProps {
  children: React.ReactNode[];
  currentStep?: number;
  setCurrentStep?: (value: number) => void;
  clickSteps?: boolean;
  showConnector?: boolean;
}
function KdStepList({
  children,
  currentStep,
  setCurrentStep,
  orientation = "horizontal",
  clickSteps = true,
  showConnector = true,
  ...props
}: KdStepListProps) {
  return (
    <Stepper
      activeStep={currentStep}
      orientation={orientation}
      {...props}
      connector={
        <StepConnector
          sx={{ visibility: showConnector ? "visible" : "hidden" }}
        />
      }
      sx={{
        ...props.sx,
        ".MuiStepConnector-lineVertical": {
          height: "100%",
        },
      }}
      className={`${props.className} ${
        orientation === "vertical"
          ? "KdStepper_vertical"
          : "KdStepper_horizontal"
      }`}
    >
      {children.map((child, index) => {
        if (child)
          return (
            <Step
              active={currentStep === index}
              completed={
                currentStep !== undefined ? currentStep > index : false
              }
            >
              {React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement, {
                    orientation,
                    currentStep,
                    setCurrentStep,
                    clickSteps,
                    key: index,
                  })
                : child}
            </Step>
          );
      })}
    </Stepper>
  );
}

export default KdStepList;

import { HTMLAttributes } from "react";
import { KdpaPrimaryButton } from "../../../../components";
import "./KdStepContent.scss";

import { styled } from "@mui/system";

const StyledDiv = styled("div")();

export interface KdStepContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  footer?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
  index?: number;
  currentStep?: number;
  setCurrentStep?: (value: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  orientation?: "vertical" | "horizontal";
}

function KdStepContent({
  children,
  footer = false,
  backButtonText = "قبلی",
  nextButtonText = "بعدی",
  index,
  currentStep,
  setCurrentStep,
  onPrev,
  onNext,
  orientation = "horizontal",
  ...props
}: KdStepContentProps) {
  const handleNext = () => {
    if (setCurrentStep && currentStep !== undefined)
      setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (setCurrentStep && currentStep !== undefined)
      setCurrentStep(currentStep - 1);
  };

  if (currentStep === index)
    return (
      <StyledDiv
        className={
          orientation === "horizontal"
            ? "KdStepContent_horizontal"
            : "KdStepContent_vertical"
        }
        {...props}
      >
        <div>{children}</div>
        {footer && (
          <div className="KdStepContent_Buttons">
            <KdpaPrimaryButton
              disabled={currentStep === 0}
              onClick={() => {
                if (onPrev) onPrev();
                else handleBack();
              }}
            >
              {backButtonText}
            </KdpaPrimaryButton>
            <KdpaPrimaryButton
              variant="contained"
              onClick={() => {
                if (onNext) onNext();
                else handleNext();
              }}
            >
              {nextButtonText}
            </KdpaPrimaryButton>
          </div>
        )}
      </StyledDiv>
    );
  else return <></>;
}

export default KdStepContent;

import { useTheme } from "@mui/material";
import StepLabel, { StepLabelProps } from "@mui/material/StepLabel";
import "./KdStepTrigger.scss";
export interface KdStepTriggerProps extends StepLabelProps {
  index: number;
  currentStep?: number;
  setCurrentStep?: (value: number) => void;
  clickSteps?: boolean;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  activeIcon?: React.ReactNode;
}

function KdStepTrigger({
  children,
  index,
  currentStep = 0,
  setCurrentStep,
  clickSteps = true,
  icon,
  completedIcon,
  activeIcon,
  ...props
}: KdStepTriggerProps) {
  const handleStep = (step: number) => {
    if (setCurrentStep) setCurrentStep(step);
  };

  const theme = useTheme();

  function getIcon() {
    if (currentStep === index) {
      return activeIcon ?? completedIcon ?? icon;
    } else if (currentStep > index) {
      return completedIcon ?? icon;
    } else {
      return icon;
    }
  }
  return (
    <StepLabel
      onClick={() => {
        if (clickSteps) handleStep(index);
      }}
      {...props}
      icon={getIcon()}
      className="KdStepLabel"
      style={
        {
          ...props?.style,
          "--primary-main": theme.palette.primary.main,
        } as React.CSSProperties
      }
    >
      {children}
    </StepLabel>
  );
}

export default KdStepTrigger;
