import { NodeElement } from "@/core/types/Element";
import { Input } from "./TEXT_BOX";
import { CheckBox } from "./CHECK_BOX";
import { RadioList } from "./RADIO_LIST";
import { Button } from "./BUTTON";
import { FileBrowser } from "./FILE_BROWSER";
import { DropDownList } from "./DROP_DOWN_LIST";
import { LayoutsComponent } from "./LAYOUT";
import { LayoutsCellComponent } from "./LAYOUT_CELL";
import { DatePicker } from "./DATE_PANEL";
import { Switch } from "./SWITCH";
import { Label } from "./LABEL";
import { Alert } from "./ALERT";
import { Grid } from "./DATA_GRID";
import { IconButton } from "./ICON_BUTTON";
import { ImageBox } from "./IMAGE_BOX";
import { Link } from "./HYPER_LINK";
import { FormLoader } from "./FORM_LOADER";
import { LayoutsRowComponent } from "./LAYOUT_ROW";
import { ComponentPlaceholder } from "./ComponentPlaceholder";
import { Typography } from "./TYPOGRAPHY";
import { GridPanelAdd } from "./GRID_ADD_PANEL";
import { GridPanelEdit } from "./GRID_EDIT_PANEL";
import { GridPanelSearch } from "./GRID_SEARCH_PANEL";
import { GridPanelView } from "./GRID_VIEW_PANEL";
import { GridPanelCustom } from "./GRID_CUSTOM_PANEL";
import { GridContainer } from "./GRID_CONTAINER";
import { GridHeader } from "./GRID_CONTAINER_HEADER";
import { TbBoxMultiple, TbCheckbox } from "react-icons/tb";
import {
  AiOutlineBorder,
  AiOutlineCloudUpload,
  AiOutlineSync,
} from "react-icons/ai";
import {
  BsCalendarDate,
  BsInputCursorText,
  BsLink45Deg,
  BsTable,
  BsWindowFullscreen,
} from "react-icons/bs";
import { CgRadioChecked } from "react-icons/cg";
import {
  RxButton,
  RxComponent1,
  RxDividerHorizontal,
  RxDropdownMenu,
  RxSwitch,
} from "react-icons/rx";
import { ImAttachment, ImTree, ImSpinner2 } from "react-icons/im";
import { BiImage, BiLabel, BiShow } from "react-icons/bi";
import {
  MdCheckBoxOutlineBlank,
  MdLanguage,
  MdLastPage,
  MdOutlinePreview,
  MdOutlineSportsSoccer,
  MdSearch,
} from "react-icons/md";
import { FiAlertOctagon, FiEdit, FiSearch } from "react-icons/fi";
import { LuTag } from "react-icons/lu";
import { FaCode, FaHashtag, FaIcons, FaWpforms } from "react-icons/fa";
import { TfiLayoutColumn2Alt, TfiLayoutTabWindow } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { ChartPie } from "./PIE_CHART";
import { PiChartDonutLight } from "react-icons/pi";
import { IoStatsChartOutline, IoTimeOutline } from "react-icons/io5";
import { FaRegWindowRestore } from "react-icons/fa6";

import { ChartColumn } from "./COLUMN_CHART";
import { FileBrowserAdvance } from "./MULTI_FILE_BROWSER";
import { HtmlEditor } from "./HTML_EDITOR";
import { StepperContainer } from "./STEPER_CONTAINER";
import { Stepper } from "./STEPER_ELEMENT";
import { TabContainer } from "./TAB_CONTAINER";
import { Tab } from "./TAB_ELEMENT";
import { RiFlowChart, RiMenuFoldLine } from "react-icons/ri";
import { Segment } from "./HEADER_FIELD";
import { GridCol } from "./DATA_GRID_COLUMN";
import { TreeForm } from "./TEXT_TREE";
import { SearchableInput } from "./SearchableInput";
import { Tree } from "./TREE_VIEW";
import { CardElement } from "./CARD_ELEMENT";
import { Icon } from "./ICON";
import { Menubar } from "./MENU";
import { IconType } from "react-icons/lib/esm";
import { RadioListCustom } from "./RadioListCustom";
import { RadioListCustomItem } from "./RadioListCustomItem";
import { Outlet } from "./Outlet";
import { useEditorStore } from "../../core/store/editorStore";
import { TagBoxInput } from "./TAG_BOX_INPUT";
import { Modal } from "./MODAL";
import { LanguageChange } from "./LANGUAGE_PICKER";
import LinkOrganJson from "./HYPER_LINK/LinkOrganJson";
import { JsonComponentsType } from "../commons/SidebarElements/SystemComponent";
import { GridPanelAddEdit } from "./GRID_ADD_EDIT_PANEL";
import { Div } from "./DIV";
import { Divider } from "./DIVIDER";
import { Loading } from "./LOADING";
import FormLoaderOrganJson from "./FORM_LOADER/FormLoaderOrganJson";
import { DynamicComponentLoader } from "./DynamicComponentLoader";
import { DynamicCustomLoader } from "./DynamicCustomLoader";
import { Captcha } from "./CAPTCHA";
import { DynamicBpmnLoader } from "./DynamicBpmnLoader";
import { TimePicker } from "./TIME_PICKER";
import { Tooltip } from "./TOOLTIP";
import { GrTooltip } from "react-icons/gr";
import { FileViewer } from "./FILE_VIEWER";
import { Pagination } from "./PAGINATION";

type EditorElementsType = {
  [key: string]: NodeElement;
};

export const EditorElements: EditorElementsType = {
  CHECK_BOX: CheckBox,
  TEXT_BOX: Input,
  BUTTON: Button,
  RADIO_LIST: RadioList,
  RADIO_LIST_CUSTOM_CONTAINER: RadioListCustom,
  RADIO_LIST_CUSTOM_ELEMENT: RadioListCustomItem,
  FILE_BROWSER: FileBrowser,
  MULTI_FILE_BROWSER: FileBrowserAdvance,
  DATE_PANEL: DatePicker,
  TIME_PICKER: TimePicker,
  DROP_DOWN_LIST: DropDownList,
  HTML_EDITOR: HtmlEditor,
  LAYOUT: LayoutsComponent,
  LAYOUT_CELL: LayoutsCellComponent,
  LAYOUT_ROW: LayoutsRowComponent,
  SWITCH: Switch,
  LABEL: Label,
  ALERT: Alert,
  ICON_BUTTON: IconButton,
  HYPER_LINK: Link,
  IMAGE_BOX: ImageBox,
  FORM_LOADER: FormLoader,
  ICON: Icon,
  PLACE_HOLDER: ComponentPlaceholder,
  TYPOGRAPHY: Typography,
  GRID_CONTAINER: GridContainer,
  DATA_GRID_COLUMN: GridCol,
  DATA_GRID: Grid,
  GRID_CONTAINER_HEADER: GridHeader,
  GRID_ADD_PANEL: GridPanelAdd,
  GRID_EDIT_PANEL: GridPanelEdit,
  GRID_SEARCH_PANEL: GridPanelSearch,
  GRID_VIEW_PANEL: GridPanelView,
  GRID_CUSTOM_PANEL: GridPanelCustom,
  GRID_ADD_EDIT_PANEL: GridPanelAddEdit,

  GRID_EDIT_BUTTON: IconButton,
  GRID_DELETE_BUTTON: IconButton,
  GRID_VIEW_BUTTON: IconButton,
  GRID_ARCHIVE_BUTTON: IconButton,

  PIE_CHART: ChartPie,
  COLUMN_CHART: ChartColumn,
  STEPER_CONTAINER: StepperContainer,
  STEPER_ELEMENT: Stepper,
  TAB_CONTAINER: TabContainer,
  TAB_ELEMENT: Tab,
  HEADER_FIELD: Segment,
  TREE_VIEW: Tree,
  TEXT_TREE: TreeForm,
  CODE_TEXT_BOX: SearchableInput,
  CARD_ELEMENT: CardElement,
  MENU: Menubar,
  OUTLET: Outlet,
  TAG_BOX_INPUT: TagBoxInput,
  MODAL: Modal,
  LANGUAGE_PICKER: LanguageChange,

  DIV: Div,
  DIVIDER: Divider,
  LOADING: Loading,
  DYNAMIC_COMPONENT_LOADER: DynamicComponentLoader,
  CUSTOM_LOADER: DynamicCustomLoader,
  BPMN_LOADER: DynamicBpmnLoader,

  CAPTCHA: Captcha,
  TOOLTIP: Tooltip,
  FILE_VIEWER: FileViewer,
  PAGINATION: Pagination,
};

export enum ElementTypes {
  NONE = "NONE",
  CHECK_BOX = "CHECK_BOX",
  TEXT_BOX = "TEXT_BOX",
  BUTTON = "BUTTON",
  RADIO_LIST = "RADIO_LIST",
  RADIO_LIST_CUSTOM_CONTAINER = "RADIO_LIST_CUSTOM_CONTAINER",
  RADIO_LIST_CUSTOM_ELEMENT = "RADIO_LIST_CUSTOM_ELEMENT",
  FILE_BROWSER = "FILE_BROWSER",
  MULTI_FILE_BROWSER = "MULTI_FILE_BROWSER",
  DATE_PANEL = "DATE_PANEL",
  TIME_PICKER = "TIME_PICKER",
  DROP_DOWN_LIST = "DROP_DOWN_LIST",
  HTML_EDITOR = "HTML_EDITOR",
  LAYOUT = "LAYOUT",
  LAYOUT_CELL = "LAYOUT_CELL",
  LAYOUT_ROW = "LAYOUT_ROW",
  SWITCH = "SWITCH",
  LABEL = "LABEL",
  HYPER_LINK = "HYPER_LINK",
  ALERT = "ALERT",
  ICON_BUTTON = "ICON_BUTTON",
  IMAGE_BOX = "IMAGE_BOX",
  FORM_LOADER = "FORM_LOADER",
  ICON = "ICON",
  PLACE_HOLDER = "PLACE_HOLDER",
  TYPOGRAPHY = "TYPOGRAPHY",
  DATA_GRID_COLUMN = "DATA_GRID_COLUMN", //Grid col
  GRID_CONTAINER = "GRID_CONTAINER", // grid container
  DATA_GRID = "DATA_GRID", // data grid
  GRID_CONTAINER_HEADER = "GRID_CONTAINER_HEADER", // header grid
  GRID_ADD_PANEL = "GRID_ADD_PANEL", // grid panel add
  GRID_EDIT_PANEL = "GRID_EDIT_PANEL", // grid panel edit
  GRID_SEARCH_PANEL = "GRID_SEARCH_PANEL", // grid panel search
  GRID_VIEW_PANEL = "GRID_VIEW_PANEL", // grid panel view
  GRID_CUSTOM_PANEL = "GRID_CUSTOM_PANEL", //grid panel custom
  GRID_ADD_EDIT_PANEL = "GRID_ADD_EDIT_PANEL",
  GRID_EDIT_BUTTON = "GRID_EDIT_BUTTON",
  GRID_DELETE_BUTTON = "GRID_DELETE_BUTTON",
  GRID_VIEW_BUTTON = "GRID_VIEW_BUTTON",
  GRID_ARCHIVE_BUTTON = "GRID_ARCHIVE_BUTTON",

  PIE_CHART = "PIE_CHART",
  COLUMN_CHART = "COLUMN_CHART",
  STEPER_CONTAINER = "STEPER_CONTAINER",
  STEPER_ELEMENT = "STEPER_ELEMENT",
  TAB_CONTAINER = "TAB_CONTAINER",
  TAB_ELEMENT = "TAB_ELEMENT",
  HEADER_FIELD = "HEADER_FIELD",
  TREE_VIEW = "TREE_VIEW",
  TEXT_TREE = "TEXT_TREE",
  CODE_TEXT_BOX = "CODE_TEXT_BOX",
  CARD_ELEMENT = "CARD_ELEMENT",
  MENU = "MENU",
  OUTLET = "OUTLET",
  TAG_BOX_INPUT = "TAG_BOX_INPUT",
  MODAL = "MODAL",
  LANGUAGE_PICKER = "LANGUAGE_PICKER",

  DIV = "DIV",
  DIVIDER = "DIVIDER",
  LOADING = "LOADING",
  DYNAMIC_COMPONENT_LOADER = "DYNAMIC_COMPONENT_LOADER",
  CUSTOM_LOADER = "CUSTOM_LOADER",
  BPMN_LOADER = "BPMN_LOADER",
  CAPTCHA = "CAPTCHA",
  TOOLTIP = "TOOLTIP",
  FILE_VIEWER = "FILE_VIEWER",
  PAGINATION = "PAGINATION",
}

export enum CategoryType {
  LAYOUT = "LAYOUT",
  CONTAINER = "CONTAINER",
  // CONTAINER_FORM = "CONTAINER_FORM",
  FORM = "FORM",
  DRAMATICELEMENTS = "DRAMATICELEMENTS",
}
type ElementTypesPropertyType = {
  [key in ElementTypes]: {
    title: string;
    icon: IconType;
    category: CategoryType;
    draggable?: boolean;
    droppable?: boolean;
    leftSideBar?: boolean;
    organJson?: JsonComponentsType;
    hasDesignSystem?: boolean;
  };
};

const appModel = useEditorStore.getState().appInfo?.appModel;
const multiLanguage = useEditorStore.getState().appInfo?.multiLanguage;
const componentType = useEditorStore.getState().appInfo?.componentUsage;

export const ElementTypesProperty: ElementTypesPropertyType = {
  //@ts-ignore
  NONE: {
    title: "Root",
    icon: RxComponent1,
    droppable: true,
  },
  LAYOUT: {
    title: "Layout",
    icon: TfiLayoutColumn2Alt,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.LAYOUT,
  },
  LAYOUT_CELL: {
    title: "Layout Cell",
    icon: TfiLayoutColumn2Alt,
    category: CategoryType.LAYOUT,
    droppable: true,
  },
  LAYOUT_ROW: {
    title: "Layout Row",
    icon: TfiLayoutColumn2Alt,
    category: CategoryType.LAYOUT,
    draggable: true,
  },
  DIV: {
    title: "Div",
    icon: MdCheckBoxOutlineBlank,
    draggable: true,
    droppable: true,
    leftSideBar: true,
    category: CategoryType.LAYOUT,
    hasDesignSystem: true,
  },
  DIVIDER: {
    title: "Divider",
    icon: RxDividerHorizontal,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  FORM_LOADER: {
    title: "Form",
    icon: FaWpforms,
    draggable: true,
    droppable: true,
    leftSideBar: true,
    // category: CategoryType.CONTAINER_FORM,
    category: CategoryType.CONTAINER,
    organJson: FormLoaderOrganJson,
  },
  PLACE_HOLDER: {
    title: "Placeholder",
    icon: LuTag,
    draggable: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
  GRID_CONTAINER: {
    title: "Grid Container",
    icon: BsTable,
    draggable: true,
    leftSideBar: true,
    // category: CategoryType.CONTAINER_FORM,
    category: CategoryType.CONTAINER,
  },
  STEPER_CONTAINER: {
    title: "Stepper container",
    icon: RiFlowChart,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.CONTAINER,
  },
  TAB_CONTAINER: {
    title: "Tab Container",
    icon: TfiLayoutTabWindow,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.CONTAINER,
  },
  CARD_ELEMENT: {
    title: "Card Element",
    icon: TbBoxMultiple,
    draggable: true,
    droppable: true,
    leftSideBar: true,
    category: CategoryType.CONTAINER,
  },
  CHECK_BOX: {
    title: "Check Box",
    icon: TbCheckbox,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  TEXT_BOX: {
    title: "Text Input",
    icon: BsInputCursorText,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  RADIO_LIST: {
    title: "Radio List",
    icon: CgRadioChecked,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  RADIO_LIST_CUSTOM_CONTAINER: {
    title: "Custom Radio List",
    icon: CgRadioChecked,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
  },
  RADIO_LIST_CUSTOM_ELEMENT: {
    title: "Radio Custom item",
    icon: CgRadioChecked,
    draggable: false,
    droppable: true,
    leftSideBar: false,
    category: CategoryType.DRAMATICELEMENTS,
  },
  FILE_BROWSER: {
    title: "File Browser",
    icon: ImAttachment,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  MULTI_FILE_BROWSER: {
    title: "File Browser Advance",
    icon: AiOutlineCloudUpload,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  DATE_PANEL: {
    title: "Date Picker",
    icon: BsCalendarDate,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  TIME_PICKER: {
    title: "Time Picker",
    icon: IoTimeOutline,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  DROP_DOWN_LIST: {
    title: "DropDown",
    icon: RxDropdownMenu,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  HTML_EDITOR: {
    title: "Html Editor",
    icon: FaCode,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
  },
  SWITCH: {
    title: "Switch",
    icon: RxSwitch,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  TEXT_TREE: {
    title: "Tree form",
    icon: ImTree,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
  },
  CODE_TEXT_BOX: {
    title: "Searchable input",
    icon: MdSearch,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  TAG_BOX_INPUT: {
    title: "TagBox input",
    icon: FaHashtag,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.FORM,
    hasDesignSystem: true,
  },
  BUTTON: {
    title: "Button",
    icon: RxButton,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  LABEL: {
    title: "Label",
    icon: BiLabel,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  HYPER_LINK: {
    title: "Link",
    icon: BsLink45Deg,
    draggable: true,
    leftSideBar: true,
    droppable: true,
    category: CategoryType.DRAMATICELEMENTS,
    organJson: LinkOrganJson,
    hasDesignSystem: true,
  },
  TOOLTIP: {
    title: "Tooltip",
    icon: GrTooltip,
    draggable: true,
    leftSideBar: true,
    droppable: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  ALERT: {
    title: "Alert",
    icon: FiAlertOctagon,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  ICON_BUTTON: {
    title: "Icon Button",
    icon: MdOutlineSportsSoccer,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  ICON: {
    title: "Icon",
    icon: FaIcons,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  IMAGE_BOX: {
    title: "Image Box",
    icon: BiImage,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  FILE_VIEWER: {
    title: "File Viewer",
    icon: MdOutlinePreview,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  MODAL: {
    title: "Modal",
    icon: FaRegWindowRestore,
    draggable: true,
    droppable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
  TYPOGRAPHY: {
    title: "Typography",
    icon: LuTag,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  PIE_CHART: {
    title: "Pie Chart",
    icon: PiChartDonutLight,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
  COLUMN_CHART: {
    title: "Column Chart",
    icon: IoStatsChartOutline,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
  HEADER_FIELD: {
    title: "Segment",
    icon: AiOutlineBorder,
    draggable: true,
    droppable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
    hasDesignSystem: true,
  },
  TREE_VIEW: {
    title: "Tree",
    icon: ImTree,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
  DATA_GRID_COLUMN: {
    title: "Grid Col",
    icon: BsTable,
    category: CategoryType.DRAMATICELEMENTS,
    droppable: true,
  },
  DATA_GRID: {
    title: "Data Grid",
    icon: BsTable,
    category: CategoryType.DRAMATICELEMENTS,
  },
  GRID_CONTAINER_HEADER: {
    title: "Grid Header",
    icon: LuTag,
    category: CategoryType.DRAMATICELEMENTS,
  },
  GRID_ADD_PANEL: {
    title: "Panel Add",
    icon: AiOutlinePlus,
    droppable: true,
    category: CategoryType.CONTAINER,
  },
  GRID_EDIT_PANEL: {
    title: "Panel Edit",
    icon: FiEdit,
    droppable: true,
    category: CategoryType.CONTAINER,
  },
  GRID_SEARCH_PANEL: {
    title: "Panel Search",
    icon: FiSearch,
    droppable: true,
    category: CategoryType.CONTAINER,
  },
  GRID_VIEW_PANEL: {
    title: "Panel View",
    icon: BiShow,
    droppable: true,
    category: CategoryType.CONTAINER,
  },
  GRID_ADD_EDIT_PANEL: {
    title: "Panel Add/Edit",
    icon: AiOutlinePlus,
    category: CategoryType.CONTAINER,
  },
  GRID_CUSTOM_PANEL: {
    title: "Panel Custom",
    icon: AiOutlinePlus,
    droppable: true,
    category: CategoryType.CONTAINER,
  },
  GRID_EDIT_BUTTON: {
    title: "Panel Custom",
    icon: AiOutlinePlus,
    category: CategoryType.DRAMATICELEMENTS,
  },
  GRID_DELETE_BUTTON: {
    title: "Panel Custom",
    icon: AiOutlinePlus,
    category: CategoryType.DRAMATICELEMENTS,
  },
  GRID_VIEW_BUTTON: {
    title: "Panel Custom",
    icon: AiOutlinePlus,
    category: CategoryType.DRAMATICELEMENTS,
  },
  GRID_ARCHIVE_BUTTON: {
    title: "Panel Custom",
    icon: AiOutlinePlus,
    category: CategoryType.DRAMATICELEMENTS,
  },
  STEPER_ELEMENT: {
    title: "Stepper",
    icon: RiFlowChart,
    droppable: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
  TAB_ELEMENT: {
    title: "Tab",
    icon: TfiLayoutTabWindow,
    category: CategoryType.DRAMATICELEMENTS,
  },
  MENU: {
    title: "menubar",
    icon: RiMenuFoldLine,
    category: CategoryType.DRAMATICELEMENTS,
    draggable: true,
    leftSideBar: true,
  },
  LANGUAGE_PICKER: {
    title: "language change",
    icon: MdLanguage,
    category: CategoryType.DRAMATICELEMENTS,
    draggable: true,
    leftSideBar: appModel === "INDEPENDENT" && multiLanguage === "MULTI",
  },
  OUTLET: {
    title: "Outlet",
    icon: BsWindowFullscreen,
    draggable: true,
    leftSideBar: componentType === "LAYOUT" || componentType === "SUB_LAYOUT",
    category: CategoryType.CONTAINER,
  },
  LOADING: {
    title: "Loading",
    icon: ImSpinner2,
    category: CategoryType.DRAMATICELEMENTS,
    draggable: true,
    leftSideBar: true,
    hasDesignSystem: true,
  },
  DYNAMIC_COMPONENT_LOADER: {
    title: "component loader",
    icon: BsWindowFullscreen,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.CONTAINER,
  },
  CUSTOM_LOADER: {
    title: "custom loader",
    icon: BsWindowFullscreen,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.CONTAINER,
  },
  BPMN_LOADER: {
    title: "bpmn loader",
    icon: BsWindowFullscreen,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.CONTAINER,
  },
  CAPTCHA: {
    title: "captcha",
    icon: AiOutlineSync,
    draggable: true,
    leftSideBar: false,
    category: CategoryType.DRAMATICELEMENTS,
  },
  PAGINATION: {
    title: "Pagination",
    icon: MdLastPage,
    draggable: true,
    leftSideBar: true,
    category: CategoryType.DRAMATICELEMENTS,
  },
};
