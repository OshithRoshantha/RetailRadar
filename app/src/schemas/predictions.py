from pydantic import BaseModel

class churnResponse(BaseModel):
    prediction: int
    probability: float
    
class clvResponse(BaseModel):
    predictedClv: float
    
class demandResponse(BaseModel):
    nextWeek: dict
    nextMonth: dict
    
class salesResponse(BaseModel):
    predictions: dict