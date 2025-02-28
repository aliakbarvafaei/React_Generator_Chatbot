import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { SlCloudUpload } from "react-icons/sl";
import { KdpaCollapseTransitions } from "../../../../components/Transitions";
import { TypeAcceptUploader } from "../KdFileUploader/KdFileUploader";
import { getFileExtensions } from "./componentHelper";
import {
  KdpaTypography,
  KdpaUploadedFile,
  KdpaUploadingFile,
  KdpaUseFileUploadHook,
} from "../../../../components/index";
import { fetchFilesProperty, urlCreator } from "../../../utils/sharedUtils";

export interface KdAdvanceFileUploaderProps {
  label?: string;
  multiple?: boolean;
  required?: boolean;
  fileSizeLimit?: number;
  fileCountLimit?: number;
  onError: (message: string) => void;
  pathProp: {
    APIURL: string;
    sessionId?: string;
  };
  defaultValue?: string[] | string;
  accept?: TypeAcceptUploader;
  downloadSmallSize?: boolean;
  [x: string]: any;
}

const KdAdvanceFileUploader = ({
  label = "فایل(ها) را در این جعبه رها کنید، یا روی جعبه کلیک کنید",
  defaultValue,
  multiple = false,
  accept,
  fileCountLimit = 20,
  fileSizeLimit,
  onError,
  required,
  pathProp,
  downloadSmallSize,
  ...props
}: KdAdvanceFileUploaderProps) => {
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
        props.onChange(value[value.length - 1].session);
      else props.onChange();
    }
  }, [value]);

  const onDrop = useCallback(
    (comingFiles: any) => {
      const syntheticEvent: ChangeEvent<
        HTMLInputElement & { target: EventTarget & { files: FileList } }
      > = {
        //@ts-ignore
        target: {
          files: comingFiles,
        },
      };

      if (comingFiles.length + value.length > fileCountLimit) {
        onError?.(`حداکثر ${fileCountLimit} فایل می‌توانید بارگذاری کنید.`);
        return;
      } else handleFileChange(syntheticEvent, accept);
    },
    [value]
  );

  const onDelete = (session: string) => {
    setValue((old) => old.filter((value) => value.session !== session));
    if (
      tempFilesUploaded?.find((item) => item.session === session) &&
      removeFile
    )
      removeFile(session);
  };
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    open,
    inputRef,
  } = useDropzone({
    onDropAccepted: onDrop,
    accept: accept
      ? getFileExtensions(accept, fileExtension ?? null)
      : undefined,
    maxFiles: 9999,
    noClick: true,
    multiple: multiple,
    disabled: props?.disabled,
  });

  // this section for ctrl + v (paste)
  useEffect(() => {
    if (!inputRef.current) return;

    const handlePasteFile = async (event: ClipboardEvent) => {
      const files = event.clipboardData?.files;

      if (files && files.length > 0) {
        // Optionally, you can trigger your input's change event
        if (inputRef.current) {
          inputRef.current.files = files;
          inputRef.current.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        }
      }
    };

    document.addEventListener("paste", handlePasteFile);

    return () => {
      document.removeEventListener("paste", handlePasteFile);
    };
  }, [inputRef]);

  return (
    <Box>
      <Box
        component={"section"}
        sx={{
          // p: 2,
          mb: 1,
          border: 2,
          borderStyle: "dashed",
          borderRadius: 3,
          borderColor: (theme) => theme.palette.primary.main,
          transition: "all 0.3s ease-in-ease-out",
          ...(isDragAccept && {
            borderColor: (theme) => theme.palette.success.main,
          }),
          ...(isDragAccept && {
            bgcolor: (theme) => theme.palette.success.light,
          }),
          ...(isDragReject && {
            borderColor: (theme) => theme.palette.warning.main,
          }),
          ...(isDragReject && {
            bgcolor: (theme) => theme.palette.warning.light,
          }),
          ...props.sx,
        }}
        {...getRootProps()}
      >
        <input
          {...getInputProps()}
          {...(props["aria-id"] && { "aria-id": props["aria-id"] })}
        />
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <KdpaTypography sx={{ display: "flex", justifyContent: "center" }}>
            {label} {required && "*"}
          </KdpaTypography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              sx={{
                color: (theme) => theme.palette.primary.main,
                ...(isDragAccept && {
                  color: (theme) => theme.palette.success.main,
                }),
                ...(isDragReject && {
                  color: (theme) => theme.palette.warning.main,
                }),
                ...(props?.disabled && { opacity: "0.5" }),
              }}
              onClick={open}
            >
              <SlCloudUpload size={45} />
            </IconButton>
          </Box>
          <KdpaCollapseTransitions
            in={value?.length !== 0 || uploadingFiles?.length !== 0}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {value &&
                value.map((item) => {
                  const url = urlCreator(APIURL, item.session);

                  return (
                    <KdpaUploadedFile
                      sessionId={item.session}
                      smallUrl={url.thumbnail_URL}
                      largeUrl={url.larg_URL}
                      fileName={item.fileName}
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
          </KdpaCollapseTransitions>
        </Box>
      </Box>
    </Box>
  );
};

export default KdAdvanceFileUploader;
