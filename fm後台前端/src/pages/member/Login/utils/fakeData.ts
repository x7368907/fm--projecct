import type { MemberLoginType } from '../types'

// ==========================================
// 1. 定義隨機資料庫
// ==========================================
const SURNAMES = [
  '陳',
  '林',
  '黃',
  '張',
  '李',
  '王',
  '吳',
  '劉',
  '蔡',
  '楊',
  '許',
  '鄭',
  '謝',
  '郭',
]
const NAMES = [
  '湘琳',
  '小明',
  '志豪',
  '雅婷',
  '怡君',
  '建國',
  '淑芬',
  '冠宇',
  '心愛',
  '承恩',
  '依婷',
  '俊傑',
  '佩珊',
  '家豪',
]
const CITIES = [
  'Taipei',
  'New Taipei',
  'Taichung',
  'Kaohsiung',
  'Tainan',
  'Taoyuan',
  'Hsinchu',
]
const TAG_OPTIONS = [
  '新會員',
  '常客黑名單',
  'IP異常',
  '多重帳號',
  '一般會員',
  'VIP',
  '風險帳號',
]
const DEVICE_TYPES = ['Mobile', 'Desktop', 'Tablet']
const PRIVILEGES = [
  'VIP0-遊客',
  'VIP1-一般會員',
  'VIP2-黃金會員',
  'VIP3-白金會員',
  'VIP4-鑽石會員',
]

const AGENTS = [
  { level: '1 / 5', name: 'damn1688', sub: '((金流/成數代權-插展...))' },
  { level: '2 / 5', name: 'super888', sub: '((總代理-直屬))' },
  { level: '1 / 4', name: 'agent007', sub: '((成數代理-外部))' },
  { level: '3 / 6', name: 'money_king', sub: '((股東-內撥))' },
  { level: '1 / 5', name: 'test_user', sub: '((測試帳號群))' },
]

// 模擬 "現在" 的時間點 (用於計算離線天數)
const CURRENT_MOCK_DATE = new Date('2025-07-01T12:00:00').getTime()

// 格式化時間 YYYY/MM/DD HH:mm:ss
const formatTime = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// 產生隨機 IP
const getRandomIP = () => {
  if (Math.random() > 0.3) {
    // IPv4
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  } else {
    // IPv6 (簡易模擬)
    return `2402:${Math.floor(Math.random() * 9999)}:${Math.floor(Math.random() * 999)}:6a8c...`
  }
}

// 產生隨機 Device ID
const getRandomDeviceId = () => {
  return (
    Math.random().toString(16).substring(2) +
    Math.random().toString(16).substring(2) +
    '...'
  )
}

// ==========================================
// 2. 隨機生成 50 筆資料
// ==========================================
export const MOCK_DATA: MemberLoginType[] = Array.from({ length: 50 }).map(
  (_, index) => {
    // 基礎個資
    const surname = SURNAMES[Math.floor(Math.random() * SURNAMES.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    const phone = `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`

    // 標籤 (20% 機率有標籤)
    const hasTag = Math.random() > 0.7
    const tags = hasTag
      ? [TAG_OPTIONS[Math.floor(Math.random() * TAG_OPTIONS.length)]]
      : []

    // 時間邏輯
    const regDate = new Date(
      CURRENT_MOCK_DATE - Math.random() * 1000 * 60 * 60 * 24 * 365
    ) // 過去一年內註冊
    // 登入時間介於 註冊時間 ~ 現在
    const loginDate = new Date(
      regDate.getTime() +
        Math.random() * (CURRENT_MOCK_DATE - regDate.getTime())
    )

    // 計算離線天數
    const daysOffline = Math.floor(
      (CURRENT_MOCK_DATE - loginDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    return {
      key: (index + 1).toString(),
      tags: tags,
      agentLevel: agent.level,
      agentName: agent.name,
      agentSubInfo: agent.sub,
      account: phone,
      privilege: PRIVILEGES[Math.floor(Math.random() * PRIVILEGES.length)],
      name: `${surname}${name}`,

      registerTime: formatTime(regDate),
      loginTime: formatTime(loginDate),
      daysOffline: daysOffline,

      country: 'Taiwan',
      city: CITIES[Math.floor(Math.random() * CITIES.length)],
      ip: getRandomIP(),
      deviceType: DEVICE_TYPES[Math.floor(Math.random() * DEVICE_TYPES.length)],
      deviceId: getRandomDeviceId(),

      // 90% 啟用，若離線超過 60 天則較高機率停用
      status: Math.random() > 0.1 && daysOffline < 60 ? '啟用' : '停用',
    }
  }
)
