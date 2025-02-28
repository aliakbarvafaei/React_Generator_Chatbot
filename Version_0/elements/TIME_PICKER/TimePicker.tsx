import { KdpaTimePicker } from "kdpa-components";

function TimePicker(props: any) {
  return (
    <KdpaTimePicker
      {...props}
      required={props?.rules?.required?.value}
      InputProps={{ sx: props?.style }}
    />
  );
}

export default TimePicker;
