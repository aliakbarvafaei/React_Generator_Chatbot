import React from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { KdpaInput } from "../../Input";

export type KdpaAutoCompleteProps<T> = AutocompleteProps<
  T,
  boolean,
  boolean,
  boolean
> & {
  label?: string;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard" | undefined;
  helperText?: string;
  error?: boolean;
};

function KdpaAutoComplete<T>(props: KdpaAutoCompleteProps<T>) {
  return (
    <Autocomplete
      {...props}
      options={props.options ?? []}
      renderInput={
        props.renderInput
          ? props.renderInput
          : (params) => (
              <KdpaInput
                {...params}
                size="small"
                placeholder={props?.placeholder}
                variant={props?.variant}
                label={props.label}
                helperText={props?.error ? undefined : props?.helperText}
                error={props?.error}
              />
            )
      }
    />
  );
}
export default KdpaAutoComplete;
