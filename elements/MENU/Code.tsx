import React, { ComponentType } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { MenubarProps } from "@radix-ui/react-menubar";
import { FaChevronLeft, FaChevronDown } from "react-icons/fa";
import "./KdMenubar.scss";
import { BuildMenubarType, useMenubarHelper } from "./useMenubarHelper";

export interface KdMenubarProps extends MenubarProps {
  data: unknown[];
  onClick?: (...$args: any[]) => void;
  orientation?: "vertical" | "horizontal";
  getOptionLabel?: ((data: any) => string) | undefined;
  getOptionValue?: ((data: any) => string) | undefined;
  getOptionParent?: ((data: any) => string) | undefined;
  getOptionNavlink?: ((data: any) => string) | undefined;
  getOptionExternalLink?: ((data: any) => boolean) | undefined;
  LinkComponent?: ComponentType<any>; // Add LinkComponent prop
  noDataText?: string;
}

const KdMenubar = ({
  data,
  onClick,
  orientation = "horizontal",
  getOptionValue,
  getOptionLabel,
  getOptionParent,
  getOptionNavlink,
  getOptionExternalLink,
  noDataText = "no data",
  LinkComponent,
  ...props
}: KdMenubarProps) => {
  const { buildMenubar, renderMenubarToSpecificFieldName } = useMenubarHelper();
  const MenuData = buildMenubar(
    renderMenubarToSpecificFieldName({
      data,
      getOptionLabel,
      getOptionValue,
      getOptionParent,
      getOptionNavlink,
      getOptionExternalLink,
    })
  );

  const MenubarMenu = ({ data }: { data: BuildMenubarType }) => {
    return (
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">
          {data.label}
          <div className="LeftMainSlot">
            <FaChevronDown size={10} />
          </div>
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="MenubarContent"
            align={"start"}
            side={orientation === "horizontal" ? "bottom" : "right"}
            sideOffset={5}
          >
            {(data.children ?? []).map((child: BuildMenubarType) => {
              if (child.children && child.children.length > 0)
                return <MenubarSub data={child} />;
              else return <MenubarItem data={child} />;
            })}
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    );
  };

  const MenubarItem = ({ data }: { data: BuildMenubarType }) => {
    // comming soon add Link tag from react router dom
    const TagName =
      onClick || !data.navlink
        ? "span"
        : data.externalLink
        ? "a"
        : LinkComponent || "a";
    const TagProp = onClick
      ? {
          onClick: () => {
            onClick(data);
          },
        }
      : data.externalLink || !LinkComponent
      ? { href: data.navlink }
      : { to: data.navlink }; // use "to" prop for LinkComponent

    return (
      <TagName className="MenubarItem MenubarTriggerText" {...TagProp}>
        {data.label}
      </TagName>
    );
  };

  const MenubarSub = ({ data }: { data: BuildMenubarType }) => {
    return (
      <Menubar.Sub>
        <Menubar.SubTrigger className="MenubarSubTrigger">
          <span className="MenubarTriggerText">{data.label}</span>
          <div className="LeftSlot">
            <FaChevronLeft size={10} />
          </div>
        </Menubar.SubTrigger>
        <Menubar.Portal>
          <Menubar.SubContent
            className="MenubarSubContent"
            alignOffset={-5}
            sideOffset={10}
          >
            {(data.children ?? []).map((child: any) => {
              if (child.children && child.children.length > 0)
                return <MenubarSub data={child} />;
              else return <MenubarItem data={child} />;
            })}
          </Menubar.SubContent>
        </Menubar.Portal>
      </Menubar.Sub>
    );
  };

  return (
    <>
      {MenuData.length > 0 ? (
        <Menubar.Root
          {...props}
          className="MenubarRoot"
          dir="rtl"
          style={{
            flexDirection: orientation === "horizontal" ? "unset" : "column",
            ...props.style,
          }}
        >
          {MenuData.map((child) => (
            <MenubarMenu data={child} {...props} />
          ))}
        </Menubar.Root>
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>{noDataText}</div>
      )}
    </>
  );
};

export default KdMenubar;
