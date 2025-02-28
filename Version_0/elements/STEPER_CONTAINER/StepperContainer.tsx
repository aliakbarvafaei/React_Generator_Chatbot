import { useEditorStore } from "@/core/store/editorStore";
import Stepper from "../Stepper/Stepper";
import { generateIconString } from "@/utility/shared";
import { KDLElementNode } from "@/core/types/node";
import { useState } from "react";
import { KdStepRoot, KdStepList, KdStepTrigger } from "kdpa-components";
import { useTranslation } from "react-i18next";
import { propertyExtractor } from "@/core/utils/kdlValueExtractor";
import useIconLoaderWithTheme from "@/components/commons/IconPicker/Loader/useIconLoaderWithTheme";

function StepperContainer(props: any) {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(props.defaultValue || 0);
  const children = useEditorStore(
    (store) => store.nodes[props.id]?.node?.children
  );
  const nodes = useEditorStore((store) => store.nodes);
  const setActiveNode = useEditorStore((store) => store.setActiveNode);

  return (
    <>
      {children && children.length > 0 ? (
        <KdStepRoot
          currentStep={stepIndex}
          setCurrentStep={setStepIndex}
          {...props}
          clickSteps={true}
        >
          <KdStepList>
            {children?.map((child, index) => {
              const node = nodes[child];
              const attrs = propertyExtractor(node.node.attrs);

              const Icon = node.node.attrs.icon
                ? useIconLoaderWithTheme(
                    generateIconString(
                      node.node.attrs.icon as KDLElementNode | undefined
                    )
                  )
                : undefined;
              const CompletedIcon = node.node.attrs.completedIcon
                ? useIconLoaderWithTheme(
                    generateIconString(
                      node.node.attrs.completedIcon as
                        | KDLElementNode
                        | undefined
                    )
                  )
                : undefined;
              const ActiveIcon = node.node.attrs.activeIcon
                ? useIconLoaderWithTheme(
                    generateIconString(
                      node.node.attrs.activeIcon as KDLElementNode | undefined
                    )
                  )
                : undefined;
              return (
                <KdStepTrigger
                  index={index}
                  icon={Icon ? <Icon /> : undefined}
                  completedIcon={CompletedIcon ? <CompletedIcon /> : undefined}
                  activeIcon={ActiveIcon ? <ActiveIcon /> : undefined}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setActiveNode(child);
                  }}
                >
                  {attrs?.label}
                </KdStepTrigger>
              );
            })}
          </KdStepList>
          {children?.map((child, index) => {
            return (
              <Stepper
                orientation={props.orientation}
                currentStep={stepIndex}
                index={index}
                id={child}
              />
            );
          })}
        </KdStepRoot>
      ) : (
        <div className="text-center">{t("common.set_data_source_stepper")}</div>
      )}
    </>
  );
}

export default StepperContainer;
