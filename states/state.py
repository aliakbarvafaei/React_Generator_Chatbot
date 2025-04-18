from typing import Annotated, Literal, Union, List, Any
from pydantic import BaseModel, Field
from langgraph.graph.message import add_messages


class StateDefinition(BaseModel):
    name: str = Field(..., title="State Name")
    defaultValue: Union[str, int, bool, dict, list, None] = Field(
        None, title="Default Value"
    )
    type: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY"] = Field(
        ..., title="Type of State"
    )


class PropDefinition(BaseModel):
    name: str = Field(..., title="Prop Name")
    type: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = Field(
        ..., title="Type of Prop"
    )


class FunctionDefinition(BaseModel):
    name: str = Field(..., title="Function Name")
    inputParams: List[str] = Field([], title="Input Parameters of Function")
    code: str = Field("", title="Function code")


class AttributeDefinition(BaseModel):
    name: str = Field(..., title="Attribute Name")
    type: Literal["STATIC", "DYNAMIC"] = Field(..., title="Type of Attribute")
    valueType: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = (
        Field(..., title="Type of Attribute")
    )
    content: Union[str, int, bool, dict, list, None] = Field(
        None, title="Value of Attribute"
    )


class EventParametersDefinition(BaseModel):
    name: str = Field(..., title="Parameter Name")
    type: Literal["STATIC", "DYNAMIC"] = Field(..., title="Type of Parameter")
    valueType: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = (
        Field(..., title="Type of Parameter")
    )
    content: Union[str, int, bool, dict, list, None] = Field(
        None, title="Value of Parameter"
    )


class EventItemDefinition(BaseModel):
    name: str = Field(..., title="Event item Name")
    type: Literal[
        "SET_STATE",
        "FUNCTION_CALL",
        "PROP_CALL",
        "SHOW_TOAST",
        "NAVIGATE",
    ] = Field(..., title="Type of Event item")
    stateName: str = Field("", title="State name for SET_STATE")
    functionName: str = Field("", title="function name for FUNCTION_CALL")
    propName: str = Field("", title="prop name for PROP_CALL")
    paramterList: List[EventParametersDefinition] = Field(
        [], title="List of parameter value for event"
    )


class EventDefinition(BaseModel):
    name: str = Field(..., title="Event Name")
    type: Literal[
        "ON_CHANGE",
        "ON_FOCUS",
        "ON_BLUR",
        "ON_CLICK",
    ] = Field(..., title="Type of Event")
    eventItems: List[EventItemDefinition] = Field(
        [],
        title="Event item of Element",
        description="Defines Event item for the element.",
    )


# MediaQuery = Literal[
#     "@media screen and (max-width: 600px)",
#     "@media screen and (max-width: 900px) and (min-width: 600px)",
#     "@media screen and (max-width: 1200px) and (min-width: 900px)",
#     "@media screen and (max-width: 1536px) and (min-width: 1200px)",
#     "@media (min-width: 1536px)",
# ]
class StyleDefinition(BaseModel):
    name: str = Field(..., title="Style Name")
    content: str = Field(
        ...,
        title="Value of Style",
        description="The value assigned to the style property.",
    )


class JsxNode(BaseModel):
    elementType: str = Field(
        ...,
        title="Element Type of specific elements",
    )
    attributes: List[AttributeDefinition] = Field(
        [],
        title="attributes applied to the element",
        description="A List of attributes applied to the element. the style attribute not exist in this list.",
    )
    styles: List[StyleDefinition] = Field(
        [],
        title="Style of Element",
        description="Defines styles for the element.",
    )
    events: List[EventDefinition] = Field(
        [],
        title="Event of Element",
        description="Defines Event for the element.",
    )
    children: List[Union["JsxNode", Any]] = Field(
        [],
        title="Children of Element",
        description="A list of child elements nested within this element.",
    )


class NoCodeComponentDefinition(BaseModel):
    states: List[StateDefinition] = Field([], title="States used in Component")
    props: List[PropDefinition] = Field([], title="Props used in Component")
    functions: List[FunctionDefinition] = Field([], title="Functions used in Component")
    jsxNodes: Union[JsxNode, List[JsxNode]] = None


class ComponentDefinition(BaseModel):
    title: str = Field("", title="Component Title")
    description: str = Field("", title="Component Description")
    noCode: NoCodeComponentDefinition = None
    componentCode: str = Field(
        default="",
        title="complete code of Component",
        description="The final complete code string that should be saved",
    )


class ConfigGenerate(BaseModel):
    accessGenerate: List[Literal["FULL", "STATE", "PROP", "EVENT"]] = []
    language: Literal["fa", "en"] = "fa"


class AgentGraphState(BaseModel):
    query: str
    context: str = None
    finalResult: ComponentDefinition = None
    config: ConfigGenerate = ConfigGenerate()
    messages: Annotated[list, add_messages] = []
