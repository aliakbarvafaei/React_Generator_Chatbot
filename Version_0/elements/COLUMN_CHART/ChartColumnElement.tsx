import { KdChart3D } from "kdpa-components";
import { useTranslation } from "react-i18next";

import { useEditorStore } from "@/core/store/editorStore";

function ChartColumnElement(props: any) {
  const { t } = useTranslation();

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
    data = JSON.parse(listValueConstant);

  return (
    <KdChart3D
      //This key will be deleted
      key={
        props?.type + props?.tickPlacement + props?.stacked + props?.stackType
      }
      {...props}
      noDataText={
        listValueDisplayName
          ? // "مبنع داده"
            t("common.DATA_SOURCE")
          : // "بدون منبع داده"
            t("common.WITHOUT_DATA_SOURCE")
      }
      data={data}
      groupBy="group"
      seriesBy="series"
      valueBy="value"
    />
  );
}

export default ChartColumnElement;
