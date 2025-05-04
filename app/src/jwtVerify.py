from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from dotenv import load_dotenv
import os

load_dotenv()
KEY = os.getenv("KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2Scheme = OAuth2PasswordBearer(tokenUrl="retailradar/getToken")

async def currentUser(token: str = Depends(oauth2Scheme)):
    payload = jwt.decode(token, KEY, algorithm=ALGORITHM)
    email: str = payload.get("sub")
    return email