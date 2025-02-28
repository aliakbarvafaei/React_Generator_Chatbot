import * as Tabs from "@radix-ui/react-tabs";
import { TabsProps } from "@radix-ui/react-tabs";

import "./KdTabsRoot.scss";

import { styled } from "@mui/system";

const StyledTabRoot = styled(Tabs.Root)();

export interface KdTabsRootProps extends TabsProps {
  children?: React.ReactNode;
}

function KdTabsRoot({ children, ...props }: KdTabsRootProps) {
  return (
    <StyledTabRoot dir="rtl" className="KdTabsRoot" {...props}>
      {children}
    </StyledTabRoot>
  );
}

export default KdTabsRoot;
