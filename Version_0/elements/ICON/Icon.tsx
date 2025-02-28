import { generateIconString } from "@/utility/shared";
import { useEditorStore } from "@/core/store/editorStore";
import useIconLoaderWithTheme from "@/components/commons/IconPicker/Loader/useIconLoaderWithTheme";

function Icon(props: any) {
  const node = useEditorStore((store) => store.nodes?.[props.id]?.node);
  const iconString =
    node && generateIconString({ type: "element", content: node });

  const Icon = useIconLoaderWithTheme(iconString);

  return <>{Icon && <Icon {...props} sx={props?.style} style={null} />}</>;
}

export default Icon;
