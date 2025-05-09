from pydantic import BaseModel
from typing import List

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

class Product(BaseModel):
    Name: str
    Price: str
    URL: str
    Image_URL: str

class Category(BaseModel):
    Category: str
    Products: List[Product]

class scrapeResponse(BaseModel):
    Result: List[Category]
    
class tokenResponse(BaseModel):
    accessToken: str
    tokenType: str = "bearer"