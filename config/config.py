import yaml
import os


# for loading configs to environment variables
def load_config():
    # Define default values
    path = os.path.join(os.path.dirname(__file__), "..", "config", "config.yaml")
    with open(path, "r") as file:
        config = yaml.safe_load(file)
        for key, value in config.items():
            # If the value is empty or None, load the default value
            if not value:
                os.environ[key] = ""
            else:
                os.environ[key] = value
