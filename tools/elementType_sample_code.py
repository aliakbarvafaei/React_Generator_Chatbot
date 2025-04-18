import logging
from utils.mongoClient import mongoClientCollection
from langchain_core.tools import tool


@tool
def elementType_sample_code(elementType: str):
    """get samples code jsx of element of this system .
    Args:
        elementType: the specifc elementType.
    Returns:
        - samples: list of sample code of element. each of this item has schema like this:
            {
                description: description of this code,
                elementCode: code,
            }
    """

    collection = mongoClientCollection(collectionName="elements")
    documents = collection.find({"elementType": elementType}).to_list()

    logging.info(f"-----Call Code Tool: ({elementType})")

    return {
        "samples": documents[0]["samples"],
    }
