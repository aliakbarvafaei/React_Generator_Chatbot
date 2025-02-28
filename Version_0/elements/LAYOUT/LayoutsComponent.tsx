import { KdpaGrid } from "kdpa-components";
import LayoutsRowComponent from "../LAYOUT_ROW/LayoutsRowComponent";
import { useEditorStore } from "@/core/store/editorStore";

function LayoutsComponent(props: any) {
  const children = useEditorStore(
    (state) => state.nodes[props.id]?.node?.children
  );
  const nodes = useEditorStore((state) => state.nodes);

  const isPreview = useEditorStore((state) => state.isPreview);
  const spacingSize = useEditorStore((state) => state.spacingSize);

  return (
    <KdpaGrid
      {...props}
      style={{ ...props.style, padding: spacingSize ?? props?.style?.padding }}
      id="layout-container"
      className={
        isPreview
          ? ""
          : "border-[1px] border-dashed border-text_light border-opacity-30"
      }
    >
      {children
        ?.filter((item) => nodes[item]?.visible)
        .map((item, index) => (
          <LayoutsRowComponent key={item} id={item} index={index} />
        ))}
    </KdpaGrid>
  );
}

export default LayoutsComponent;
