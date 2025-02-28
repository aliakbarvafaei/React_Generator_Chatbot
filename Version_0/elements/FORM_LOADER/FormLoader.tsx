import Droppable from "@/core/components/DnD/Droppable";
import { useEditorStore } from "@/core/store/editorStore";

function FormLoader(props: any) {
  const isPreview = useEditorStore((state) => state.isPreview);

  return (
    <div className={isPreview ? "" : "border"} {...props}>
      <Droppable id={props.id} />
    </div>
  );
}

export default FormLoader;
