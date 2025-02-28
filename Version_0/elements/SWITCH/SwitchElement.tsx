import { KdpaSwitch, KdpaFormControlLabel } from "kdpa-components";

function Switch(props: any) {
  return (
    <KdpaFormControlLabel
      label={props.label}
      dir={props.style.direction}
      required={props?.rules?.required?.value}
      control={<KdpaSwitch {...props} />}
    />
  );
}

export default Switch;
