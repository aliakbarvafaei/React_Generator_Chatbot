import logging

from langgraph.graph import StateGraph, END, START
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode

from states.state import AgentGraphState

from agents.agents import (
    RetrievalAgent,
    ComponentGeneratorAgent,
    ConvertStructuredOutputAgent,
)

from tools.elementType_attribute import elementType_attribute
from tools.elementType_sample_code import elementType_sample_code


def create_graph(server=None, model=None, temperature=0):
    graph = StateGraph(AgentGraphState)

    graph.add_node(
        "retrieval",
        lambda state: RetrievalAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    graph.add_node(
        "component_generator",
        lambda state: ComponentGeneratorAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    tools = [elementType_sample_code, elementType_attribute]
    graph.add_node("tools", ToolNode(tools))

    graph.add_node(
        "component_extractor",
        lambda state: ConvertStructuredOutputAgent(
            state=state, server=server, model=model, temperature=temperature
        ).invoke(),
    )

    graph.add_edge(START, "retrieval")

    graph.add_edge("retrieval", "component_generator")

    graph.add_edge("tools", "component_generator")

    graph.add_conditional_edges(
        "component_generator",
        # If the latest message (result) from node reasoner is a tool call -> tools_condition routes to tools
        # If the latest message (result) from node reasoner is a not a tool call -> tools_condition routes to END
        tools_condition,
        {"tools": "tools", "__end__": "component_extractor"},
    )

    graph.add_edge("component_extractor", END)

    return graph


def compile_workflow(graph):
    workflow = graph.compile()
    workflow.get_graph().draw_mermaid_png(output_file_path="diagram.png")

    return workflow
