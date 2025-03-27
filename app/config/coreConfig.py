import os
from dotenv import load_dotenv

def mainConfig():
    load_dotenv()
    
    os.environ["OPENAI_API_KEY"] = os.getenv('KEY')
    os.environ["OPENAI_API_BASE"] = os.getenv('BASE')