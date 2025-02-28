import { useEditorStore } from "@/core/store/editorStore";
import { KdpaAutoComplete } from "kdpa-components";

function TagBoxInput(props: any) {
  const listValueConstant = useEditorStore(
    (store) => store.nodes[props.id].meta.listValueConstant
  );

  let options = [];
  if (
    listValueConstant &&
    typeof listValueConstant === "string" &&
    listValueConstant !== "null"
  )
    options = JSON.parse(listValueConstant);

  return (
    <KdpaAutoComplete
      key={props?.multiple}
      {...props}
      multiple
      freeSolo
      required={props?.rules?.required?.value}
      options={(typeof options === "string"
        ? JSON.parse(options)
        : options
      )?.map((el: any) => el.label)}
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
    />
  );
}

export default TagBoxInput;
