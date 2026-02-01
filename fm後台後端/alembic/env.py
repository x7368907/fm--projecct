from logging.config import fileConfig
import os

from alembic import context
from sqlalchemy import engine_from_config, pool

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

# ✅ 載入 .env（專案根目錄）
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if load_dotenv:
    load_dotenv(os.path.join(BASE_DIR, ".env"))

# ✅ 讓 Alembic 找到你的 app 套件
# （確保 `from app...` 可以正常 import）
import sys
sys.path.append(BASE_DIR)

# ✅ 引入 Base
from app.db.database import Base  # noqa: E402

# ✅ 確保 models 都被 import 過（這步很重要，才能 autogenerate）
# 你目前有 app/models/commission.py
from app.models import commission  # noqa: F401, E402

target_metadata = Base.metadata


def get_database_url() -> str:
    # 先從環境變數讀（推薦）
    url = os.getenv("DATABASE_URL")
    if url:
        return url
    # 如果你習慣用 database_url 之類也可以加這裡
    url = os.getenv("database_url")
    if url:
        return url
    # fallback：讀 alembic.ini 裡的 sqlalchemy.url
    return config.get_main_option("sqlalchemy.url")


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
    # ✅ 把 .env 的 DATABASE_URL 覆蓋進 Alembic config
    url = get_database_url()
    config.set_main_option("sqlalchemy.url", url)

    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

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
