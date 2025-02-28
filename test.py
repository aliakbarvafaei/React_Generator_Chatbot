from agent_graph.graph import create_graph, compile_workflow
from states.state import AgentGraphState
import logging

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)

# server = 'ollama'
# model = 'llama3.2:latest'
# model_endpoint = None

server = 'openai'
model = 'gpt-4o-mini'

print ("Creating graph and compiling workflow...")
graph = create_graph(server=server, model=model,)
workflow = compile_workflow(graph)

print ("Graph and workflow created.")

initial_stateee = AgentGraphState(query="""I want a beautifuly header:
                             in the right a image box have logo and title of website.
                             in the left many item link that each of them have a icon and text.
                             like : link to shoppage, link to about us page, link to contact us page.
                             and at the end of left side a button for login.""")

res = workflow.invoke(initial_stateee)

agent_state = AgentGraphState(**res)

output_path = "./output/"

with open(output_path + "agent_state.json", "w", encoding="utf-8") as f:
    f.write(agent_state.model_dump_json(indent=4))

with open(output_path + "Component.jsx", "w", encoding="utf-8") as f:
    f.write(agent_state.final_result.component_code)