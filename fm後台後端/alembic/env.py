from logging.config import fileConfig
import os
import sys

from alembic import context
from sqlalchemy import create_engine, pool

# ✅ 讀 .env（沒有安裝 python-dotenv 也沒關係，會跳過）
try:
    from dotenv import load_dotenv
except Exception:
    load_dotenv = None

# this is the Alembic Config object, which provides access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# ✅ 專案根目錄
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# ✅ 載入 .env（專案根目錄）
if load_dotenv:
    load_dotenv(os.path.join(BASE_DIR, ".env"))

# ✅ 讓 Alembic 找到你的 app 套件（確保 `from app...` 可以正常 import）
sys.path.append(BASE_DIR)

# ✅ 引入 Base 與 app 的 DATABASE_URL（本機預設那條）
from app.db.database import Base, DATABASE_URL as APP_DATABASE_URL  # noqa: E402

# ✅ 確保 models 都被 import 過（這步很重要，才能 autogenerate）
from app.models import commission, user  # noqa: F401, E402

target_metadata = Base.metadata


def get_database_url() -> str:
    # 先從環境變數讀（Railway / .env）
    url = os.getenv("DATABASE_URL") or os.getenv("database_url")

    # ✅ 如果沒有環境變數，就用你 app/db/database.py 裡的預設（本機 mysql+pymysql）
    if not url:
        url = APP_DATABASE_URL

    # ✅ 修正 Railway/MySQL 常見格式：mysql:// → mysql+pymysql://
    if url and url.startswith("mysql://"):
        url = url.replace("mysql://", "mysql+pymysql://", 1)

    return url


def run_migrations_offline() -> None:
    url = get_database_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,  # ✅ 欄位型別變更也會偵測
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    url = get_database_url()

    # 🔎 先印出來確認 Alembic 最終用哪條 DB（跑通後可刪）
    print("ALEMBIC DB URL =", url)

    connectable = create_engine(url, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # ✅ 欄位型別變更也會偵測
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
