from langchain_community.tools.tavily_search import TavilySearchResults
from states.state import AgentGraphState

def node_search_internet(state: AgentGraphState) -> AgentGraphState:
    """
    Searches the internet for the rewritten query using a search tool.
    """
    print("---Node Search Internet---")
    rewritten_query = state["rewritten_query"]
    
    # Implement your own search_tool function or import it
    results = TavilySearchResults(max_results=3).invoke(rewritten_query)
    print("Search results:")
    print(results)
    state["search_results"] = str(results)
    return state