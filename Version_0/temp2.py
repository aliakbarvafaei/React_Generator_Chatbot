import os
import json
import logging
from typing import List, Dict, Literal
from pydantic import BaseModel, Field, ValidationError
from langchain.chat_models import ChatOllama
from langchain.schema import SystemMessage, HumanMessage
from langgraph.graph import StateGraph, END, START

# ============================
# 💬 LLM Configuration (Ollama)
# ============================
llm = ChatOllama(
    model="llama3.2:latest", 
    base_url="http://localhost:11434"
)

# ============================
# 🛠️ Helper Function for Structured Output
# ============================
def get_structured_output(llm, prompt, output_model):
    """Get structured output from the LLM by prompting for JSON."""
    response = llm.invoke(prompt)
    try:
        parsed_response = json.loads(response.content)
        return output_model(**parsed_response)
    except (json.JSONDecodeError, ValidationError) as e:
        raise ValueError(f"Failed to parse structured output: {e}")

# ============================
# 📦 Pydantic Models
# ============================
class RelevantUserQuery(BaseModel):
    is_relevant: bool = Field(description="boolean for relevance or not")

class TaskList(BaseModel):
    tasks: List[str] = Field(description="list of tasks")

class JsxTask(BaseModel):
    jsx: str = Field(description="JSX code")
    elementTypes: List[str] = Field(description="element types used")

class FinalResult(BaseModel):
    jsx: str = Field(description="final JSX code")
    stateDefinitionList: List[Dict[str, str]] = Field(description="list of states")

class AgentState(BaseModel):
    query: str
    is_relevant: bool = True
    tasks: List[Dict] = []
    stateList: List[Dict[str, str]] = []
    finalJsx: str = ""

# ============================
# 📍 Graph Nodes
# ============================
def check_relevance(state: AgentState):
    prompt = f"""
    You determine if a query is relevant to UI development.
    Provide JSON:
    {{"is_relevant": true or false}}
    Query: {state.query}
    """
    response = get_structured_output(llm, prompt, RelevantUserQuery)
    state.is_relevant = response.is_relevant
    return state

def process_query(state: AgentState):
    prompt = f"""
    Analyze UI queries and generate tasks.
    Provide JSON:
    {{"tasks": ["task1", "task2"]}}
    Query: {state.query}
    """
    response = get_structured_output(llm, prompt, TaskList)
    state.tasks = [{"title": task, "jsx": "", "elementTypes": []} for task in response.tasks]
    return state

def generate_code(state: AgentState):
    for task in state.tasks:
        prompt = f"""
        Generate JSX for task.
        Provide JSON:
        {{"jsx": "<div></div>", "elementTypes": ["div"]}}
        Task: {task['title']}
        """
        response = get_structured_output(llm, prompt, JsxTask)
        task.update({"jsx": response.jsx, "elementTypes": response.elementTypes})
    return state

def merge_code(state: AgentState):
    tasksJsx = [task['jsx'] for task in state.tasks]
    prompt = f"""
    Merge JSX into a final component.
    Provide JSON:
    {{"jsx": "<header></header>", "stateDefinitionList": []}}
    Tasks JSX: {tasksJsx}
    """
    response = get_structured_output(llm, prompt, FinalResult)
    state.stateList.extend(response.stateDefinitionList)
    state.finalJsx = response.jsx
    return state

def decide_mood(state) -> Literal["process_query", END]:
    return "process_query" if state.is_relevant else END

# ============================
# 🚀 Graph Workflow
# ============================
workflow = StateGraph(AgentState)
workflow.add_node("check_relevance", check_relevance)
workflow.add_node("process_query", process_query)
workflow.add_node("generate_code", generate_code)
workflow.add_node("merge_code", merge_code)
workflow.add_edge(START, "check_relevance")
workflow.add_conditional_edges("check_relevance", decide_mood)
workflow.add_edge("process_query", "generate_code")
workflow.add_edge("generate_code", "merge_code")
workflow.add_edge("merge_code", END)

# ============================
# 🧪 Run the Workflow
# ============================
graph = workflow.compile()
initial_state = AgentState(query="""
Create a header with a logo on the right and navigation links with icons on the left.
""")
result = graph.invoke(initial_state)
print(f"Final JSX:\n{result.finalJsx}")
