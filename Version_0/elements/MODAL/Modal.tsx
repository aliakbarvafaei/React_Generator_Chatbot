import { KdpaIconButton } from "kdpa-components";
import Droppable from "@/core/components/DnD/Droppable";
import { BsX } from "react-icons/bs";

function Modal({ id, title, maxWidth, fullScreen, hasHeader }: any) {
  const availableMaxWidth = {
    xs: "400px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
  };

  return (
    <div className="flex justify-center bg-gray-200 dark:bg-darkLight">
      <div
        className="shadow-lg rounded-lg w-full bg-white dark:bg-darkBg"
        style={{
          maxWidth:
            availableMaxWidth[maxWidth as keyof typeof availableMaxWidth] &&
            !fullScreen
              ? availableMaxWidth[maxWidth as keyof typeof availableMaxWidth]
              : "unset",
          margin: fullScreen ? "unset" : "24px",
        }}
      >
        {hasHeader !== false && (
          <header className="flex items-center justify-between p-2 pr-4">
            <span className="text-base font-bold">{title}</span>

            <KdpaIconButton>
              <BsX />
            </KdpaIconButton>
          </header>
        )}

        <div className="px-6 py-5">
          <Droppable id={id} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
