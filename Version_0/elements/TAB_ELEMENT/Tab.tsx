import Droppable from "@/core/components/DnD/Droppable";
import ElementWrapper from "@/core/components/Element/ElementWrapper";
import { useEditorStore } from "@/core/store/editorStore";
import { propertyExtractor } from "@/core/utils/kdlValueExtractor";
import { KdpaGrid } from "kdpa-components";
import { KdTabsContent } from "kdpa-components";

function Tab(props: any) {
  const isPreview = useEditorStore((state) => state.isPreview);

  const elementNode = useEditorStore((state) => {
    return state.nodes[props.id];
  });
  const attrs = propertyExtractor(elementNode?.node?.attrs);

  return (
    <KdTabsContent value={props.id} {...props}>
      <ElementWrapper
        component={KdpaGrid}
        id={props.id}
        item
        {...attrs}
        className={
          isPreview
            ? ""
            : "border-[1px] border-dashed border-text_light border-opacity-30"
        }
      >
        <Droppable id={props.id} />
      </ElementWrapper>
    </KdTabsContent>
  );
}

export default Tab;
