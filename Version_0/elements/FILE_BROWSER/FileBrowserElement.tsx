import { KdFileUploader } from "kdpa-components";

function FileBrowser(props: any) {
  return (
    <KdFileUploader
      {...props}
      required={props?.rules?.required?.value}
      uploadHandler={{}}
    />
  );
}

export default FileBrowser;
