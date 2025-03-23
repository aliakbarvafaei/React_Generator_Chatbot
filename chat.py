import os
import json
import yaml
import chainlit as cl
from chainlit.input_widget import TextInput, Slider, Select, NumberInput
from agent_graph.graph import create_graph, compile_workflow
from config.config import load_config
import logging

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)


def update_config():
    load_config()
    logging.info(f"Configuration updated successfully.")


class ChatWorkflow:
    def __init__(self):
        self.workflow = None
        self.recursion_limit = 40

    def build_workflow(self, server, model, temperature, recursion_limit=40):
        graph = create_graph(
            server=server,
            model=model,
            temperature=temperature,
        )
        self.workflow = compile_workflow(graph)
        self.recursion_limit = recursion_limit

    def invoke_workflow(self, message):
        if not self.workflow:
            return "Workflow has not been built yet. Please update settings first."

        dict_inputs = {"query": message.content}
        limit = {"recursion_limit": self.recursion_limit}

        for event in self.workflow.stream(dict_inputs, limit):

            if "component extractor" in event.keys():
                # print("\n\nEVENT_DEBUG:", event)
                state = event["component extractor"]
                componentCode = state["finalResult"].componentCode

                return componentCode if componentCode else "No Result available"

        return "Workflow did not reach final result"


update_config()
# Use a single instance of ChatWorkflow
chat_workflow = ChatWorkflow()


@cl.on_chat_start
async def start():
    server = "openai"
    model = "gpt-4o"

    chat_workflow.build_workflow(server, model, 0)
    await cl.Message(content="😊 Workflow built successfully.").send()
    await cl.ChatSettings(
        [
            # Select(
            #     id="server",
            #     label="Select the server you want to use:",
            #     values=["openai", "ollama", "vllm", "groq", "claude", "gemini"],
            # ),
            # NumberInput(
            #     id="recursion_limit",
            #     label="Enter the recursion limit:",
            #     description="The maximum number of agent actions the workflow will take before stopping. The default value is 40",
            #     initial=40,
            # ),
            # TextInput(
            #     id="google_serper_api_key",
            #     label="Enter your SERPER API Key:",
            #     description="You can get your API key from https://serper.dev/",
            #     # initial="NO_KEY_GIVEN"
            # ),
            # TextInput(
            #     id="openai_llm_api_key",
            #     label="Enter your OpenAI API Key:",
            #     description="Only use this if you are using an OpenAI Model.",
            #     # initial="NO_KEY_GIVEN"
            # ),
            # TextInput(
            #     id="groq_llm_api_key",
            #     label="Enter your Groq API Key:",
            #     description="Only use this if you are using Groq.",
            #     # initial="NO_KEY_GIVEN"
            # ),
            # TextInput(
            #     id="claud_llm_api_key",
            #     label="Enter your Claud API",
            #     description="Only use this if you are using Claud.",
            # ),
            # TextInput(
            #     id="gemini_llm_api_key",
            #     label="Enter your Gemini API",
            #     description="Only use this if you are using Gemini.",
            # ),
            # TextInput(
            #     id="llm_model",
            #     label="Enter your Model Name:",
            #     description="The name of the model you want to use",
            # ),
            # TextInput(
            #     id="server_endpoint",
            #     label="Your vLLM server endpoint:",
            #     description="Your HTTPs endpoint for the vLLM server. Only use if you are using a custom server",
            # ),
            # Slider(
            #     id="temperature",
            #     label="Temperature:",
            #     initial=0,
            #     max=1,
            #     step=0.05,
            #     description="Lower values will generate more deterministic responses, while higher values will generate more random responses. The default value is 0",
            # ),
        ]
    ).send()


@cl.on_settings_update
async def update_settings(settings):
    global author
    # server = settings["server"]
    # model = settings["llm_model"]
    # model_endpoint = settings["server_endpoint"]
    # temperature = settings["temperature"]
    # recursion_limit = settings["recursion_limit"]
    # author = settings["llm_model"]

    # server = "openai"
    # model = "gpt-4o"
    # await cl.Message(
    #     content="✅ Settings updated successfully, building workflow..."
    # ).send()
    # chat_workflow.build_workflow(server, model, temperature)
    await cl.Message(content="😊 Workflow built successfully.").send()


@cl.on_message
async def main(message: cl.Message):
    response = await cl.make_async(chat_workflow.invoke_workflow)(message)
    # await cl.Message(content=f"{response}", author=author).send()
    await cl.Message(content=f"{response}", language="jsx").send()
