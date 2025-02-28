import React from "react";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

export type KdpaCheckBoxProps = CheckboxProps;

const KdpaCheckBox = React.forwardRef<HTMLInputElement, KdpaCheckBoxProps>(
  (props, ref) => {
    return <Checkbox {...props} className={props.className} inputRef={ref} />;
  }
);

export default KdpaCheckBox;
