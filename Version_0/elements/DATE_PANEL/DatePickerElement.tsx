import { KdpaDatePicker } from "kdpa-components";

function DatePicker(props: any) {
  return (
    <KdpaDatePicker
      {...props}
      required={props?.rules?.required?.value}
      InputProps={{ sx: props?.style }}
    />
  );
}

export default DatePicker;
