import type { RebateDataType } from '../types'

// ==========================================
// 1. 定義隨機資料庫
// ==========================================
const AGENTS = ['damn1688', 'super888', 'agent007', 'money_king', 'test_user']
const NAMES = [
  '陳強強',
  '洪健三',
  '林雅婷',
  '張志豪',
  '李淑芬',
  '王大明',
  '吳冠宇',
  '劉怡君',
  '蔡欣怡',
  '楊宗翰',
]
const TAGS_POOL = [
  'IP黑名單',
  '裝置黑名單',
  '套利疑慮',
  '多重帳號',
  '一般會員',
  'VIP',
  '新會員',
]
const AUDIT_STATUSES = ['時結', '日結', '週結']
const MANAGERS = ['待審核', '已派發', '拒絕', '系統自動派發']

// 遊戲廠商與對應遊戲
const GAME_PROVIDERS = [
  {
    provider: 'ATG',
    type: '電子',
    games: ['戰神塞特', '拳擊之王', '奧林匹斯'],
  },
  {
    provider: 'RSG',
    type: '電子',
    games: ['雷神之錘', '麻將發發發', '開心農場'],
  },
  { provider: 'EVO', type: '真人', games: ['百家樂', '輪盤', '龍虎'] },
  { provider: 'DG', type: '真人', games: ['旗艦百家', '牛牛', '色碟'] },
  {
    provider: 'PM',
    type: '體育',
    games: ['足球-英超', '籃球-NBA', '棒球-MLB'],
  },
]

// 產生隨機時間 (過去 90 天內)
const getRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

// 格式化時間 YYYY/MM/DD HH:mm:ss
const formatTime = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// ==========================================
// 2. 產生 50 筆隨機資料
// ==========================================
export const MOCK_DATA: RebateDataType[] = Array.from({ length: 50 }).map(
  (_, index) => {
    // 1. 隨機基礎資料
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const phone = `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`

    // 2. 隨機標籤 (20% 機率有標籤)
    const hasTag = Math.random() > 0.8
    const tags = hasTag
      ? [TAGS_POOL[Math.floor(Math.random() * TAGS_POOL.length)]]
      : []

    // 3. 隨機遊戲資料
    const providerInfo =
      GAME_PROVIDERS[Math.floor(Math.random() * GAME_PROVIDERS.length)]
    const gameName =
      providerInfo.games[Math.floor(Math.random() * providerInfo.games.length)]

    // 4. 計算金額 (有效投注 100 ~ 50000)
    const validBet = Math.floor(Math.random() * 49900) + 100
    // 返水比例 0.1% ~ 0.8%
    const ratioVal = (Math.random() * 0.7 + 0.1).toFixed(1) // 字串 '0.4'
    // 返水金額 = 投注 * (比例 / 100)
    const rebateAmt = Number(
      (validBet * (parseFloat(ratioVal) / 100)).toFixed(2)
    )

    // 5. 時間邏輯
    const now = new Date()
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setDate(now.getDate() - 90)

    const regDate = getRandomDate(threeMonthsAgo, now)
    // 登入時間一定在註冊之後
    const loginDate = getRandomDate(regDate, now)

    // 返水區間 (固定為昨天的區間)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const returnStart = `${yesterday.getFullYear()}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getDate().toString().padStart(2, '0')} 00:00:00`
    const returnEnd = `${yesterday.getFullYear()}/${(yesterday.getMonth() + 1).toString().padStart(2, '0')}/${yesterday.getDate().toString().padStart(2, '0')} 23:59:59`

    return {
      key: (index + 1).toString(),
      tags: tags,
      agentLevel: `1/${Math.floor(Math.random() * 5) + 1}`,
      agentName: agent,
      memberAccount: phone,
      memberName: name,
      status: Math.random() > 0.1 ? '啟用' : '停用', // 90% 啟用
      auditStatus:
        AUDIT_STATUSES[Math.floor(Math.random() * AUDIT_STATUSES.length)],
      regTime: formatTime(regDate),
      loginTime: formatTime(loginDate),
      provider: providerInfo.provider,
      gameType: providerInfo.type,
      validBet: validBet,
      rebateRatio: ratioVal,
      rebateAmount: rebateAmt,
      manager: MANAGERS[Math.floor(Math.random() * MANAGERS.length)],
      gameName: gameName,
      returnWaterTimeEnd: returnEnd,
      returnWaterTimeStart: returnStart,
    }
  }
)
