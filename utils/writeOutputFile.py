import os
from typing import Any


def writeCode(code: str):
    output_path = "./output/"
    os.makedirs(
        output_path, exist_ok=True
    )  # ✅ Create output folder if it doesn't exist

    # Save JSX code if available
    with open(os.path.join(output_path, "Component.jsx"), "w", encoding="utf-8") as f:
        f.write(code)


def writeJson(state: Any, fileName="agent_state.json"):
    output_path = "./output/"
    os.makedirs(
        output_path, exist_ok=True
    )  # ✅ Create output folder if it doesn't exist

    # Save agent_state
    with open(os.path.join(output_path, fileName), "w", encoding="utf-8") as f:
        f.write(state.model_dump_json(indent=4))
