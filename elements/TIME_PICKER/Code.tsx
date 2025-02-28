import { useMemo } from "react";
import moment from "jalali-moment";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DesktopTimePicker,
  DesktopTimePickerProps,
} from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export type KdpaTimePickerProps<T> = DesktopTimePickerProps<T> & {
  required?: boolean;
  variant?: "standard" | "outlined" | "filled";
  helperText?: string;
  error?: boolean;
  InputProps?: any;
  title?: string;
  locale?: "fa" | "en" | "ar";
  minTimeValue?: "NOW" | "CUSTOM";
  maxTimeValue?: "NOW" | "CUSTOM";
};

function KdpaTimePicker<T>({
  locale,
  error = false,
  required = false,
  minTimeValue,
  maxTimeValue,
  defaultValue,
  value,
  ...props
}: KdpaTimePickerProps<T>) {
  const defaultLocale = locale || localStorage.getItem("i18nextLng") || "fa";

  const adaptor = useMemo(() => {
    switch (defaultLocale) {
      case "fa":
        return AdapterDateFnsJalali;
      case "en":
        return AdapterDateFns;
      case "ar":
        return AdapterDateFns;
      default:
        return AdapterDateFnsJalali;
    }
  }, [defaultLocale]);

  return (
    <LocalizationProvider dateAdapter={adaptor}>
      <DesktopTimePicker
        {...props}
        slotProps={{
          actionBar: { actions: [] },
          textField: {
            variant: props?.variant,
            size: "small",
            required: required,
            error: error,
            helperText: error ? undefined : props?.helperText,
            InputProps: props?.InputProps,
            title: props?.title,
          },
        }}
        sx={{ width: "100%", ...props?.sx }}
        minTime={
          minTimeValue === "NOW"
            ? (new Date() as T)
            : minTimeValue === "CUSTOM" && props?.minTime
            ? (new Date(props?.minTime as any) as T)
            : props?.minTime
        }
        maxTime={
          maxTimeValue === "NOW"
            ? (new Date() as T)
            : maxTimeValue === "CUSTOM" && props?.maxTime
            ? (new Date(props?.maxTime as any) as T)
            : props?.maxTime
        }
        onChange={(value) => {
          // convert type date to ISO
          //@ts-ignore
          const convertValue = moment(value).locale("en").format();
          //@ts-ignore
          props?.onChange(
            convertValue.toString() === "Invalid date" ? null : convertValue
          );
        }}
        {...(defaultValue
          ? //@ts-ignore
            { defaultValue: new Date(defaultValue || undefined) }
          : {})}
        //@ts-ignore
        value={value ? new Date(value || null) : undefined}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
    </LocalizationProvider>
  );
}

export default KdpaTimePicker;
