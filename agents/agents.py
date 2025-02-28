# import json
# import yaml
# import os
import logging

from langchain.schema import SystemMessage, HumanMessage

from models.openai_models import get_open_ai, get_open_ai_json
from models.ollama_models import OllamaModel, OllamaJSONModel
from models.groq_models import GroqModel, GroqJSONModel
from models.claude_models import ClaudModel, ClaudJSONModel
from models.gemini_models import GeminiModel, GeminiJSONModel

from states.state import AgentGraphState, ComponentDefinition, StateDefinition, PropDefinition, FunctionDefinition

from tools.elementType_attribute import node_elementType_attribute

from utils.mongoClient import mongoClientCollection

class Agent:
    def __init__(self, state: AgentGraphState, model=None, server=None, temperature=0):
        self.state = state
        self.model = model
        self.server = server
        self.temperature = temperature

    def get_llm(self, json_model=False):
        if self.server == 'openai':
            return get_open_ai_json(model=self.model, temperature=self.temperature) if json_model else get_open_ai(model=self.model, temperature=self.temperature)
        if self.server == 'ollama':
            return OllamaJSONModel(model=self.model, temperature=self.temperature) if json_model else OllamaModel(model=self.model, temperature=self.temperature)
        if self.server == 'groq':
            return GroqJSONModel(
                model=self.model,
                temperature=self.temperature
            ) if json_model else GroqModel(
                model=self.model,
                temperature=self.temperature
            )
        if self.server == 'claude':
            return ClaudJSONModel(
                model=self.model,
                temperature=self.temperature
            ) if json_model else ClaudModel(
                model=self.model,
                temperature=self.temperature
            )
        if self.server == 'gemini':
            return GeminiJSONModel(
                model=self.model,
                temperature=self.temperature
            ) if json_model else GeminiModel(
                model=self.model,
                temperature=self.temperature
            )      

    def update_state(self, key, value):
        self.state = {**self.state, key: value}

class RetrievalAgent(Agent):
    def invoke(self):
        collection = mongoClientCollection(
            collectionName="elements"
        )

        data = collection.find({}).to_list()
        context = '\n'.join([f"description ElementType ({item['elementType']}) is: {item['description']}." for item in data])

        self.state.context = context
        
        logging.info(f"Context Generated.")
        return self.state

class ComponentGeneratorAgent(Agent):
    def invoke(self):
        
        prompt = f"""the user query is: {self.state.query}.\n\n     
        context: {self.state.context}.
        """
        
        tools = [node_elementType_attribute]
        llm_with_tools = self.get_llm().bind_tools(tools)

        sys_msg = SystemMessage(content="""You are great developer and you can create react component code.
                                                        you should generate jsx code for this task with element types.
                                                        but my element is specific and you can not use any element.
                                                            in context exist my element with description and valid attribute, static attrs and dynamic attrs.
                                                            static attrs is fixed and can not use state or props or ... and dynamic attrs can be used from state or props or static or ... .
                                                            also can use style element in style attribute.  
                                                            you can only use useState and props component and function in your code.
                                                        """)
        humam_msg = HumanMessage(content=prompt)
        response = llm_with_tools.invoke([sys_msg] + [humam_msg] + self.state.messages)
        
        # Ensure `messages` exists before updating
        if not self.state.messages:
            self.state.messages = []

        # Append the response to `messages`
        self.state.messages =  self.state.messages + [response]
                
        return self.state

class ConvertStructuredOutputAgent(Agent):
    def invoke(self):
        sys_msg = SystemMessage(content="""You are great developer and you can create react component code.
                                                        you should extract section of generated react component 
                                                        """) 
        
        structured_model = self.get_llm().with_structured_output(ComponentDefinition)
        response = structured_model.invoke([sys_msg] + self.state.messages)

        self.state.final_result = ComponentDefinition(**response.model_dump())
        
        logging.info("Final Generated React components.")
        
        return self.state

class EndNodeAgent(Agent):
    def invoke(self):
        
        print("end agent")
        return self.state