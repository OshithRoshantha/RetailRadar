from pydantic import BaseModel

class churnResponse(BaseModel):
    prediction: int
    probability: float
    
class clvResponse(BaseModel):
    predictedClv: float