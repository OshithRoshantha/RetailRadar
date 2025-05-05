from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("MONGO_URI")
dbName = os.getenv("DATABASE")

client = AsyncIOMotorClient(uri)
db = client[dbName]