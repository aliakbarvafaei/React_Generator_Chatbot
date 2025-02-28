import Droppable from "@/core/components/DnD/Droppable";
import { useEditorStore } from "@/core/store/editorStore";

function Link(props: any) {
  const isPreview = useEditorStore((state) => state.isPreview);

  return (
    <div className={isPreview ? "" : "border"} {...props}>
      <Droppable id={props.id} className="p-2" />
    </div>
  );
}

export default Link;
