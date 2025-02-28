import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import { CircularProgress } from "@mui/material";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, onBlur, ...other } = props;
  return (
    <NumericFormat
      thousandSeparator
      valueIsNumericString
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      onBlur={(e) => {
        onBlur({
          ...e,
          target: {
            ...e?.target,
            value: (e?.target?.value ?? "")?.split(",").join(""),
          },
        });
      }}
    />
  );
});
export type KdpaInputProps = TextFieldProps & {
  textAlign?: "left" | "right" | "center";
  dir?: "ltr" | "rtl";
  loading?: boolean;
  readOnly?: boolean;
};

const KdpaInput = React.forwardRef<HTMLInputElement, KdpaInputProps>(
  ({ dir, ...props }, ref) => {
    return (
      <TextField
        sx={{ width: "100%" }}
        inputRef={ref}
        variant="standard"
        size="small"
        {...props}
        value={props?.value === null ? "" : props?.value}
        helperText={props?.error ? undefined : props?.helperText}
        InputProps={{
          ...props.InputProps,
          readOnly:
            props?.readOnly !== undefined
              ? props.readOnly
              : props.InputProps?.readOnly,
          endAdornment: (
            <>
              {props?.loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null}
              {props.InputProps?.endAdornment}
            </>
          ),
          inputComponent:
            props.type === "price"
              ? NumericFormatCustom
              : props?.InputProps?.inputComponent,
        }}
        inputProps={{
          ...props.inputProps,
          style: {
            ...props.inputProps?.style,
            direction: dir,
            textAlign: props?.textAlign,
          },
        }}
      />
    );
  }
);

export default KdpaInput;
