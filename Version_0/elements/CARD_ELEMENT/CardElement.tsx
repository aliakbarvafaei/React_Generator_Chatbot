import Droppable from "@/core/components/DnD/Droppable";
import { useEditorStore } from "@/core/store/editorStore";

function CardElement(props: any) {
  const isPreview = useEditorStore((state) => state.isPreview);

  return (
    <div
      {...props}
      className={
        isPreview
          ? ""
          : "border-[1px] border-dashed border-text_light border-opacity-30"
      }
    >
      <Droppable id={props.id} /> 
    </div>
  );
}

export default CardElement;
