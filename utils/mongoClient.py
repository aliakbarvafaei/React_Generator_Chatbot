from pymongo import MongoClient
from pymongo.collection import Collection


def mongoClientCollection(collectionName) -> Collection:
    # MongoDB connection setup
    MONGO_URI = "mongodb://localhost:27017"  # Change if needed
    DATABASE_NAME = "ReactElementsGenerator"  # Change to your database name
    COLLECTION_NAME = collectionName or "elements"  # Collection to store elements data

    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    return collection
