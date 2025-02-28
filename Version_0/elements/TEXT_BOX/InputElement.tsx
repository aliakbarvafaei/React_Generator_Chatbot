import { KdpaInput } from "kdpa-components";

import { useEditorStore } from "@/core/store/editorStore";
import ElementWrapper from "@/core/components/Element/ElementWrapper";
import {
  stylesExtractor,
  propertyExtractor,
} from "@/core/utils/kdlValueExtractor";

import { EditorElements } from "..";

function Input({ style, ...props }: any) {
  const nodes = useEditorStore((store) => store.nodes);
  const getNodeById = useEditorStore((store) => store.getNodeById);
  const colNodeIds = getNodeById(props.id).node.children;

  const { startAdornment, endAdornment } = colNodeIds?.reduce<{
    startAdornment: string[];
    endAdornment: string[];
  }>(
    (acc, item) => {
      const attrs = propertyExtractor(getNodeById(item)?.node?.attrs);

      if (attrs.placement === "start") acc.startAdornment.push(item);
      else if (attrs.placement === "end") acc.endAdornment.push(item);

      return acc;
    },
    { startAdornment: [], endAdornment: [] }
  ) || { startAdornment: [], endAdornment: [] };

  return (
    <KdpaInput
      {...props}
      required={props?.rules?.required?.value}
      InputProps={{
        sx: style,
        startAdornment: (
          <>
            {startAdornment.map((cellNode) => {
              const Component =
                EditorElements[nodes[cellNode].nodeType]?.component;
              const celStyles = stylesExtractor(nodes[cellNode]?.node?.style);
              const celAttrs = propertyExtractor(nodes[cellNode]?.node?.attrs);
              if (Component)
                return (
                  <ElementWrapper id={cellNode}>
                    <Component
                      id={cellNode}
                      node={getNodeById(cellNode)?.node}
                      style={celStyles}
                      {...celAttrs}
                    />
                  </ElementWrapper>
                );
            })}
          </>
        ),
        endAdornment: (
          <>
            {endAdornment.map((cellNode) => {
              const Component =
                EditorElements[nodes[cellNode].nodeType]?.component;
              const celStyles = stylesExtractor(nodes[cellNode]?.node?.style);
              const celAttrs = propertyExtractor(nodes[cellNode]?.node?.attrs);
              if (Component)
                return (
                  <ElementWrapper id={cellNode}>
                    <Component
                      id={cellNode}
                      node={getNodeById(cellNode)?.node}
                      style={celStyles}
                      {...celAttrs}
                    />
                  </ElementWrapper>
                );
            })}
          </>
        ),
      }}
    />
  );
}

export default Input;
