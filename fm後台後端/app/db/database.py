import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. 嘗試從環境變數取得 Railway 的資料庫網址
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. 如果沒有環境變數 (代表你在本機開發)，就用你原本的 Local 網址
if not DATABASE_URL:
    DATABASE_URL = "mysql+pymysql://root:root1234@localhost:3307/fm_project"

# 3. 修正 Railway 網址格式 (把 mysql:// 改成 mysql+pymysql://)
# 這樣 SQLAlchemy 才看得懂
if DATABASE_URL and DATABASE_URL.startswith("mysql://"):
    DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)

engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()