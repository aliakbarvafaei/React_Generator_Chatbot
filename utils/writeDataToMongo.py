import os
import json

from mongoClient import mongoClientCollection

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
        print(f"Inserted {len(documents)} documents into MongoDB collection '{"elements"}'")
    else:
        print("No documents to insert.")

def main():
    elements_directory = "elements"  # Root folder containing component subfolders
    
    # Connect to MongoDB
    collection = mongoClientCollection(
        collectionName="elements"
    )
    
    # Read JSON files
    documents = read_json_files(elements_directory)

    # Insert into MongoDB
    insert_into_mongodb(collection, documents)

if __name__ == "__main__":
    main()
