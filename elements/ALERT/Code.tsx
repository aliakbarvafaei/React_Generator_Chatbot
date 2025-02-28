import React, { forwardRef } from "react";
import DOMPurify from "dompurify";
import { Alert, AlertProps, AlertTitle } from "@mui/material";

export type KdAlertProps = AlertProps;

const KdAlert = forwardRef<HTMLDivElement, KdAlertProps>(function KdAlert(
  props: KdAlertProps,
  ref
) {
  const color = {
    success: "bg-light-success",
    info: "bg-light-info",
    warning: "bg-light-warning",
    error: "bg-light-danger",
  }[props.severity ?? "info"];

  const className = props.className ?? "d-flex align-items-center mb-50";

  const cleanValueTitle = DOMPurify.sanitize(props.title ?? "", {
    USE_PROFILES: { html: true },
  });
  const cleanValueChildren = DOMPurify.sanitize(
    (props.children as string) ?? "",
    {
      USE_PROFILES: { html: true },
    }
  );

  return (
    <Alert
      ref={ref}
      severity={props.severity}
      className={`${className} ${color}`}
    >
      {props.title && (
        <AlertTitle>
          <div
            dangerouslySetInnerHTML={{
              __html: cleanValueTitle,
            }}
          />
        </AlertTitle>
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: cleanValueChildren,
        }}
      />
    </Alert>
  );
});

export default KdAlert;
