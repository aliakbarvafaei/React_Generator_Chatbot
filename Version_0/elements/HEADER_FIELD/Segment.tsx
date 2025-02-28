import Droppable from "@/core/components/DnD/Droppable";
import { useEditorStore } from "@/core/store/editorStore";
import {
  propertyExtractor,
  stylesExtractor,
} from "@/core/utils/kdlValueExtractor";
import { KdpaSegment } from "kdpa-components";

function Segment(props: any) {
  const elementNode = useEditorStore((state) => {
    return state.nodes[props.id];
  });
  const styles = stylesExtractor(elementNode?.node?.style);
  const attrs = propertyExtractor(elementNode?.node?.attrs);
  return (
    <KdpaSegment {...attrs} sx={styles} label={attrs.label ?? ""}>
      <Droppable id={props.id} style={styles} />
    </KdpaSegment>
  );
}

export default Segment;
