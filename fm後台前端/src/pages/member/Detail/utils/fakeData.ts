import type { DataType } from '../types'

// 1. 定義隨機資料庫 (用於組裝)
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
  '健亞',
  '怡君',
  '雅婷',
  '宗翰',
  '志明',
  '家豪',
  '承恩',
  '欣怡',
  '心愛',
  '子軒',
  '宇翔',
  '大衛',
  '淑芬',
  '冠宇',
]
const TAG_OPTIONS = [
  'IP黑名單',
  '裝置黑名單',
  '套利疑慮',
  '多重帳號',
  '一般會員',
  'VIP',
  '新會員',
  '頻繁黑名單',
]
const PAYMENT_GROUPS = [
  '常規會員',
  '大額會員',
  '觀察名單',
  '測試群組',
  'USDT專用',
]
const REBATE_TYPES = ['週結', '日結', '月結']
const AGENTS = [
  { level: '1 / 5', name: 'W03\n連結-(信用/返水代理-外單位)' },
  { level: '1 / 5', name: 'TD01\n(金流/成數代理-前台 ca04 單位)' },
  { level: '2 / 5', name: 'AA88\n(金流/成數代理-總公司)' },
  { level: '1 / 4', name: 'TEST01\n(測試代理)' },
  { level: '3 / 6', name: 'FMCA\n(股東-內撥)' },
]
const STATUS_VERIFY = ['success', 'warning', 'error', 'default'] // 用於 storeVerified, usdt

// 2. 隨機生成 50 筆資料
export const MOCK_DATA: DataType[] = Array.from({ length: 50 }).map(
  (_, index) => {
    // --- A. 隨機基本資料 ---
    const surname = SURNAMES[Math.floor(Math.random() * SURNAMES.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const fullName = `${surname}${name}`
    const memberAccount = `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`

    // --- B. 隨機代理與標籤 ---
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    const tagCount = Math.floor(Math.random() * 2) + 1 // 1~2 個標籤
    const tags = Array.from({ length: tagCount }).map(
      () => TAG_OPTIONS[Math.floor(Math.random() * TAG_OPTIONS.length)]
    )
    // 去除重複標籤
    const uniqueTags = [...new Set(tags)]

    // --- C. 狀態邏輯 ---
    const isActive = Math.random() > 0.1 // 90% 啟用
    const status = isActive ? '啟用' : '停用'
    // 如果啟用，有 20% 機率有備註 (例如停用託售)
    const statusNote = isActive && Math.random() > 0.8 ? '(停用託售)' : ''

    // --- D. 金額與次數 ---
    const deposit = Math.floor(Math.random() * 500000)
    // 提領金額通常小於等於存款 (邏輯上)，這裡簡單隨機
    const withdraw = Math.floor(Math.random() * deposit)
    const withdrawUsed = Math.floor(Math.random() * 4) // 0~3
    const withdrawCount = `${withdrawUsed} / 3`

    // --- E. 時間生成 ---
    const now = new Date()
    const registerDate = new Date(
      now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 365
    ) // 過去一年內
    const loginDate = new Date(
      now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 30
    ) // 過去30天內

    // 格式化時間 YYYY/MM/DD HH:mm:ss
    const formatTime = (d: Date) =>
      d.toISOString().replace('T', ' ').split('.')[0].replace(/-/g, '/')

    // 計算離線天數
    const daysOffline = Math.floor(
      (now.getTime() - loginDate.getTime()) / (1000 * 3600 * 24)
    )

    return {
      key: (index + 1).toString(),
      tags: uniqueTags,
      agentLevel: agent.level,
      agentName: agent.name,
      memberAccount: memberAccount,
      memberName: fullName,
      paymentGroup:
        PAYMENT_GROUPS[Math.floor(Math.random() * PAYMENT_GROUPS.length)],
      status: status,
      statusNote: statusNote, // 可能是空字串
      rebateType: REBATE_TYPES[Math.floor(Math.random() * REBATE_TYPES.length)],

      // 驗證狀態
      isVerified: Math.random() > 0.1,
      bankVerified: Math.random() > 0.2,
      storeVerified:
        STATUS_VERIFY[Math.floor(Math.random() * STATUS_VERIFY.length)],
      usdt: STATUS_VERIFY[Math.floor(Math.random() * STATUS_VERIFY.length)],

      depositAmount: deposit,
      withdrawAmount: withdraw,
      withdrawCount: withdrawCount,

      registerTime: formatTime(registerDate),
      loginTime: formatTime(loginDate),
      daysOffline: daysOffline,

      accountBalance: Math.floor(Math.random() * 1000000), // 隨機餘額
      gameBalance: Math.floor(Math.random() * 1000000), // 隨機遊戲餘額

      name: undefined,
    }
  }
)
