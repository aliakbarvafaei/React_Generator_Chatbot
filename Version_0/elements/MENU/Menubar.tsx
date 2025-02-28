import { contentToKeyword } from "@/core/hooks/useElementPropertyTranslate";
import { useEditorStore } from "@/core/store/editorStore";
import { KdMenubar } from "kdpa-components";
import { useTranslation } from "react-i18next";

function Menubar(props: any) {
  const { t } = useTranslation();
  const multiLanguage = useEditorStore((store) => store.appInfo.multiLanguage);
  const translates = useEditorStore((store) => store.translates);
  const listValueDisplayName = useEditorStore(
    (store) => store.nodes[props.id].meta.listValueDisplayName
  );

  const listValueConstant = useEditorStore(
    (store) => store.nodes[props.id].meta.listValueConstant
  );
  let data = [];
  if (
    listValueConstant &&
    typeof listValueConstant === "string" &&
    listValueConstant !== "null"
  )
    data = (JSON.parse(listValueConstant) ?? [])?.map((element: any) => {
      return {
        ...element,
        label:
          multiLanguage === "MULTI" &&
          translates[contentToKeyword(element.label).keyword] !== undefined
            ? translates[contentToKeyword(element.label).keyword]
            : element.label,
      };
    });

  return (
    <KdMenubar
      {...props}
      data={data}
      noDataText={
        data.length > 0
          ? t("common.not_correct_data_format")
          : listValueDisplayName
          ? t("common.DATA_SOURCE")
          : t("common.set_data_source_tree")
      }
    />
  );
}

export default Menubar;
