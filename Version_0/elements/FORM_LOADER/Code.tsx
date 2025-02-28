import React, { CSSProperties } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { FormProvider, UseFormReturn } from "react-hook-form";

import "./kdFormContainer.scss";

export interface KdFormContainerProps {
  style?: CSSProperties;
  sx?: CSSProperties;
  children: React.ReactNode;
  loading?: boolean;
  submitLoading?: boolean;
  formState: UseFormReturn;
  defaultValues?: { [x: string]: any };
  onSubmit?: (data: unknown) => void;
}

function KdFormContainer({
  style,
  sx,
  children,
  onSubmit,
  loading = false,
  submitLoading = false,
  formState,
}: KdFormContainerProps) {
  return (
    <FormProvider {...formState}>
      <form
        className="kdpa-form-container"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          if (event) {
            if (typeof event.preventDefault === "function") {
              event.preventDefault();
            }
            if (typeof event.stopPropagation === "function") {
              event.stopPropagation();
            }
          }

          return formState?.handleSubmit(async (values: any) => {
            onSubmit?.(values);
          })(event);
        }}
        style={{ ...sx, ...style }}
      >
        {loading ? <CircularProgress /> : children}
        {submitLoading && (
          <div className="kdpa-form-container__loading">
            <CircularProgress />
          </div>
        )}
      </form>
    </FormProvider>
  );
}

export default React.memo(KdFormContainer);
