import os
import json
from pymongo import MongoClient

# MongoDB connection setup
MONGO_URI = "mongodb://localhost:27017"  # Change if needed
DATABASE_NAME = "ReactElementsGenerator"  # Change to your database name
COLLECTION_NAME = "elements"  # Collection to store elements data

def connect_mongodb():
    """Connect to MongoDB and return the collection."""
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    return collection

def read_json_files(root_folder):
    """Read all output.json files in subdirectories of root_folder."""
    documents = []
    
    for element_type in os.listdir(root_folder):
        component_path = os.path.join(root_folder, element_type)
        json_path = os.path.join(component_path, "output.json")
        elementText_path = os.path.join(component_path, "index.txt")

        data = {}
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as json_file:
                data = json.load(json_file)
                documents.append(data)

        if os.path.exists(elementText_path):
            with open(elementText_path, "r", encoding="utf-8") as elementText:
                data["elementText"] = elementText.read()
    
    return documents

def insert_into_mongodb(collection, documents):
    """Insert documents into MongoDB."""
    if documents:
        collection.insert_many(documents)
        print(f"Inserted {len(documents)} documents into MongoDB collection '{COLLECTION_NAME}'")
    else:
        print("No documents to insert.")

def main():
    elements_directory = "elements"  # Root folder containing component subfolders
    
    # Connect to MongoDB
    collection = connect_mongodb()
    
    # Read JSON files
    documents = read_json_files(elements_directory)

    # Insert into MongoDB
    insert_into_mongodb(collection, documents)

if __name__ == "__main__":
    main()
