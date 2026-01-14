import axios from 'axios'

const instance = axios.create({
  baseURL: '/api', // 替換成你的後端 API 網址
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
