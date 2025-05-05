from pydantic import BaseModel

class user(BaseModel):
    businessName: str
    email: str
    password: str
    