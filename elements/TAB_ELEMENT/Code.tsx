import * as Tabs from "@radix-ui/react-tabs";
import { TabsListProps } from "@radix-ui/react-tabs";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./KdTabsList.scss";

import { styled } from "@mui/system";

const StyledTabList = styled(Tabs.List)();

export interface KdTabsListProps extends TabsListProps {
  children?: React.ReactNode;
}

function KdTabsList({ children, ...props }: KdTabsListProps) {
  return (
    <PerfectScrollbar>
      <StyledTabList className="KdTabsList" {...props}>
        {children}
      </StyledTabList>
    </PerfectScrollbar>
  );
}

export default KdTabsList;

import * as Tabs from "@radix-ui/react-tabs";
import { TabsContentProps } from "@radix-ui/react-tabs";
import "./KdTabsContent.scss";

import { styled } from "@mui/system";

const StyledTabContent = styled(Tabs.Content)();

export interface KdTabsContentProps extends TabsContentProps {
  children?: React.ReactNode;
}
function KdTabsContent({ children, ...props }: KdTabsContentProps) {
  return (
    <StyledTabContent className="KdTabsContent" {...props}>
      {children}
    </StyledTabContent>
  );
}

export default KdTabsContent;

import * as Tabs from "@radix-ui/react-tabs";
import { TabsTriggerProps } from "@radix-ui/react-tabs";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";

export interface KdTabsTriggerProps extends TabsTriggerProps {
  children?: React.ReactNode;
}

const StyledTabsTrigger = styled(Tabs.Trigger)<{ activeColor: string }>`
  font-family: inherit;
  background-color: inherit;
  width: 50px;
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 15px;
  line-height: 1;
  border: none;
  user-select: none;

  &[data-state="active"] {
    color: ${(props: any) => props?.activeColor ?? "#7367aa"};
    border-bottom: 3px solid ${(props: any) => props?.activeColor ?? "#7367aa"};
  }
`;

function KdTabsTrigger({ children, ...props }: KdTabsTriggerProps) {
  const theme = useTheme();
  const activeColor = theme?.palette?.primary?.main;

  return (
    <StyledTabsTrigger
      className="KdTabsTrigger"
      activeColor={activeColor}
      {...props}
    >
      {children}
    </StyledTabsTrigger>
  );
}

export default KdTabsTrigger;
