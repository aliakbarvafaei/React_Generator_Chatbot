import React, { forwardRef } from "react";
import { RadioGroup, RadioGroupProps } from "@mui/material";

export type KdpaRadioGroupPorps = RadioGroupProps;

function KdpaRadioGroup(props: KdpaRadioGroupPorps) {
  return <RadioGroup {...props}>{props.children}</RadioGroup>;
}

export default KdpaRadioGroup;
