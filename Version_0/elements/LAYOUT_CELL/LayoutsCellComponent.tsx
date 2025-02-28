import { KdpaGrid } from "kdpa-components";
import Droppable from "@/core/components/DnD/Droppable";
import { useEditorStore } from "@/core/store/editorStore";
import {
  propertyExtractor,
  stylesExtractor,
} from "@/core/utils/kdlValueExtractor";
import ElementWrapper from "@/core/components/Element/ElementWrapper";
import { useFrameStore } from "@/core/store/frameStore";
import { BreakpointColors } from "@/core/utils/breakpoint";

const breakpoints = Object.keys(BreakpointColors);
function getLayoutBreakpoint(
  attrs: Record<string, string>,
  frameBreakpoint: string
) {
  if (attrs?.[frameBreakpoint]) {
    return attrs?.[frameBreakpoint];
  }

  const frameBreakpointIndex = breakpoints.findIndex(
    (br) => br === frameBreakpoint
  );

  if (frameBreakpointIndex && frameBreakpointIndex !== -1) {
    const prevBreakPoint = breakpoints[frameBreakpointIndex - 1];
    const prevBreakPointData = attrs?.[prevBreakPoint];

    if (prevBreakPointData) {
      return prevBreakPointData;
    } else {
      return getLayoutBreakpoint(attrs, prevBreakPoint);
    }
  } else return attrs?.["xs"];
}

function LayoutsCellComponent({ id, index }: { id: string; index?: number }) {
  const isPreview = useEditorStore((state) => state.isPreview);
  const spacingSize = useEditorStore((state) => state.spacingSize);
  const frameBreakpoint = useFrameStore((state) => state.frameBreakpoint);
  const elementNode = useEditorStore((state) => {
    return state.nodes[id];
  });

  const styles = stylesExtractor(elementNode?.node?.style, frameBreakpoint);
  const attrs = propertyExtractor(elementNode?.node?.attrs);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { xs, sm, md, lg, xl, ...props } = attrs;

  const breakpoint = getLayoutBreakpoint(attrs, frameBreakpoint);

  return (
    <ElementWrapper
      component={KdpaGrid}
      id={id}
      testId={`layout-cell-${index}`}
      item
      {...props}
      xs={breakpoint}
      className={
        isPreview
          ? ""
          : "border-[1px] border-dashed border-text_light border-opacity-30"
      }
    >
      <Droppable
        id={id}
        style={{ ...styles, padding: spacingSize ?? styles?.padding }}
      />
    </ElementWrapper>
  );
}

export default LayoutsCellComponent;
