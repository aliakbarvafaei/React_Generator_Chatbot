import Droppable from "@/core/components/DnD/Droppable";
import { useEditorStore } from "@/core/store/editorStore";
import { KdpaGrid } from "kdpa-components";

function Div(props: any) {
  const isPreview = useEditorStore((state) => state.isPreview);
  const spacingSize = useEditorStore((state) => state.spacingSize);

  return (
    <KdpaGrid
      // {...props}
      // sx={props.style}
      className={
        isPreview
          ? ""
          : "border-[1px] border-dashed border-text_light border-opacity-30 "
      }
    >
      <Droppable
        key={props.id}
        id={props.id}
        style={{
          ...props.style,
          padding: spacingSize ?? props.style?.padding,
        }}
      />
    </KdpaGrid>
  );
}

export default Div;
