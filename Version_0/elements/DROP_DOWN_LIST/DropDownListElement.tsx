import { contentToKeyword } from "@/core/hooks/useElementPropertyTranslate";
import { useEditorStore } from "@/core/store/editorStore";
import { KdpaAutoComplete, KdpaInput } from "kdpa-components";

function DropDownList({ style, ...props }: any) {
  const translates = useEditorStore((store) => store.translates);
  const multiLanguage = useEditorStore((store) => store.appInfo?.multiLanguage);

  const listValueConstant = useEditorStore(
    (store) => store.nodes[props.id]?.meta?.listValueConstant
  );

  let options = [];
  if (
    listValueConstant &&
    typeof listValueConstant === "string" &&
    listValueConstant !== "null"
  ) {
    const constantValue = JSON.parse(listValueConstant);

    if (Array.isArray(constantValue)) {
      options = constantValue;
    }
  }

  return (
    <KdpaAutoComplete
      key={props?.multiple}
      {...props}
      options={(typeof options === "string"
        ? JSON.parse(options)
        : options
      ).map((option: { id: string; label: string }) => {
        if (multiLanguage === "MULTI")
          return {
            ...option,
            label:
              translates[contentToKeyword(option.label).keyword] === undefined
                ? option.label
                : translates[contentToKeyword(option.label).keyword],
          };
        else return option;
      })}
      PopperComponent={(props: any) => {
        if (props.open)
          return (
            <div
              {...props}
              style={{ ...props.style, position: "absolute", width: "100%" }}
            >
              {props.children}
            </div>
          );
      }}
      renderInput={(params: any) => (
        <KdpaInput
          {...params}
          size="small"
          required={props?.rules?.required?.value}
          placeholder={props?.placeholder}
          variant={props?.variant}
          label={props?.label}
          helperText={props?.helperText}
          InputProps={{
            ...params?.InputProps,
            sx: style,
          }}
        />
      )}
    />
  );
}

export default DropDownList;
