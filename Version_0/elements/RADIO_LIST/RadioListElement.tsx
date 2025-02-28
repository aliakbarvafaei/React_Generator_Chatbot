import { contentToKeyword } from "@/core/hooks/useElementPropertyTranslate";
import { useTranslation } from "react-i18next";
import {
  KdpaFormControlLabel,
  KdpaRadio,
  KdpaRadioGroup,
} from "kdpa-components";

import { useEditorStore } from "@/core/store/editorStore";

function ConstantRadioLost({ id, ...props }: { id: string; [x: string]: any }) {
  const translates = useEditorStore((store) => store.translates);
  const multiLanguage = useEditorStore((store) => store.appInfo.multiLanguage);

  const listValueConstant = useEditorStore(
    (store) => store.nodes[id].meta.listValueConstant
  );

  const radioItems =
    listValueConstant &&
    typeof listValueConstant === "string" &&
    listValueConstant !== "null"
      ? JSON.parse(listValueConstant)
      : [];

  return (
    <>
      {radioItems.map((item: { id: string; label: string }) => (
        <KdpaFormControlLabel
          label={
            multiLanguage === "MULTI" &&
            translates[contentToKeyword(item.label).keyword] !== undefined
              ? translates[contentToKeyword(item.label).keyword]
              : item.label
          }
          value={item.id}
          required={props?.rules?.required?.value}
          control={<KdpaRadio />}
        />
      ))}
    </>
  );
}

function RadioList(props: any) {
  const { t } = useTranslation();

  const listValueModel = useEditorStore(
    (store) => store.nodes[props.id].meta.listValueModel
  );

  return (
    <KdpaRadioGroup
      {...props}
      sx={{
        ...props?.style,
        ...(props.fontSize && {
          "& .MuiFormControlLabel-label": {
            fontSize: props.fontSize,
          },
        }),
      }}
    >
      <label>{props.label}</label>

      {!listValueModel ? (
        <KdpaFormControlLabel
          // label={"بدون آیتم"}
          label={t("common.no_item")}
          // value={"بدون آیتم"}
          value={t("common.no_item")}
          control={<KdpaRadio />}
        />
      ) : (
        <>
          {listValueModel === "CONSTANT" ||
          listValueModel === "CONSTANT_ENUM" ? (
            <ConstantRadioLost id={props?.id} />
          ) : (
            <KdpaFormControlLabel
              label={t("common.DATA_SOURCE")}
              control={<KdpaRadio />}
              required={props?.rules?.required?.value}
            />
          )}
        </>
      )}
    </KdpaRadioGroup>
  );
}

export default RadioList;
