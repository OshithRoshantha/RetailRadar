from pydantic import BaseModel

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