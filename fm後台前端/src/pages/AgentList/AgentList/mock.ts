import type { DataType } from './types'

const MAX_LEVEL = 5
const ROOT_COUNT = 3 // 1 級代理數量
const CHILD_RANGE = [1, 3] // 每層最多子代理數

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

let id = 1

export const MOCK_DATA: DataType[] = []

function createAgent(level: number, parentKey: string | null): DataType {
  const key = String(id++)
  const childCount =
    level < MAX_LEVEL ? random(CHILD_RANGE[0], CHILD_RANGE[1]) : 0

  return {
    key,
    parentKey,
    currentLevel: level,
    maxLevel: MAX_LEVEL,
    childCount,
    id,
    name: `agent_${key}`,
    account: `09${random(10000000, 99999999)}`,
    realName: randomFrom(['王大尾', '林測試', '張代理', '陳小明']),
    memberCount: random(0, 300),

    status: randomFrom(['啟用', '停用']),
    cashGroup: '常規會員',

    registerTime: '2025/04/05 12:59:49',
    lastLoginTime: '2025/05/20 13:48:39',

    profitSystem: randomFrom(['佔成制', '反水制']),
    profitRate: randomFrom([90, 0.4]),

    liveRate: 0,
    slotRate: 0,
    sportRate: 0,
    lotteryRate: 0,
    chessRate: 0,
    fishRate: 0,

    settlement: '週結',
  }
}

// 🌳 遞迴產生樹狀代理
function generate(level: number, parentKey: string | null) {
  const count = level === 1 ? ROOT_COUNT : random(1, 3)

  for (let i = 0; i < count; i++) {
    const agent = createAgent(level, parentKey)
    MOCK_DATA.push(agent)

    if (agent.childCount > 0) {
      generate(level + 1, agent.key)
    }
  }
}

// 🚀 初始化
generate(1, null)
