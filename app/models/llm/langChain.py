import os
import pandas as pd
from langchain.chat_models import ChatOpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import SystemMessagePromptTemplate

source = pd.read_parquet('../../data/processed/cleanedData.parquet')

llm = ChatOpenAI(model=os.getenv('MODEL'))

system = SystemMessagePromptTemplate.from_template(
    "You are working with a dataframe containing transaction data. "
    "Each row represents one unique transaction. "
    "The dataframe has been loaded and is ready for analysis."
)

memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history", return_messages=True)

agent = create_pandas_dataframe_agent(
    llm=llm,
    df=source,
    verbose=False,
    allow_dangerous_code=True,
    memory=memory,
    system_message=system,
    extra_prompt_messages=[system]  
)

response = agent.run("How many transactions happened in the last 10 days from the last date in data")
print(response)


    