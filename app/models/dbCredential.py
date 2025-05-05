from pydantic import BaseModel

class credential(BaseModel):
    email: str
    password: str