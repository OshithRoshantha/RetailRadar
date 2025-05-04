from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from dotenv import load_dotenv
import os

load_dotenv()
KEY = os.getenv("KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2Scheme = OAuth2PasswordBearer(tokenUrl="retailradar/getToken")

async def currentUser(token: str = Depends(oauth2Scheme)):
    payload = jwt.decode(token, KEY, algorithms=[ALGORITHM])
    email: str = payload.get("sub")
    return email