import { KdpaCheckBox, KdpaFormControlLabel } from "kdpa-components";

function CheckBox(props: any) {
  return (
    <KdpaFormControlLabel
      label={props.label}
      dir={props.style.direction}
      required={props?.rules?.required?.value}
      control={<KdpaCheckBox {...props} />}
      sx={props?.style}
    />
  );
}

export default CheckBox;
