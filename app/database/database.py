from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from userAccount import user

load_dotenv()

uri = os.getenv("MONGO_URI")
dbName = os.getenv("DATABASE")

client = AsyncIOMotorClient(uri)
db = client[dbName]

async def register(user: user):
    newUser = user.dict()
    await db["userProfiles"].insert_one(newUser)