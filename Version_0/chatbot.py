from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
from typing import Dict
import os
import logging
from temp import graph, AgentState

logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)

# تنظیم مدل چت و حافظه
llm = ChatOpenAI(
    model="gpt-4o",
    api_key=os.environ.get("GITHUB_API_KEY"),
    base_url="https://models.inference.ai.azure.com",
)

# حافظه موقت برای مدیریت تاریخچه گفتگو
memory = ConversationBufferMemory()

class ChatbotWithMemory:
    def __init__(self, llm, memory):
        self.llm = llm
        self.memory = memory

    def handle_user_input(self, user_input: str) -> str:
        # ذخیره ورودی کاربر در حافظه
        self.memory.chat_memory.add_user_message(user_input)

        # اجرای گراف با ورودی کاربر
        initial_state = AgentState(query=user_input)
        final_state = graph.invoke(initial_state)

        print(f"Final State: {final_state}")
        # پردازش نتیجه گراف و تولید پاسخ
        system_response = final_state.finalJsx
        self.memory.chat_memory.add_ai_message(system_response)

        return system_response

    def chat_loop(self):
        print("\nChatbot with Temporary Memory Initialized! Type 'exit' to quit.\n")
        while True:
            user_input = input("You: ")
            if user_input.lower() == "exit":
                print("Exiting... Goodbye!")
                break
            response = self.handle_user_input(user_input)
            print(f"Chatbot: {response}\n")

if __name__ == "__main__":
    chatbot = ChatbotWithMemory(llm, memory)
    chatbot.chat_loop()