# import json
# import yaml
# import os
import time
import logging

from pydantic import BaseModel, ValidationError

from langchain.schema import SystemMessage, HumanMessage

from models.openai_models import get_open_ai, get_open_ai_json
from models.ollama_models import OllamaModel, OllamaJSONModel
from models.groq_models import GroqModel, GroqJSONModel
from models.claude_models import ClaudModel, ClaudJSONModel
from models.gemini_models import GeminiModel, GeminiJSONModel

from states.state import (
    AgentGraphState,
    ComponentDefinition,
    JsxNode,
)

from tools.elementType_attribute import elementType_attribute
from tools.elementType_sample_code import elementType_sample_code
from tools.jsx_to_kdl_element import jsx_to_kdl_element

from utils.mongoClient import mongoClientCollection

time_sleep = 0


class Agent:
    def __init__(self, state: AgentGraphState, model=None, server=None, temperature=0):
        self.state = state
        self.model = model
        self.server = server
        self.temperature = temperature

    def get_llm(self, json_model=False):
        if self.server == "openai":
            return (
                get_open_ai_json(model=self.model, temperature=self.temperature)
                if json_model
                else get_open_ai(model=self.model, temperature=self.temperature)
            )
        if self.server == "ollama":
            return (
                OllamaJSONModel(model=self.model, temperature=self.temperature)
                if json_model
                else OllamaModel(model=self.model, temperature=self.temperature)
            )
        if self.server == "groq":
            return (
                GroqJSONModel(model=self.model, temperature=self.temperature)
                if json_model
                else GroqModel(model=self.model, temperature=self.temperature)
            )
        if self.server == "claude":
            return (
                ClaudJSONModel(model=self.model, temperature=self.temperature)
                if json_model
                else ClaudModel(model=self.model, temperature=self.temperature)
            )
        if self.server == "gemini":
            return (
                GeminiJSONModel(model=self.model, temperature=self.temperature)
                if json_model
                else GeminiModel(model=self.model, temperature=self.temperature)
            )

    def update_state(self, key, value):
        self.state = {**self.state, key: value}


class RetrievalElementDetailsAgent(Agent):
    def invoke(self):
        """Fetch element details from the database and prepare a detailed context for the LLM."""
        collection = mongoClientCollection(collectionName="elements")

        data = collection.find({}).to_list()

        self.state.context = "\n".join(
            [
                f"Element ({item['elementType']}): {item['description']}."
                for item in data
            ]
        )
        logging.info("🔹 Element details successfully retrieved.")
        return self.state


class ComponentGeneratorAgent(Agent):
    def invoke(self):
        """Generate JSX code based on user query while strictly using allowed tags and elements."""
        prompt = f"""
        🔹 **User Request:** {self.state.query}
        🔹 **Programming Language:** {self.state.config.language}
        🔹 **Access Level:** {self.state.config.accessGenerate}
            - "FULL": You can use all attributes, props, state, and events.  
            - "STATE": You can only use `useState` and state-based attributes.  
            - "PROP": You can define and use `props` but not state.  
            - "EVENT": You can define event handlers but not state or props.  
            - Empty: Only static content is allowed.

        🔹 **Allowed Elements & Tags:**  
        Only use the elements listed below. Do NOT use any external or unlisted tags.  
        {self.state.context}
        """

        llm_with_tools = self.get_llm().bind_tools(
            [elementType_sample_code, elementType_attribute]
        )

        sys_msgs = [
            SystemMessage(
                content="💡 You are a skilled React developer. Generate clean, modular, and optimized React components."
            ),
            SystemMessage(
                content="🧱 You MUST only use elements and tags explicitly defined in the provided context."
            ),
            SystemMessage(
                content="⚙️ Based on the provided access level, limit your use of state, props, and events accordingly."
            ),
            SystemMessage(
                content=f"🌐 Output must be in `{self.state.config.language}`. If it's `fa`, use Persian text and support RTL layout."
            ),
            SystemMessage(content="⚙️ Follow React best practices in all outputs."),
        ]

        time.sleep(time_sleep)
        response = llm_with_tools.invoke(
            sys_msgs + [HumanMessage(content=prompt)] + self.state.messages
        )

        self.state.messages = self.state.messages + [response]

        return self.state


class SaveComponentPartsAgent(Agent):
    def invoke(self):
        """Extract different parts of the generated React component and store them in a structured format."""
        sys_msg = SystemMessage(
            content="🛠 Please break down the generated JSX structure into separate sections such as State, Props, Render, and Effects."
        )

        structured_model = self.get_llm().with_structured_output(ComponentDefinition)

        time.sleep(time_sleep)
        response = structured_model.invoke([sys_msg] + self.state.messages)

        self.state.finalResult = ComponentDefinition(**response.model_dump())
        return self.state


class ConvertJsxCodeToJsxNodeAgent(Agent):
    def invoke(self):
        """Convert JSX code into a structured tree format (DSL) for processing and storage."""
        sys_msg = SystemMessage(
            content="📌 Convert the provided JSX code into a structured JSON-based tree representation suitable for further processing and storage."
        )

        structured_model = self.get_llm().with_structured_output(JsxNode)

        try:
            time.sleep(time_sleep)
            response = structured_model.invoke([sys_msg] + self.state.messages)
            self.state.jsxNodes = JsxNode(**response.model_dump())
            logging.info("✅ Successfully converted JSX into a structured tree format.")
        except ValidationError as exc:
            logging.error(
                f"❌ Error in converting JSX to structured format: {exc.errors()}"
            )

        return self.state
