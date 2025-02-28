import os
import yaml

# for loading configs to environment variables
def load_config(file_path):
    # Define default values
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
        for key, value in config.items():
            # If the value is empty or None, load the default value
            if not value:
                os.environ[key] = ""
            else:
                os.environ[key] = value
