import { Divider, DividerProps } from "@mui/material";

export type KdpaDividerProps = DividerProps;

export interface KdpaDividerCustomProps {
  gridActionsStyle?: boolean;
}

function KdpaDivider({
  gridActionsStyle = false,
  ...props
}: KdpaDividerProps & KdpaDividerCustomProps) {
  if (gridActionsStyle)
    return (
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          height: "25px",
          alignSelf: "center",
        }}
        {...props}
      />
    );
  else return <Divider {...props} />;
}

export default KdpaDivider;
