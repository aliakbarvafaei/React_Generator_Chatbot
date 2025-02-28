import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import he from "he";
import Toolbar from "./components/toolbar/Toolbar";
import { editorExtentions } from "./extentions";
import { OnChangeHTML } from "@remirror/react";

import "remirror/styles/all.css";
import "./KdHtmlEditor.scss";
import FloatingToolbar from "./components/toolbar/FloatingToolbar";
import { htmlToProsemirrorNode } from "remirror";
import { CSSProperties } from "react";

export type ToolbarButton =
  | "BOLD"
  | "ITALIC"
  | "UNDERLINE"
  | "STRIKETHROUGH"
  | "BULLET_LIST"
  | "ORDERED_LIST"
  | "TASK_LIST"
  | "RIGHT_ALIGN"
  | "CENTER_ALIGN"
  | "LEFT_ALIGN";

export interface KdHtmlEditorProps {
  onChange?: (htmlValueString: string) => void;
  defaultValue?: string;
  style?: CSSProperties;
  toolbar?: ToolbarButton[];
  [key: string]: unknown;
}

const KdHtmlEditor = ({
  onChange,
  defaultValue,
  style,
  toolbar = [
    "BOLD",
    "ITALIC",
    "UNDERLINE",
    "STRIKETHROUGH",
    "BULLET_LIST",
    "ORDERED_LIST",
    "TASK_LIST",
    "RIGHT_ALIGN",
    "CENTER_ALIGN",
    "LEFT_ALIGN",
  ],
  ...props
}: KdHtmlEditorProps) => {
  const { manager, state } = useRemirror({
    extensions: editorExtentions,
    selection: "start",
  });

  const doc = htmlToProsemirrorNode({
    content: he.unescape(defaultValue ?? ""),
    schema: state.schema,
  });

  return (
    <div style={{ height: "300px", ...style }} {...props}>
      <div className={`remirror-theme kd-editor`}>
        <Remirror manager={manager} initialContent={doc}>
          <Toolbar toolbar={toolbar} />
          <EditorComponent />
          <FloatingToolbar />
          <OnChangeHTML
            onChange={(html: string) => {
              if (onChange) onChange(he.escape(html));
            }}
          />
        </Remirror>
      </div>
    </div>
  );
};

export default KdHtmlEditor;
