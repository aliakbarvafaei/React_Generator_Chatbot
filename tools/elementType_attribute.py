import logging
from utils.mongoClient import mongoClientCollection


def elementType_attribute(elementType: str):
    """get information of element of this system like attribute , tagName , childrenElementTypes.
    Args:
        elementType: the specifc elementType.
    Returns:
        - static_attrs: list of static attrs of element. each of this item has schema like this:
            {
                name: name of attr,
                type: string | number ....,
                possibleValues: for possible values and if not exist means value can everything
            }
        - dynamic_attrs: list of dynamic attrs of element.
            dynamic means can use value from state component , prop component or static value or ...
            each of this item has schema like this:
            {
                name: name of attr,
                type: string | number ....,
            }
        - tagName: tagName of element that use in jsx
        - childrenElementTypes: what elementType can be used in children. if childrenElementTypes is [] means selfClosing,
        "ALL" means can use all elementTypes,
        ["elementType1","elementType2"] means can use elementType1 and elementType2 in children.
    """

    collection = mongoClientCollection(collectionName="elements")
    documents = collection.find({"elementType": elementType}).to_list()

    logging.info(f"-----------Attribute Tool ({elementType})----------")

    return {
        "static_attrs": documents[0]["static_attrs"],
        "dynamic_attrs": documents[0]["dynamic_attrs"],
        "tagName": documents[0]["component"],
        "childrenElementTypes": documents[0]["childrenElementTypes"],
    }
