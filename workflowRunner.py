import logging
from agent_graph.graph import create_graph, compile_workflow
from states.state import AgentGraphState, ConfigGenerate
from config.config import load_config

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)
load_config()

server = "openai"
model = "gpt-4o"

print("Creating graph and compiling workflow...")
graph = create_graph(server=server, model=model)
workflow = compile_workflow(graph)
print("Graph and workflow created.")


def run_workflow(query: str, access_generate: list[str]):
    initial_state = AgentGraphState(
        query=query,
        config=ConfigGenerate(accessGenerate=access_generate),
    )

    result_state = workflow.invoke(initial_state)
    agent_state = AgentGraphState(**result_state)

    # ذخیره فایل‌ها (اختیاری)
    output_path = "./output/"
    with open(output_path + "agent_state.json", "w", encoding="utf-8") as f:
        f.write(agent_state.model_dump_json(indent=4))

    with open(output_path + "Component.jsx", "w", encoding="utf-8") as f:
        code = agent_state.finalResult.componentCode or agent_state.finalResult.jsxCode
        f.write(code)

    return agent_state
