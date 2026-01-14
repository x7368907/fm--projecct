import type {
  ChangeLineDataType,
  AgentData,
  MemberData,
  AgentLevelData,
} from '../types'

// ==========================================
// 1. 定義隨機資料庫與工具函式
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
  '湘晴',
  '櫻田',
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
const AGENTS_POOL = [
  'dan9099\n(金流/成數代理-外代-小刀)',
  'FMCA4\n主站-代理',
  'jiang0000',
  'test123456\n測試-doin入金',
  'super888\n(總代理-直屬)',
  'money_king\n(股東-內撥)',
  'agent007\n(外部成數)',
]
const TRANSFER_METHODS = [
  '所有資料\n(含代理、不保留資料)',
  '帳號保留舊代理',
  '僅轉移會員資料',
  '代理線下移轉',
]
const VIP_LEVELS = [
  'VIP1-一般會員',
  'VIP2-黃金會員',
  'VIP3-白金會員',
  'VIP4-鑽石會員',
]

// 產生隨機時間
const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

// 格式化: YYYY/MM/DD HH:mm:ss
const formatDateTime = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// 格式化: [YYYY/MM/DD, HH:mm:ss]
const formatSplitTime = (date: Date): [string, string] => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const dStr = `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`
  const tStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  return [dStr, tStr]
}

// ==========================================
// 2. MOCK_DATA (隨機 50 筆)
// ==========================================
export const MOCK_DATA: ChangeLineDataType[] = Array.from({ length: 50 }).map(
  (_, index) => {
    // 隨機基礎資料
    const surname = SURNAMES[Math.floor(Math.random() * SURNAMES.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const phone = `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`
    const oldAgent = AGENTS_POOL[Math.floor(Math.random() * AGENTS_POOL.length)]
    const newAgent = AGENTS_POOL[Math.floor(Math.random() * AGENTS_POOL.length)]
    const vip = VIP_LEVELS[Math.floor(Math.random() * VIP_LEVELS.length)]

    // 時間邏輯
    const now = new Date()
    const regDate = getRandomDate(
      new Date(now.getTime() - 1000 * 60 * 60 * 24 * 365),
      now
    ) // 1年內
    const loginDate = getRandomDate(regDate, now) // 註冊後 ~ 現在
    const transferDate = getRandomDate(
      new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30),
      now
    ) // 30天內

    return {
      key: (index + 1).toString(),
      transferMethod:
        TRANSFER_METHODS[Math.floor(Math.random() * TRANSFER_METHODS.length)],

      oldAgentLevel: `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 3) + 4}`, // e.g. 1/5
      oldAgentName: oldAgent,
      oldMemberAccount: phone, // 換線通常帳號不變，或變更後顯示

      newAgentLevel: `${Math.floor(Math.random() * 5) + 1}/${Math.floor(Math.random() * 3) + 4}`,
      newAgentName: newAgent,
      newMemberAccount: phone,

      memberName: `${surname}${name}`,
      status: Math.random() > 0.1 ? 'active' : 'suspended', // 90% active

      regLoginTime: [formatDateTime(regDate), formatDateTime(loginDate)],
      lastTransferTime: formatSplitTime(transferDate),

      oldPrivilegeLevel: vip,
      newPrivilegeLevel: vip, // 換線後 VIP 通常不變，也可隨機
    }
  }
)

// ==========================================
// 3. 其他 MOCK 資料 (保留原樣)
// ==========================================
export const MOCK_LEVELS: AgentLevelData[] = [
  { label: '1級代理', count: 38 },
  { label: '2級代理', count: 63 },
  { label: '3級代理', count: 88 },
  { label: '4級代理', count: 104 },
  { label: '5級代理', count: 2352 },
  { label: '6級代理', count: 11258 },
  { label: '7級代理', count: 596251 },
  { label: '8級代理', count: 9865235 },
]

export const MOCK_AGENTS: AgentData[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    key: `${i + 1}`,
    name: i === 0 ? 'FMCA2 (主站-股東)' : `代理商測試資料-${i + 1}`,
    system:
      i % 2 === 0 ? '佔成制\n(會員虧損總金額)' : '返水\n(會員總投注總金額)',
    splitName:
      i % 2 === 0
        ? '抽水代理(輸贏下返水) 百家0.7 其他0.5 彩票0'
        : '通用代理0%(成數代理開啟線下代理使用)',
    share: i % 2 === 0 ? 70 : 0,
    settlement: '月結\n(每月最後一天23:59:59)',
  })
)

export const MOCK_MEMBERS: MemberData[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    key: `${i + 1}`,
    tag: i % 3 === 0 ? 'IP黑名單' : '一般會員',
    account: `09${Math.floor(Math.random() * 100000000)}`,
    name: `測試會員${i + 1}`,
    vip: 'VIP1-一般會員',
    status: i === 0 ? '啟用\n(停用託售)' : '啟用',
    wallet: 99999999,
    gameBalance: 99999999,
  })
)
