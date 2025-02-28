import { KdpaIconButton } from "kdpa-components";
import { generateIconString } from "@/utility/shared";
import { useEditorStore } from "@/core/store/editorStore";
import { KDLElementNode } from "@/core/types/node";
import useIconLoaderWithTheme from "@/components/commons/IconPicker/Loader/useIconLoaderWithTheme";

function IconButton(props: any) {
  const innerChildren = useEditorStore(
    (store) => store.nodes[props.id]?.node?.innerChildren
  );

  const iconElement = innerChildren?.find(
    (item) => item.type === "element"
  ) as KDLElementNode;

  const iconString = iconElement ? generateIconString(iconElement) : undefined;

  const Icon = useIconLoaderWithTheme(iconString);
  return <KdpaIconButton {...props}>{Icon && <Icon />}</KdpaIconButton>;
}

export default IconButton;
