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
    code: str = Field(..., title="Function code")


class ComponentDefinition(BaseModel):
    title: str = Field("", title="Component Title")
    description: str = Field("", title="Component Description")
    states: List[StateDefinition] = Field([], title="States used in Component")
    props: List[PropDefinition] = Field([], title="Props used in Component")
    functions: List[FunctionDefinition] = Field([], title="Functions used in Component")
    jsxCode: str = Field("", title="jsx code of Component")
    componentCode: str = Field("", title="complete code of Component")
    elementTypes: List[str] = Field([], title="Element Types used in Component")


# class TaskDefinition(BaseModel):
#     title: str = Field(..., title="Task Title")
#     result_task: ComponentDefinition = Field(None, title="Result Task")


class AttributeDefinition(BaseModel):
    name: str = Field(..., title="Attribute Name")
    type: Literal["STATIC", "DYNAMIC"] = Field(..., title="Type of Attribute")
    valueType: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = (
        Field(..., title="Type of Attribute")
    )
    content: Union[str, int, bool, dict, list, None] = Field(
        None, title="Value of Attribute"
    )


class StyleDefinition(BaseModel):
    name: str = Field(..., title="Style Name")
    # type: Literal["STATIC"] = Field(
    #     ...,
    #     title="Type of Style",
    #     description="Indicates the type of style, currently supports only 'STATIC'.",
    # )
    content: str = Field(
        ...,
        title="Value of Style",
        description="The value assigned to the style property.",
    )


# MediaQuery = Literal[
#     "@media screen and (max-width: 600px)",
#     "@media screen and (max-width: 900px) and (min-width: 600px)",
#     "@media screen and (max-width: 1200px) and (min-width: 900px)",
#     "@media screen and (max-width: 1536px) and (min-width: 1200px)",
#     "@media (min-width: 1536px)",
# ]


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
    children: List[Union["JsxNode", Any]] = Field(
        [],
        title="Children of Element",
        description="A list of child elements nested within this element.",
    )


class AttributeDefinition(BaseModel):
    name: str = Field(..., title="Attribute Name")
    type: Literal["STATIC", "DYNAMIC"] = Field(..., title="Type of Attribute")
    valueType: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = (
        Field(..., title="Type of Attribute")
    )
    content: Union[str, int, bool, dict, list, None] = Field(
        None, title="Value of Attribute"
    )


class StyleDefinition(BaseModel):
    name: str = Field(..., title="Style Name")
    # type: Literal["STATIC"] = Field(
    #     ...,
    #     title="Type of Style",
    #     description="Indicates the type of style, currently supports only 'STATIC'.",
    # )
    content: str = Field(
        ...,
        title="Value of Style",
        description="The value assigned to the style property.",
    )


# MediaQuery = Literal[
#     "@media screen and (max-width: 600px)",
#     "@media screen and (max-width: 900px) and (min-width: 600px)",
#     "@media screen and (max-width: 1200px) and (min-width: 900px)",
#     "@media screen and (max-width: 1536px) and (min-width: 1200px)",
#     "@media (min-width: 1536px)",
# ]


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
    children: List[Union["JsxNode", Any]] = Field(
        [],
        title="Children of Element",
        description="A list of child elements nested within this element.",
    )


class ConfigGenerate(BaseModel):
    accessGenerate: List[Literal["FULL", "STATE", "PROP", "EVENT"]] = []
    language: Literal["fa", "en"] = "fa"


# Define Agent State
class AgentGraphState(BaseModel):
    query: str
    context: str = None
    # is_relevant: bool = True
    # tasks: List[TaskDefinition] = []
    finalResult: ComponentDefinition = None
    config: ConfigGenerate = ConfigGenerate()
    jsxNodes: JsxNode = None
    messages: Annotated[list, add_messages] = []
