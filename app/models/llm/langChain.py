import os
import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import SystemMessagePromptTemplate
from config.coreConfig import mainConfig

def initializeAgent():
    mainConfig()
    
    try:
        source = pd.read_parquet('data/processed/cleanedData.parquet')
    except:
        source = pd.DataFrame()

    llm = ChatOpenAI(model=os.getenv('MODEL'))

    systemMsg = SystemMessagePromptTemplate.from_template(os.getenv("SYSPROMPT"))

    memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history", return_messages=True)

    return create_pandas_dataframe_agent(
        llm=llm,
        df=source,
        verbose=False,
        allow_dangerous_code=True,
        memory=memory,
        system_message=systemMsg,
        extra_prompt_messages=[systemMsg]  
    )  