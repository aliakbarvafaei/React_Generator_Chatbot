import { useMemo } from "react";
import { useTheme } from "@mui/material";

import * as Components from "./components";
import { KdStyledComponent } from "../StyledComponent";

export type KdLoadingProps = {
  type?: keyof typeof Components;
  color?: string;
  [key: string]: any;
};

function KdLoading({ type = "ClipLoader", color, ...props }: KdLoadingProps) {
  const theme = useTheme();
  const Component = useMemo(() => Components[type], [type]);

  const colorProp = color || props?.sx?.color || theme.palette.primary.main;

  // Resolve the color from the theme
  const resolvedColor = colorProp?.includes(".")
    ? colorProp
        .split(".")
        .reduce((acc: any, key: any) => acc?.[key], theme.palette)
    : colorProp;

  return (
    <KdStyledComponent
      Component={Component}
      {...props}
      //@ts-ignore
      color={resolvedColor}
    />
  );
}

export default KdLoading;
