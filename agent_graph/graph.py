import logging

from langgraph.graph import StateGraph
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode

from states.state import AgentGraphState

from agents.agents import (
    RetrievalAgent,
    ComponentGeneratorAgent,
    ConvertStructuredOutputAgent,
    EndNodeAgent
)

from tools.elementType_attribute import node_elementType_attribute

def create_graph(server=None, model=None, temperature=0):
    graph = StateGraph(AgentGraphState)

    graph.add_node(
        "retrieval", 
        lambda state: RetrievalAgent(
            state=state,
            server=server,
            model=model,
            temperature=temperature
        ).invoke(       
        )
    )

    graph.add_node(
        "component_generator", 
        lambda state: ComponentGeneratorAgent(
            state=state,
            server=server,
            model=model,
            temperature=temperature
        ).invoke(       
        )
    )

    attribute_tool = [node_elementType_attribute]
    graph.add_node("attribute_tool", ToolNode(attribute_tool))

    graph.add_conditional_edges(
        "component_generator",
        # If the latest message (result) from node reasoner is a tool call -> tools_condition routes to tools
        # If the latest message (result) from node reasoner is a not a tool call -> tools_condition routes to END
        tools_condition,
        {
           "tools": "attribute_tool",
           "__end__" : "component_extractor"
        }
    )

    graph.add_node(
        "component_extractor", 
        lambda state: ConvertStructuredOutputAgent(
            state=state,
            server=server,
            model=model,
            temperature=temperature
        ).invoke()
    )

    graph.add_edge("attribute_tool", "component_generator")


    graph.add_node("end", lambda state: EndNodeAgent(state).invoke())

    # Add edges to the graph
    graph.set_entry_point("retrieval")
    # graph.set_finish_point("end")

    graph.add_edge("retrieval", "component_generator")

    graph.add_edge("component_extractor", "end")

    return graph

def compile_workflow(graph):
    workflow = graph.compile()
    return workflow
