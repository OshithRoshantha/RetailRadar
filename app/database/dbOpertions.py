from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from passlib.context import CryptContext
from models.dbUser import user
from models.dbCredential import credential
from src.auth import createToken
from datetime import timedelta

load_dotenv()

pwdContext = CryptContext(schemes=["bcrypt"], deprecated="auto")

uri = os.getenv("MONGO_URI")
dbName = os.getenv("DATABASE")
exp = int(os.getenv("EXP"))

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
    if userData:
        if pwdContext.verify(input.password, userData["password"]):
            tokenExp = timedelta(minutes=exp)
            accessToken = createToken(data={"sub": userData["email"]}, expDelta=tokenExp)
            return {
                "token": accessToken,
                "email": userData["email"],
                "company": userData["businessName"]
            }
        else:
            return "Invalid"
    else:
        return "Invalid"
    
    
    
    

