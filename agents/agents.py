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

time_sleep = 20


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
        collection = mongoClientCollection(collectionName="elements")

        data = collection.find({}).to_list()
        context = "\n".join(
            [
                f"description ElementType ({item['elementType']}) is: {item['description']}."
                for item in data
            ]
        )

        self.state.context = context

        logging.info(f"Context Generated.")
        return self.state


class ComponentGeneratorAgent(Agent):
    def invoke(self):

        prompt = f"""the user query is: {self.state.query}.\n\n  
        the user language is: {self.state.config.language}.\n\n  
        accessGenerate: {self.state.config.accessGenerate}.\n\n
        context: {self.state.context}.\n\n 
        """

        tools = [elementType_sample_code, elementType_attribute]
        llm_with_tools = self.get_llm().bind_tools(tools)

        sys_msg = SystemMessage(
            content="""You are great developer and you can create react component code.
                                                        you should generate jsx code for this task with element types.
                                                        but my element is specific and you can not use any element.
                                                            this element have specific jsx code and attribute that use tools for get sample jsx code and attribute.
                                                            in context exist my element with description and for valid attribute and sample code exist some tools.
                                                            static attrs is fixed and can not use state or props or ... and dynamic attrs can be used from state or props or static or ... .
                                                            also can use style element in style attribute.  
                                                            you can only use useState and props component and function in your code.
                                                            also you should generate base on user language.
                                                        """
        )

        sys_msg2 = SystemMessage(
            content="""For this generation you have some list of access for generate.
                                 with type accessGenerate: List[Literal["FULL", "STATE", "PROP", "EVENT"]]
                                 if FULL you have all access,
                                 if STATE you have only use state,
                                 if "PROP", "EVENT" you have access for define event for element and use prop component.
                                 and else accessGenerate is empty you do not access to use state , prop, event and should be 
                                 static data.
                                 """
        )
        humam_msg = HumanMessage(content=prompt)
        time.sleep(time_sleep)
        response = llm_with_tools.invoke(
            [sys_msg] + [sys_msg2] + [humam_msg] + self.state.messages
        )

        # Ensure `messages` exists before updating
        if not self.state.messages:
            self.state.messages = []

        # Append the response to `messages`
        self.state.messages = self.state.messages + [response]

        return self.state


class SaveComponentPartsAgent(Agent):
    def invoke(self):
        sys_msg = SystemMessage(
            content="""You are great developer and you can create react component code.
                                                        you should extract section of generated react component 
                                                        """
        )

        structured_model = self.get_llm().with_structured_output(ComponentDefinition)
        time.sleep(time_sleep)

        response = structured_model.invoke([sys_msg] + self.state.messages)

        result = ComponentDefinition(**response.model_dump())

        self.state.finalResult = result
        # logging.info("Final Generated React components.")
        # output_path = "./output/"

        # with open(output_path + "agent_state.json", "w", encoding="utf-8") as f:
        #     f.write(result.model_dump_json(indent=4))

        # with open(output_path + "Component.jsx", "w", encoding="utf-8") as f:
        #     if not result.componentCode or result.componentCode == "":
        #         f.write(result.jsxCode)
        #     else:
        #         f.write(result.componentCode)

        return self.state


class ConvertJsxCodeToJsxNodeAgent(Agent):
    def invoke(self):
        sys_msg = SystemMessage(
            content="""You are great developer and you can convert jsx of any react component to 
            specific dsl output. you should convert jsx code to dsl of element base child and parent(nested)
                                                        """
        )

        structured_model = self.get_llm().with_structured_output(JsxNode)

        try:
            time.sleep(time_sleep)
            response = structured_model.invoke([sys_msg] + self.state.messages)

            self.state.jsxNodes = JsxNode(**response.model_dump())

            logging.info("Final KDL Element.")
        except ValidationError as exc:
            logging.info("Error KDL Element: ", repr(exc.errors()))

        return self.state
