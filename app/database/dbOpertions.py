from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

uri = os.getenv("MONGO_URI")
dbName = os.getenv("DATABASE")

client = AsyncIOMotorClient(uri)
db = client[dbName]

class user(BaseModel):
    businessName: str
    email: str
    password: str
    
async def register(newUser: user):
    await db["userProfiles"].insert_one(newUser)