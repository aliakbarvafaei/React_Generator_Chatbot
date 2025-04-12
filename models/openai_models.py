from langchain_openai import ChatOpenAI

# azure_base_url = "https://models.inference.ai.azure.com"
# azure_base_url = "https://api.avalapis.ir/v1"


def get_open_ai(temperature=0, model="gpt-3.5-turbo"):

    # llm = ChatOpenAI(model=model, temperature=temperature, base_url=azure_base_url)
    llm = ChatOpenAI(model=model, temperature=temperature)
    return llm


def get_open_ai_json(temperature=0, model="gpt-3.5-turbo"):
    llm = ChatOpenAI(
        model=model,
        temperature=temperature,
        model_kwargs={"response_format": {"type": "json_object"}},
        # base_url=azure_base_url,
    )
    return llm
