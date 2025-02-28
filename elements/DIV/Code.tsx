import React from "react";
import Grid, { GridProps } from "@mui/material/Grid";
export type KdpaGridProps = GridProps;

function KdpaGrid({ children, ...props }: KdpaGridProps) {
  return <Grid {...props}>{children}</Grid>;
}

export default KdpaGrid;
