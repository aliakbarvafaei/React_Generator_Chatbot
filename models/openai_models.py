from langchain_openai import ChatOpenAI
from utils.helper_functions import load_config
import os

config_path = os.path.join(os.path.dirname(__file__), '..', 'config', 'config.yaml')
load_config(config_path)

azure_base_url = "https://models.inference.ai.azure.com"

def get_open_ai(temperature=0, model='gpt-3.5-turbo'):

    llm = ChatOpenAI(
        model=model,
        temperature = temperature,
        base_url= azure_base_url
    )
    return llm

def get_open_ai_json(temperature=0, model='gpt-3.5-turbo'):
    llm = ChatOpenAI(
        model=model,
        temperature = temperature,
        model_kwargs={"response_format": {"type": "json_object"}},
        base_url= azure_base_url
    )
    return llm
