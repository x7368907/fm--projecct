from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import commission
from app.routers import auth

# ⬇⬇⬇ 關鍵：一定要 import 這兩個
from app.db.database import engine, Base
import app.models.commission  # 讓 SQLAlchemy 知道有這個 model
import app.models.user  # ✅ 也把 user model import 進來（保險）

app = FastAPI()

# ✅ CORS：允許前端 localhost:5173 呼叫後端
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 掛載 router
app.include_router(commission.router)
app.include_router(auth.router)

# 🔑 啟動時自動建表（第一次部署必須）
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Hello, World!"}
