from pydantic import BaseModel

class churnResponse(BaseModel):
    prediction: int
    probability: float
    
class clvResponse(BaseModel):
    predictedClv: float
    
class demandDataframe(BaseModel):
    Product_Category: dict
    Sales: dict
    
class demandResponse(BaseModel):
    nextWeek: demandDataframe
    nextMonth: demandDataframe

class salesDataframe(BaseModel):
    YearMonth: dict
    Sales: dict
    
class salesResponse(BaseModel):
    predictions: salesDataframe