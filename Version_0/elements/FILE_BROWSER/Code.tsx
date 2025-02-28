import { CSSProperties, useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import {
  KdpaSecondaryButton,
  KdpaTypography,
  KdpaUploadedFile,
  KdpaUploadingFile,
  KdpaUseFileUploadHook,
} from "../../../../components";
import { getFileExtensions } from "./componentHelper";
import { fetchFilesProperty, urlCreator } from "../../../utils/sharedUtils";

export type TypeAcceptUploader = {
  image?: string[] | "ALL";
  video?: string[] | "ALL";
  text?: string[] | "ALL";
  compress?: string[] | "ALL";
};

export interface KdFileUploaderProps {
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  required?: boolean;
  defaultValue?: string[] | string;
  accept?: TypeAcceptUploader;
  fileSizeLimit?: number;
  fileCountLimit?: number;
  onError: (message: string) => void;
  pathProp: {
    APIURL?: string;
    sessionId?: string;
  };
  value?: string[] | string;
  inputStyle?: CSSProperties;
  style?: CSSProperties;
  downloadSmallSize?: boolean;
  [x: string]: any;
}

function KdFileUploader({
  label,
  defaultValue,
  placeholder,
  multiple = false,
  accept,
  fileCountLimit,
  fileSizeLimit,
  onError,
  pathProp,
  inputStyle,
  style,
  required,
  downloadSmallSize,
  ...props
}: KdFileUploaderProps) {
  const {
    files: tempFilesUploaded,
    removeFile,
    uploadingFiles,
    handleFileChange,
    fileExtension,
    APIURL,
  } = KdpaUseFileUploadHook({
    multiple,
    APIURL: pathProp?.APIURL,
    sessionId: pathProp?.sessionId,
    onError: onError,
    fileSizeLimit: fileSizeLimit,
    fileCountLimit: fileCountLimit,
  });

  const [value, setValue] = useState<{ fileName?: string; session: string }[]>(
    []
  );

  useEffect(() => {
    if (props?.value === null && value.length > 0) {
      value.forEach((item) => removeFile(item.session));
      setValue([]);
    }
  }, [props?.value]);
  // first render for check default value
  useEffect(() => {
    const fetchAndSetFileProperties = async () => {
      if (defaultValue) {
        const defaultSessions = Array.isArray(defaultValue)
          ? [...defaultValue]
          : [defaultValue];
        const data = await fetchFilesProperty(
          APIURL,
          defaultSessions,
          pathProp?.sessionId
        );

        setValue(
          defaultSessions.map((session) => ({
            fileName: (data ?? []).find((el: any) => el.guid === session)
              ?.fileName,
            session: session,
          }))
        );
      } else {
        setValue([]);
      }
    };

    fetchAndSetFileProperties();
  }, [defaultValue]);

  // handle uploaded file
  useEffect(() => {
    if (tempFilesUploaded) {
      if (multiple)
        setValue((old) => [
          ...old,
          ...(tempFilesUploaded
            .filter((file) => !value.find((el) => el.session === file.session))
            .map((file) => ({
              fileName: file.fileName,
              session: file.session,
            })) ?? []),
        ]);
      else if (tempFilesUploaded.length > 0)
        setValue([
          {
            fileName: tempFilesUploaded[0]?.fileName,
            session: tempFilesUploaded[0]?.session,
          },
        ]);
    }
  }, [tempFilesUploaded]);

  // all changes in files value should be apply to onChange form and set value form
  useEffect(() => {
    if (props.onChange) {
      if (multiple) props.onChange((value ?? []).map((item) => item.session));
      else if (value.length > 0)
        props.onChange(value[value.length - 1]?.session);
      else props.onChange();
    }
  }, [value]);

  const onDelete = (session: string) => {
    setValue((old) => old.filter((value) => value.session !== session));
    if (
      tempFilesUploaded?.find((item) => item.session === session) &&
      removeFile
    )
      removeFile(session);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        width: "100%",
        ...style,
      }}
    >
      <KdpaTypography>
        {label} {required && "*"}
      </KdpaTypography>

      <label htmlFor={`icon-button-file-${props.name}`}>
        <KdpaSecondaryButton
          component="span"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            ...inputStyle,
            ...(props?.disabled && { opacity: "0.5" }),
          }}
        >
          <FiUpload />
          {placeholder}
        </KdpaSecondaryButton>
      </label>
      <input
        style={{ display: "none" }}
        accept={
          fileExtension && accept
            ? getFileExtensions(accept, fileExtension)
            : "*"
        }
        id={`icon-button-file-${props.name}`}
        type="file"
        multiple={multiple}
        onChange={(e) => {
          handleFileChange(e, accept);
        }}
        disabled={props?.disabled}
      />

      <input type="hidden" {...props} value={value?.map((el) => el.session)} />

      {value &&
        value.map((item) => {
          const url = urlCreator(APIURL, item.session);

          return (
            <KdpaUploadedFile
              sessionId={item?.session}
              smallUrl={url.thumbnail_URL}
              largeUrl={url.larg_URL}
              fileName={item?.fileName}
              onDelete={props.disabled ? undefined : onDelete}
              downloadSmallSize={downloadSmallSize}
              modal={true}
              extention={item.fileName?.split(".").pop()}
            />
          );
        })}
      {uploadingFiles &&
        (multiple || value.length === 0) &&
        uploadingFiles.map((item) => {
          return <KdpaUploadingFile progress={item.progress} />;
        })}
    </div>
  );
}

export default KdFileUploader;
