import Droppable from "@/core/components/DnD/Droppable";
import ElementWrapper from "@/core/components/Element/ElementWrapper";
import { useEditorStore } from "@/core/store/editorStore";
import {
  propertyExtractor,
  stylesExtractor,
} from "@/core/utils/kdlValueExtractor";
import { KdpaGrid } from "kdpa-components";
import { KdStepContent } from "kdpa-components";

function Stepper(props: any) {
  const isPreview = useEditorStore((state) => state.isPreview);

  const elementNode = useEditorStore((state) => {
    return state.nodes[props.id];
  });
  const styles = stylesExtractor(elementNode?.node?.style);
  const attrs = propertyExtractor(elementNode?.node?.attrs);

  return (
    <KdStepContent {...props} {...attrs}>
      <ElementWrapper
        component={KdpaGrid}
        id={props.id}
        item
        className={
          isPreview
            ? ""
            : "border-[1px] border-dashed border-text_light border-opacity-30"
        }
      >
        <Droppable id={props.id} style={styles} />
      </ElementWrapper>
    </KdStepContent>
  );
}

export default Stepper;
