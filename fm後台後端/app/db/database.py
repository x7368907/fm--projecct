from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://root:root1234@localhost:3307/fm_project"

engine = create_engine(
    DATABASE_URL,
    echo=True,          # 會印 SQL（除錯用）
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()
