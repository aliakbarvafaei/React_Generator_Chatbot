import logging
from langgraph.graph import StateGraph, END, START
from langgraph.prebuilt import tools_condition, ToolNode
from states.state import AgentGraphState
from agents.agents import (
    RetrievalElementDetailsAgent,
    ComponentGeneratorAgent,
    SaveComponentPartsAgent,
    ConvertJsxCodeToJsxNodeAgent,
)
from tools.elementType_attribute import elementType_attribute
from tools.elementType_sample_code import elementType_sample_code


def create_graph(server=None, model=None, temperature=0):
    graph = StateGraph(AgentGraphState)

    agents = {
        "retrieval element details": RetrievalElementDetailsAgent,
        "component generator": ComponentGeneratorAgent,
        "save component parts": SaveComponentPartsAgent,
        "Convert JsxCode To JsxNode": ConvertJsxCodeToJsxNodeAgent,
    }

    for name, agent in agents.items():
        graph.add_node(
            name,
            lambda state, agent=agent: agent(
                state=state, server=server, model=model, temperature=temperature
            ).invoke(),
        )

    graph.add_node(
        "tools generator", ToolNode([elementType_sample_code, elementType_attribute])
    )

    graph.add_edge(START, "retrieval element details")
    graph.add_edge("retrieval element details", "component generator")
    graph.add_edge("tools generator", "component generator")

    graph.add_conditional_edges(
        "component generator",
        tools_condition,
        {"tools": "tools generator", "__end__": "save component parts"},
    )

    graph.add_edge("save component parts", "Convert JsxCode To JsxNode")
    graph.add_edge("Convert JsxCode To JsxNode", END)

    return graph


def compile_workflow(graph):
    workflow = graph.compile()
    # workflow.get_graph().draw_mermaid_png(output_file_path="diagram.png")
    return workflow
