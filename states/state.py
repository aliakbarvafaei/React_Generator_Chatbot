from typing import Annotated, Literal, Union, List
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
    jsx_code: str = Field(..., title="jsx code of Component")
    component_code: str = Field(..., title="code of Component")
    elementTypes: List[str] = Field([], title="Element Types used in Component")


class TaskDefinition(BaseModel):
    title: str = Field(..., title="Task Title")
    result_task: ComponentDefinition = Field(None, title="Result Task")


class AttributeDefinition(BaseModel):
    name: str = Field(..., title="Attribute Name")
    type: Literal["STATIC", "DYNAMIC"] = Field(..., title="Type of Attribute")
    valueType: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = (
        Field(..., title="Type of Attribute")
    )
    value: Union[str, int, bool, dict, list, None] = Field(
        None, title="Value of Attribute"
    )


class StyleDefinition(BaseModel):
    name: str = Field(..., title="Style Name")
    # type: Literal["STATIC"] = Field(..., title="Type of Style")
    value: str = Field(..., title="Value of Style")


class KDLElementsJSX(BaseModel):
    elementType: str = Field(..., title="Element Type")
    attributes: List[AttributeDefinition] = Field([], title="Attributes of Element")
    styles: List[StyleDefinition] = Field([], title="Styles of Element")
    children: List["KDLElementsJSX"] = Field([], title="Children of Element")


# Define Agent State
class AgentGraphState(BaseModel):
    query: str
    context: str = None
    is_relevant: bool = True
    tasks: List[TaskDefinition] = []
    final_result: ComponentDefinition = None
    elemens_kdl: KDLElementsJSX = None
    messages: Annotated[list, add_messages] = []
