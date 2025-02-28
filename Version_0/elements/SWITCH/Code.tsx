import React from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";

export type KdpaSwitchProps = SwitchProps;

const KdpaSwitch = React.forwardRef<HTMLInputElement, KdpaSwitchProps>(
  (props, ref) => {
    return (
      <Switch
        color="primary"
        inputRef={ref}
        inputProps={{ "aria-label": "primary checkbox" }}
        {...props}
      />
    );
  }
);
export default KdpaSwitch;
