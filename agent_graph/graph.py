import logging

from langgraph.graph import StateGraph, END, START
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode

from states.state import AgentGraphState

from agents.agents import (
    RetrievalElementDetailsAgent,
    ComponentGeneratorAgent,
    SaveComponentPartsAgent,
    ConvertJsxCodeToJsxNodeAgent,
)

from tools.elementType_attribute import elementType_attribute
from tools.elementType_sample_code import elementType_sample_code
from tools.jsx_to_kdl_element import jsx_to_kdl_element


def create_graph(server=None, model=None, temperature=0):
    graph = StateGraph(AgentGraphState)

    graph.add_node(
        "retrieval element details",
        lambda state: RetrievalElementDetailsAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    graph.add_node(
        "component generator",
        lambda state: ComponentGeneratorAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    tools_generator = [elementType_sample_code, elementType_attribute]
    graph.add_node("tools generator", ToolNode(tools_generator))

    graph.add_node(
        "save component parts",
        lambda state: SaveComponentPartsAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    graph.add_node(
        "Convert JsxCode To JsxNode",
        lambda state: ConvertJsxCodeToJsxNodeAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    graph.add_edge(START, "retrieval element details")

    graph.add_edge("retrieval element details", "component generator")

    graph.add_edge("tools generator", "component generator")

    graph.add_conditional_edges(
        "component generator",
        # If the latest message (result) from node reasoner is a tool call -> tools_condition routes to tools
        # If the latest message (result) from node reasoner is a not a tool call -> tools_condition routes to END
        tools_condition,
        # ["tools generator", "save component parts"],
        {"tools": "tools generator", "__end__": "save component parts"},
    )

    graph.add_edge("save component parts", "Convert JsxCode To JsxNode")
    graph.add_edge("Convert JsxCode To JsxNode", END)

    return graph


def compile_workflow(graph):
    workflow = graph.compile()
    workflow.get_graph().draw_mermaid_png(output_file_path="diagram.png")

    return workflow
