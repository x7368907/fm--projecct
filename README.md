Commission & Agent Management System
Overview

A fullstack admin system built with React (Frontend) and FastAPI (Backend), designed to manage agent hierarchies and commission structures.

Tech Stack

React + TypeScript

FastAPI

MySQL

SQLAlchemy

Tailwind CSS

Ant Design

JWT Authentication

Architecture

Frontend:

Domain-based state management

Reusable UI component system

Data table abstraction layer

Backend:

Layered architecture (Router / Service / Model / Schema)

RESTful API design

Role-based access control

Features

JWT login authentication

Role-based permission control

Dynamic table filtering & pagination

Commission rule management

Agent hierarchy management

Deployment

Frontend: Vercel

Backend: Railway

Database: MySQL (Docker for local development)

Demo

(https://fm-project.vercel.app/)

FM Admin System

Full-Stack 後台管理系統，支援代理層級管理、分潤制度設定與會員統計，並已完成 Production 部署。

🚀 Project Overview

本專案為一套全端後台管理系統，主要功能包含：

多層級代理管理（Parent / Child 結構）

分潤制度（佔成制 / 返水制）

代理下線數量統計

會員數量統計

JWT 登入驗證

前後端完整部署（Vercel + Railway）

此專案涵蓋從資料庫設計 → API 開發 → 前端整合 → 部署上線的完整流程。

🧱 Tech Stack
Frontend

React + TypeScript

Ant Design

Axios

Vite

Backend

FastAPI

SQLAlchemy ORM

Pydantic

Uvicorn

Database

MySQL

Foreign Key 關聯設計

JOIN / GROUP BY / Subquery

Deployment

Frontend: Vercel

Backend: Railway

Database: Railway MySQL

🏗 System Architecture
React (Frontend)
↓ Axios
FastAPI (Backend)
↓ SQLAlchemy ORM
MySQL Database
🗄 Database Design
Main Tables

agents

users

commission_plan

commission_plan_log

Key Relationships

agents.parent_id → 代理層級結構

users.agent_id → 會員歸屬代理

agents.commission_plan_id → 分潤制度關聯

Aggregation Logic

系統使用 JOIN + Subquery 計算：

child_count（代理下線數量）

member_count（代理會員數量）

🔐 Authentication

JWT Token 驗證機制

登入成功後返回 access_token

前端透過 Authorization Header 呼叫 API

📡 Example API
GET /agents?level=1

回傳資料包含：

代理基本資訊

代理層級

下線數量

會員數量

分潤制度與比例

⚙️ Local Development
1️⃣ Clone Repository
git clone <your-repo-url>
cd fm-admin-system
2️⃣ Backend Setup
cd backend
python -m venv venv
source venv/bin/activate # Mac/Linux
pip install -r requirements.txt

建立 .env：

DATABASE_URL=mysql+pymysql://root:password@localhost:3307/fm_project

啟動後端：
source venv/bin/activate
uvicorn app.main:app --reload

API 文件：

http://localhost:8000/docs
3️⃣ Frontend Setup
cd frontend
npm install

建立 .env：

VITE_API_BASE_URL=http://localhost:8000

啟動前端：

npm run dev
🌍 Production Deployment
Frontend

Deploy 至 Vercel

設定環境變數：

VITE_API_BASE_URL

Backend

Deploy 至 Railway

設定：

DATABASE_URL

🐛 Challenges & Solutions
1️⃣ ORM Model 與 DB Schema 不同步

問題：

Production 環境出現 500 Error

Unknown column 錯誤

解法：

比對 SQLAlchemy Model 與 MySQL Schema

使用 ALTER TABLE 補齊缺失欄位

確保 Migration 與資料表一致

2️⃣ CORS 跨網域問題

問題：

前端部署後無法呼叫 API

解法：

在 FastAPI 設定 CORSMiddleware

允許指定前端網址

3️⃣ Railway MySQL 連線格式錯誤

問題：

mysql:// 連線格式不被 SQLAlchemy 支援

解法：

轉換為 mysql+pymysql://

📈 Key Learning Outcomes

熟悉 Full-Stack 開發流程

實際處理 Production 環境錯誤

能獨立完成資料建模與 API 設計

具備前後端整合與部署經驗

📌 Future Improvements

加入 Role-based Permission

分頁與效能優化

使用 Docker 容器化部署

加入 CI/CD Pipeline

👨‍💻 Author

Full-Stack Developer
React + FastAPI + MySQL
Deployed on Vercel & Railway
