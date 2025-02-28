import { useEditorStore } from "@/core/store/editorStore";
import { KdImageBox } from "kdpa-components";
import { env } from "../../../../env";

function ImageBox(props: any) {
  const { VITE_APIURL: DOMAIN, VITE_UPLOAD_REST } = env;

  const setValueText = useEditorStore(
    (store) => store.nodes[props.id]?.meta?.setValueText
  );

  const setValueModel = useEditorStore(
    (store) => store.nodes[props.id]?.meta?.setValueModel
  );

  const assetFileId = useEditorStore(
    (store) => store.nodes[props.id]?.meta?.assetFileId
  );

  const src = assetFileId
    ? `${DOMAIN}${VITE_UPLOAD_REST}/api/v1/fileupload/download/stream/${assetFileId}`
    : setValueModel !== "COMPONENT_STATE"
    ? setValueText
    : null;

  return <KdImageBox key={assetFileId} {...props} src={src} />;
}

export default ImageBox;
