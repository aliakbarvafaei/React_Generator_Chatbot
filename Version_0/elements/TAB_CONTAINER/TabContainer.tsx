import { useEditorStore } from "@/core/store/editorStore";
import Tab from "../Tab/Tab";
import { generateIconString } from "@/utility/shared";
import { KDLElementNode } from "@/core/types/node";
import { KdTabsList, KdTabsRoot, KdTabsTrigger } from "kdpa-components";
import { useTranslation } from "react-i18next";
import {
  propertyExtractor,
  stylesExtractor,
} from "@/core/utils/kdlValueExtractor";
import useIconLoaderWithTheme from "@/components/commons/IconPicker/Loader/useIconLoaderWithTheme";

function TabContainer(props: any) {
  const { t } = useTranslation();
  const children = useEditorStore(
    (store) => store.nodes[props.id].node.children
  );
  const nodes = useEditorStore((store) => store.nodes);
  const setActiveNode = useEditorStore((store) => store.setActiveNode);

  return (
    <>
      {children && children.length > 0 ? (
        <KdTabsRoot
          {...props}
          defaultValue={props.defaultValue || (children ? children[0] : "")}
        >
          <KdTabsList>
            {children?.map((child) => {
              const node = nodes[child];
              const attrs = propertyExtractor(node.node.attrs);
              const style = stylesExtractor(node.node.style);

              const Icon = useIconLoaderWithTheme(
                generateIconString(
                  node.node.attrs.icon as KDLElementNode | undefined
                )
              );
              return (
                <KdTabsTrigger
                  value={child}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setActiveNode(child);
                  }}
                  //@ts-ignore
                  sx={style}
                >
                  {Icon && <Icon />}
                  <span>{attrs?.label}</span>
                </KdTabsTrigger>
              );
            })}
          </KdTabsList>
          {children?.map((child) => {
            return <Tab value={child} id={child} />;
          })}
        </KdTabsRoot>
      ) : (
        <div className="text-center">{t("common.set_data_source_tab")}</div>
      )}
    </>
  );
}

export default TabContainer;
