# ⚙️ backend/README.md

````markdown
# FM Admin Backend

FastAPI RESTful API 服務。

---

## 🧱 Tech Stack

- FastAPI
- SQLAlchemy
- Pydantic
- MySQL
- Uvicorn

---

## 🗄 Database Design

### Main Tables

- agents
- users
- commission_plan
- commission_plan_log

### Key Relationships

- agents.parent_id → 代理層級
- users.agent_id → 會員歸屬
- agents.commission_plan_id → 分潤制度

---

## ⚙️ Local Setup

建立虛擬環境：

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

建立 .env：

DATABASE_URL=mysql+pymysql://root:password@localhost:3307/fm_project

啟動：
source venv/bin/activate
uvicorn app.main:app --reload

API 文件：

http://localhost:8000/docs
🌍 Production

部署於 Railway

需設定環境變數：

DATABASE_URL
🧠 Aggregation Logic

使用 JOIN + Subquery 計算：

child_count（下線代理數）

member_count（會員數）

🐛 Common Issues
ORM 與 DB 欄位不同步

解法：使用 ALTER TABLE 補齊缺失欄位

Railway MySQL 連線格式

將 mysql:// 轉為 mysql+pymysql://
```
````
