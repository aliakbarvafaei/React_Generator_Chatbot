from typing import Annotated, Literal, Union, List, Any
from pydantic import BaseModel, Field, field_validator, model_validator
from langgraph.graph.message import add_messages


class StateDefinition(BaseModel):
    name: str = Field(..., title="State Name")
    defaultValue: Union[str, int, bool, dict, list, None] = Field(
        None, title="Default Value"
    )
    type: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY"] = Field(
        ..., title="Type of State"
    )

    @model_validator(mode="before")
    def validate_default_value(cls, values):
        default_value, state_type = values.get("defaultValue"), values.get("type")
        if default_value is not None:
            expected_types = {
                "STRING": str,
                "NUMBER": (int, float),
                "BOOLEAN": bool,
                "OBJECT": dict,
                "ARRAY": list,
            }
            if not isinstance(default_value, expected_types[state_type]):
                raise ValueError(
                    f"Default value must be of type {expected_types[state_type].__name__}"
                )
        return values


class PropDefinition(BaseModel):
    name: str = Field(..., title="Prop Name")
    type: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = Field(
        ..., title="Type of Prop"
    )


class FunctionDefinition(BaseModel):
    name: str = Field(..., title="Function Name")
    inputParams: List[str] = Field([], title="Input Parameters of Function")
    code: str = Field(..., title="Function code")

    @field_validator("code")
    def validate_code(cls, v):
        if not v.strip():
            raise ValueError("Function code cannot be empty")
        if "return" not in v and "console.log" not in v:
            raise ValueError(
                "Function should have at least a return statement or a console.log for debugging"
            )
        return v


# class TaskDefinition(BaseModel):
#     title: str = Field(..., title="Task Title")
#     result_task: ComponentDefinition = Field(None, title="Result Task")


class ComponentDefinition(BaseModel):
    title: str = Field("", title="Component Title")
    description: str = Field("", title="Component Description")
    category: str = Field("", title="Category of Component")
    version: str = Field("1.0.0", title="Component Version")
    isReusable: bool = Field(True, title="Is Component Reusable?")
    states: List[StateDefinition] = Field([], title="States used in Component")
    props: List[PropDefinition] = Field([], title="Props used in Component")
    functions: List[FunctionDefinition] = Field([], title="Functions used in Component")
    jsxCode: str = Field("", title="jsx code of Component")
    componentCode: str = Field("", title="complete code of Component")
    elementTypes: List[str] = Field([], title="Element Types used in Component")


class AttributeDefinition(BaseModel):
    name: str = Field(..., title="Attribute Name")
    type: Literal["STATIC", "DYNAMIC"] = Field(..., title="Type of Attribute")
    valueType: Literal["STRING", "NUMBER", "BOOLEAN", "OBJECT", "ARRAY", "FUNCTION"] = (
        Field(..., title="Type of Attribute")
    )
    content: Union[str, int, bool, dict, list, None] = Field(
        None, title="Value of Attribute"
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
    children: List[Union["JsxNode", Any]] = Field(
        [],
        title="Children of Element",
        description="A list of child elements nested within this element.",
    )


class ConfigGenerate(BaseModel):
    accessGenerate: List[Literal["FULL", "STATE", "PROP", "EVENT"]] = []
    language: Literal["fa", "en"] = "fa"


class AgentGraphState(BaseModel):
    query: str
    context: str = None
    # is_relevant: bool = True
    # tasks: List[TaskDefinition] = []
    finalResult: ComponentDefinition = None
    config: ConfigGenerate = ConfigGenerate()
    jsxNodes: JsxNode = None
    messages: Annotated[list, add_messages] = []
