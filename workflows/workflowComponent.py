import os
from states.state import AgentGraphState, ConfigGenerate
from graphs.graphComponent import createGraphComponent, compileWorkflowComponent
from utils.writeOutputFile import writeCode, writeJson


def runWorkflowComponent(query: str, access_generate: list[str]):
    server = "openai"
    model = "gpt-4o"

    graph = createGraphComponent(server=server, model=model)
    workflow = compileWorkflowComponent(graph)

    initial_state = AgentGraphState(
        query=query,
        config=ConfigGenerate(accessGenerate=access_generate),
    )

    result_state = workflow.invoke(initial_state)
    agent_state = AgentGraphState(**result_state)

    writeJson(agent_state)
    writeCode(agent_state.finalResult.componentCode)

    return agent_state
