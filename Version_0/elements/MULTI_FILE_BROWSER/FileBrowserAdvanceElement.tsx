import { KdAdvanceFileUploader } from "kdpa-components";

function FileBrowserAdvance(props: any) {
  return (
    <KdAdvanceFileUploader
      {...props}
      sx={props?.style}
      required={props?.rules?.required?.value}
      uploadHandler={{}}
    />
  );
}

export default FileBrowserAdvance;
