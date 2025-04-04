from fastapi import FastAPI
from pydantic import BaseModel
from workflowRunner import run_workflow
from states.state import AgentGraphState

app = FastAPI()


class AgentRequest(BaseModel):
    query: str
    accessGenerate: list[str] = ["FULL"]


@app.post("/generate", response_model=AgentGraphState)
def generate_component(request: AgentRequest):
    result = run_workflow(request.query, request.accessGenerate)
    return result
