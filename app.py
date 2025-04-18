import logging
from dotenv import load_dotenv

from fastapi import FastAPI
from pydantic import BaseModel

from states.state import AgentGraphState
from workflows.workflowComponent import runWorkflowComponent

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)

app = FastAPI()
load_dotenv(override=True)


class AgentRequest(BaseModel):
    query: str
    accessGenerate: list[str] = ["FULL"]


@app.post("/generate", response_model=AgentGraphState)
def generate_component(request: AgentRequest):
    result = runWorkflowComponent(request.query, request.accessGenerate)
    return result
