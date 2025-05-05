from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from models.dbUser import user
from models.dbCredential import credential

load_dotenv()

pwdContext = CryptContext(schemes=["bcrypt"], deprecated="auto")

uri = os.getenv("MONGO_URI")
dbName = os.getenv("DATABASE")

client = AsyncIOMotorClient(uri)
db = client[dbName]
    
async def register(newUser: user):
    hashedPwd = pwdContext.hash(newUser.password)
    userDict = newUser.dict()
    del userDict["password"]
    userDict["password"] = hashedPwd
    await db["userProfiles"].insert_one(userDict)
    
async def authenticate(input: credential):
    userData = await db["userProfiles"].find_one({"email": input.email})
    if pwdContext.verify(input.password, userData["password"]):
        return userData["email"]
    else:
        return "invalid"
