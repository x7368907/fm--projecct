# FM Admin Frontend

React + TypeScript 後台管理介面。

---

## 🧱 Tech Stack

- React
- TypeScript
- Ant Design
- Axios
- Vite

---

## ⚙️ Local Development

```bash
npm install

建立 .env：

VITE_API_BASE_URL=http://localhost:8000

啟動：

npm run dev
🌍 Production

部署至 Vercel

需設定環境變數：

VITE_API_BASE_URL=https://your-backend-url
📡 API Integration

前端透過 Axios 呼叫：

GET /agents

POST /commission-plans

PUT /commission-plans/{id}

📊 Main Features

代理層級點擊導覽

分潤比例顯示

下線與會員數量統計

JWT 登入驗證
```
