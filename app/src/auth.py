from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from dotenv import load_dotenv
import os

load_dotenv()
KEY = os.getenv("KEY")
ALGORITHM = os.getenv("ALGORITHM")

def createToken(data: dict, expDelta: Optional[timedelta]=None):
    toEncode = data.copy()
    if expDelta:
        exp = datetime.utcnow()+expDelta
    else:
        exp = datetime.utcnow()+timedelta(minutes=15)
    toEncode.update({"exp": int(exp.timestamp())})
    encodeJwt = jwt.encode(toEncode, KEY, algorithm=ALGORITHM)
    return encodeJwt