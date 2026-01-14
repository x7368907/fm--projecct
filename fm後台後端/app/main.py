from fastapi import FastAPI
from app.routers import commission

# ⬇⬇⬇ 關鍵：一定要 import 這兩個
from app.db.database import engine, Base
import app.models.commission  # 讓 SQLAlchemy 知道有這個 model

app = FastAPI()

# 掛載 router
app.include_router(commission.router)

# 🔑 啟動時自動建表（第一次部署必須）
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Hello, World!"}
