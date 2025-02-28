import { KdpaTypography, KdpaTypographyProps } from "../../../components";
import { typographyHelper } from "./typographyHelper";

type TypeFormat =
  | "DD-MM-YYYY"
  | "MM-DD-YYYY"
  | "YYYY-MM-DD"
  | "DD/MM/YYYY"
  | "YY-MM-DD";

type TypeFormatTime =
  | "hh:mm:ss"
  | "HH:mm:ss"
  | "hh:mm"
  | "HH:mm"
  | "hh:mm a"
  | "hh:mm:ss a";

type TypeFormatDateTime =
  | "YYYY/MM/DD HH:mm:ss"
  | "YYYY-MM-DD hh:mm:ss a"
  | "YYYY/MM/DD hh:mm:ss a";

export type TypeMeta = {
  type?:
    | "string"
    | "number"
    | "date"
    | "time"
    | "date-time"
    | "boolean"
    | "html";
  maxLength?: number;
  typeNumber?: "int" | "float" | "cost";
  format?: TypeFormat;
  formatTime?: TypeFormatTime;
  formatDateTime?: TypeFormatDateTime;
  loc?: "fa" | "en" | "ar";
  ignoreTags?: boolean;
};

export type KdTypographyProps = KdpaTypographyProps & TypeMeta;

const KdTypography = ({ type = "string", ...props }: KdTypographyProps) => {
  const meta: TypeMeta = {
    type: type,
    maxLength: props.maxLength,
    typeNumber: props.typeNumber,
    format: props.format,
    formatTime: props.formatTime,
    formatDateTime: props.formatDateTime,
    loc: props.loc,
    ignoreTags: props.ignoreTags ?? true,
  };

  return (
    <KdpaTypography {...props}>
      {typographyHelper(props.children, meta)}
    </KdpaTypography>
  );
};

export default KdTypography;
