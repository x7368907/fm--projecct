from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class LoginPayload(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: int
    username: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True
