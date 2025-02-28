import useIconLoaderWithTheme from "@/components/commons/IconPicker/Loader/useIconLoaderWithTheme";
import { contentToKeyword } from "@/core/hooks/useElementPropertyTranslate";
import { useEditorStore } from "@/core/store/editorStore";
import { KDLElementNode } from "@/core/types/node";
import { generateIconString } from "@/utility/shared";
import { KdpaPrimaryButton } from "kdpa-components";

function Button(props: any) {
  const innerChildren =
    useEditorStore((store) => store.nodes[props.id]?.node?.innerChildren) || [];

  const iconElement = innerChildren?.find(
    (item) => item.type === "element"
  ) as KDLElementNode;

  const iconString = generateIconString(iconElement);

  const Icon = useIconLoaderWithTheme(iconString);
  const multiLanguage = useEditorStore((store) => store.appInfo.multiLanguage);
  const translates = useEditorStore((store) => store.translates);

  return (
    <KdpaPrimaryButton {...props} sx={props?.style}>
      {Icon && <Icon />}
      {innerChildren?.map((item) => {
        if (item.type === "static")
          return multiLanguage === "MULTI" &&
            translates[contentToKeyword(item.content as string).keyword] !==
              undefined
            ? translates[contentToKeyword(item.content as string).keyword]
            : item.content;
      })}
    </KdpaPrimaryButton>
  );
}

export default Button;
