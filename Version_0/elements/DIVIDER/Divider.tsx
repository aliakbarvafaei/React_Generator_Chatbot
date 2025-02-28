import { KdpaDivider } from "kdpa-components";

function Divider(props: any) {
  return <KdpaDivider {...props} style={{ ...props.style, padding: "6px" }} />;
}

export default Divider;
