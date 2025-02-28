import { KdChart2D } from "kdpa-components";
import { useTranslation } from "react-i18next";

import { useEditorStore } from "@/core/store/editorStore";

function ChartPieElement(props: any) {
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
    <KdChart2D
      //This key will be deleted
      key={props?.type}
      {...props}
      noDataText={
        listValueDisplayName
          ? //  "مبنع داده"
            t("common.DATA_SOURCE")
          : //  "بدون منبع داده"
            t("common.WITHOUT_DATA_SOURCE")
      }
      data={data}
      groupBy="group"
      valueBy="value"
    />
  );
}

export default ChartPieElement;
