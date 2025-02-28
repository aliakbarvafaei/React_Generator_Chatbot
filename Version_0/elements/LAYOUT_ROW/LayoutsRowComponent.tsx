import { KdpaGrid } from "kdpa-components";
import { useEditorStore } from "@/core/store/editorStore";
import LayoutsCellComponent from "../LayoutsCellComponent/LayoutsCellComponent";
import {
  propertyExtractor,
  stylesExtractor,
} from "@/core/utils/kdlValueExtractor";
import ElementWrapper from "@/core/components/Element/ElementWrapper";
import { useFrameStore } from "@/core/store/frameStore";

function LayoutsRowComponent({ id, index }: { id: string; index?: number }) {
  const isPreview = useEditorStore((state) => state.isPreview);
  const spacingSize = useEditorStore((state) => state.spacingSize);

  const nodes = useEditorStore((state) => state.nodes);

  const children = useEditorStore((state) => state.nodes[id]?.node?.children);

  const elementNode = useEditorStore((state) => {
    return state.nodes[id];
  });
  const frameBreakpoint = useFrameStore((state) => state.frameBreakpoint);
  const styles = stylesExtractor(elementNode?.node?.style, frameBreakpoint);
  const attrs = propertyExtractor(elementNode?.node?.attrs);

  return (
    <ElementWrapper
      component={KdpaGrid}
      id={id}
      testId={`layout-row-${index}`}
      container
      {...attrs}
      sx={{ ...styles, padding: spacingSize ?? styles?.padding }}
      className={
        isPreview
          ? ""
          : `border-[1px] border-dashed border-text_light border-opacity-30 min-h-[30px]`
      }
    >
      {children
        ?.filter((item) => nodes[item]?.visible)
        .map((item, index) => (
          <LayoutsCellComponent key={item} id={item} index={index} />
        ))}
    </ElementWrapper>
  );
}

export default LayoutsRowComponent;
