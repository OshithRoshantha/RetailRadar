import os
import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import SystemMessagePromptTemplate
from config.coreConfig import mainConfig

def initializeAgent():
    mainConfig()
    source = pd.read_parquet('../../data/processed/cleanedData.parquet')

    llm = ChatOpenAI(model=os.getenv('MODEL'))

    systemMsg = SystemMessagePromptTemplate.from_template(
        "You are working with a dataframe containing transaction data. "
        "Each row represents one unique transaction. "
        "The dataframe has been loaded and is ready for analysis."
    )

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