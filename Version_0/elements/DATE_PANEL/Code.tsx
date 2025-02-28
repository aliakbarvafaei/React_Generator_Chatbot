import { useMemo, useState } from "react";
import moment from "jalali-moment";

import {
  Box,
  Button,
  ButtonGroup,
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
} from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns as Gregory } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFnsJalali as Jalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

import { DatePickerToolbar } from "@mui/x-date-pickers/DatePicker";

import { KdpaTypography } from "../../Typography";

import "./KdpaDatePicker.scss";

export type KdpaDatePickerProps<T> = DatePickerProps<T> & {
  changeLocale?: boolean;
  required?: boolean;
  locale?: "fa" | "en" | "ar";
  variant?: "standard" | "outlined" | "filled";
  sx?: any;
  helperText?: string;
  title?: string;
  error?: boolean;
  InputProps?:
    | Partial<InputProps>
    | Partial<OutlinedInputProps>
    | Partial<FilledInputProps>
    | undefined;
  minDateValue?: "TODAY" | "CUSTOM";
  maxDateValue?: "TODAY" | "CUSTOM";
  [x: string]: any;
};

function KdpaDatePicker<T>({
  changeLocale = false,
  locale,
  defaultValue,
  value,
  variant = "outlined",
  required,
  sx = {},
  minDateValue,
  maxDateValue,
  ...props
}: KdpaDatePickerProps<T>) {
  const defaultLocale = locale || localStorage.getItem("i18nextLng") || "fa";

  const [loc, setLoc] = useState<string>(defaultLocale);

  const adaptor = useMemo(() => {
    switch (loc) {
      case "fa":
        return Jalali;
      case "en":
        return Gregory;
      case "ar":
        return Gregory;
      default:
        return Jalali;
    }
  }, [loc]);

  function CustomToolbar(props: any) {
    return (
      <Box
        className={props.className}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DatePickerToolbar {...props} />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            margin: "1em 1.5em 0 1.5em",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <KdpaTypography>
            {loc === "fa" ? "تقویم جلالی" : "تقویم میلادی"}
          </KdpaTypography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              disabled={loc === "en"}
              onClick={() => setLoc("en")}
              sx={{
                "&.Mui-disabled": {
                  color: "#fff",
                },
                backgroundColor: loc === "en" ? "primary.light" : "unset",
              }}
            >
              M
            </Button>
            <Button
              disabled={loc === "fa"}
              onClick={() => setLoc("fa")}
              sx={{
                "&.Mui-disabled": {
                  color: "#fff",
                },
                backgroundColor: loc === "fa" ? "primary.light" : "unset",
              }}
            >
              J
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={adaptor}>
      <DatePicker
        slotProps={{
          textField: {
            variant,
            size: "small",
            required,
            error: props?.error,
            helperText: props?.error ? undefined : props?.helperText,
            InputProps: props?.InputProps,
            title: props?.title,
            InputLabelProps: props?.InputLabelProps,
          },
        }}
        //@ts-ignore
        slots={
          changeLocale && {
            toolbar: CustomToolbar,
          }
        }
        sx={{ width: "100%", ...sx }}
        {...props}
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
            { defaultValue: new Date(defaultValue || null) }
          : {})}
        //@ts-ignore
        value={value ? new Date(value || null) : null}
        minDate={
          minDateValue === "TODAY"
            ? (new Date() as T)
            : minDateValue === "CUSTOM" && props?.minDate
            ? (new Date(props?.minDate as any) as T)
            : props?.minDate
        }
        maxDate={
          maxDateValue === "TODAY"
            ? (new Date() as T)
            : maxDateValue === "CUSTOM" && props?.maxDate
            ? (new Date(props?.maxDate as any) as T)
            : props?.maxDate
        }
      />
    </LocalizationProvider>
  );
}

export default KdpaDatePicker;
