import os
from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))  # 1 day

# bcrypt 的硬限制：最多 72 bytes（不是 72 字）
MAX_BCRYPT_BYTES = 72


def hash_password(password: str) -> str:
    b = password.encode("utf-8")
    if len(b) > MAX_BCRYPT_BYTES:
        # 讓 router 去轉成 HTTPException 400（不要 500）
        raise ValueError("Password too long (max 72 bytes)")
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    b = plain.encode("utf-8")
    if len(b) > MAX_BCRYPT_BYTES:
        return False
    return pwd_context.verify(plain, hashed)


def create_access_token(
    data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
