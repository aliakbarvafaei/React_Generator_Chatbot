import os
import json
import re


def parse_txt_file(file_path, element_type):
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    data = {
        "elementType": element_type,  # Store the folder name as elementType
        "component": "",
        "description": "",
        "selfClosing": False,
        "childrenElementTypes": [],
        "static_attrs": [],
        "dynamic_attrs": [],
    }

    static_attrs_section = False
    dynamic_attrs_section = False

    for line in lines:
        line = line.strip()

        if line.lower().startswith("name tag"):
            data["component"] = line.split(":")[1].strip()

        elif line.lower().startswith("children element"):
            data["selfClosing"] = "not have" in line.lower()

        elif line.lower().startswith("static attrs:"):
            static_attrs_section = True
            dynamic_attrs_section = False
            continue

        elif line.lower().startswith("dynamic attrs:"):
            static_attrs_section = False
            dynamic_attrs_section = True
            continue

        elif static_attrs_section or dynamic_attrs_section:
            match = re.match(r"(\d+-\s*)([\w]+):\s*(.*)", line)
            if match:
                attr_name = match.group(2)
                attr_type_values = match.group(3)

                # # Determine type and possible values
                # if "|" in attr_type_values:
                #     attr_type = "enum"
                #     values = [v.strip() for v in attr_type_values.split("|")]
                # elif attr_type_values.lower() in ["string", "boolean", "function"]:
                #     attr_type = attr_type_values.lower()
                #     values = None
                # elif "list of" in attr_type_values.lower():
                #     attr_type = "list"
                #     values = re.findall(r"\((.*?)\)", attr_type_values)[0].split("|")
                #     values = [v.strip() for v in values]
                # else:
                #     attr_type = "string"
                #     values = None

                attr_obj = {
                    "name": attr_name,
                    "type": attr_type_values,
                }

                if static_attrs_section:
                    attr_obj["possibleValues"] = attr_type_values

                attr_obj["description"] = ""
                # if values:
                #     attr_obj["values"] = values

                if static_attrs_section:
                    data["static_attrs"].append(attr_obj)
                elif dynamic_attrs_section:
                    data["dynamic_attrs"].append(attr_obj)

        else:
            if data["description"]:
                data["description"] += " " + line
            else:
                data["description"] = line

    return data


def process_elements_directory(root_folder):
    for element_type in os.listdir(root_folder):
        component_path = os.path.join(root_folder, element_type)

        if os.path.isdir(component_path):  # Ensure it's a folder
            txt_path = os.path.join(component_path, "description.txt")
            json_path = os.path.join(component_path, "output.json")

            if os.path.exists(txt_path):
                parsed_data = parse_txt_file(txt_path, element_type)

                with open(json_path, "w", encoding="utf-8") as json_file:
                    json.dump(parsed_data, json_file, indent=4, ensure_ascii=False)

                print(f"Converted: {txt_path} → {json_path}")
            else:
                print(f"Skipped: No description.txt in {element_type}")


# Example usage
elements_directory = (
    "./Version_0/elements"  # Root folder containing component subfolders
)
process_elements_directory(elements_directory)
