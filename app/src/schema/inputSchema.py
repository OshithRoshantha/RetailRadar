from pydantic import BaseModel
from typing import List

class churnInput(BaseModel):
    Total_Spend: float
    Total_Purchases: int
    Recency: int
    Avg_Order_Value: float

class clvInput(BaseModel):
    Total_Spend: float
    Total_Purchases: int
    Lifespan: float
    Type: str
   
class scrapeInput(BaseModel):
    categories: List[str] 
    