import { useEditorStore } from "@/core/store/editorStore";
import { KdTypography } from "kdpa-components";
import { contentToKeyword } from "@/core/hooks/useElementPropertyTranslate";
import { useTranslation } from "react-i18next";

function Typography({ style, ...props }: any) {
  const { t } = useTranslation();

  const setValueDisplayName = useEditorStore(
    (store) => store.nodes[props.id]?.meta?.setValueDisplayName
  );
  const setValueText = useEditorStore(
    (store) => store.nodes[props.id]?.meta?.setValueText
  );
  const multiLanguage = useEditorStore((store) => store.appInfo.multiLanguage);
  const translates = useEditorStore((store) => store.translates);

  const children =
    setValueText && setValueText !== "null"
      ? multiLanguage === "MULTI" &&
        translates[contentToKeyword(setValueText).keyword] !== undefined
        ? translates[contentToKeyword(setValueText).keyword]
        : setValueText
      : setValueDisplayName
      ? //  "مبنع داده"
        t("common.DATA_SOURCE")
      : props.children ?? //  "بدون منبع داده"
        t("common.WITHOUT_DATA_SOURCE");

  return (
    <KdTypography
      {...props}
      sx={{
        ...style,
        whiteSpace: props.type === "html" ? "normal" : "pre-line",
      }}
    >
      {children}
    </KdTypography>
  );
}

export default Typography;
