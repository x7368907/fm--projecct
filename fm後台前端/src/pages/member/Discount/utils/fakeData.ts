import type { DiscountDataType, BonusItem, MemberItem } from '../types'

// ==========================================
// Helper: 資料庫與隨機工具
// ==========================================
const NAMES = [
  '陳湘琳',
  '洪健亞',
  '王小明',
  '李雅婷',
  '張偉',
  '林志豪',
  '楊淑芬',
  '黃俊傑',
  '劉家豪',
  '吳欣怡',
  '蔡志明',
  '許美麗',
  '鄭光輝',
  '謝小雨',
  '郭大華',
]
const AGENTS = [
  { level: '1 / 5', name: 'damn1688\n((金流/成數代理-頭長&陳陳)damn1688)' },
  { level: '2 / 5', name: 'super888\n((金流-總公司)super888)' },
  { level: '1 / 4', name: 'agent007\n((成數代理-外部)agent007)' },
  { level: '3 / 6', name: 'money_king\n((股東-內撥)money_king)' },
]
const PRIVILEGES = [
  'VIP0-遊客',
  'VIP1-一般會員',
  'VIP2-BOK會員',
  'VIP3-青銅會員',
  'VIP4-白銀會員',
  'VIP5-黃金會員',
]
const DISCOUNT_TYPES = [
  {
    type: '特權',
    name: 'VIP2儲值回饋',
    remark: '(後台專用)每個等級僅能領一次',
  },
  { type: '優惠', name: '首儲10%', remark: '(前台)首儲優惠活動' },
  { type: '紅包', name: '代理線下派發', remark: '代理自行承擔' },
  { type: '補償', name: '系統異常補償', remark: '技術部申請' },
  { type: '活動', name: '端午節加碼', remark: '節日活動' },
]

// 產生隨機時間字串 (格式: YYYY/MM/DD\nHH:mm:ss)
const getRandomDate = (offsetDays: number = 0) => {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 30) - offsetDays)
  date.setHours(
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60),
    Math.floor(Math.random() * 60)
  )

  // 轉為 YYYY/MM/DD
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '/')
  // 轉為 HH:mm:ss
  const timeStr = date.toTimeString().split(' ')[0]

  return `${dateStr}\n${timeStr}`
}

// ==========================================
// 1. 列表頁面 (MemberDiscount) 使用的模擬資料 (50筆)
// ==========================================
export const MOCK_DATA: DiscountDataType[] = Array.from({ length: 50 }).map(
  (_, index) => {
    // 隨機基礎資料
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    const discountInfo =
      DISCOUNT_TYPES[Math.floor(Math.random() * DISCOUNT_TYPES.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const phone = `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`

    // 隨機金額 (100 ~ 5000)
    const amount = Math.floor(Math.random() * 49) * 100 + 100
    // 流水要求 (0 或 1倍 或 10倍)
    const turnover =
      Math.random() > 0.5 ? 0 : amount * (Math.random() > 0.8 ? 10 : 1)

    // 決定審核狀態 (前10筆待審核，中間30筆通過，後10筆拒絕)
    let auditStatus = 'pending'
    let auditTime = ''

    // 申請時間
    const applyTime = getRandomDate(2) // 2天前的隨機時間

    if (index >= 10 && index < 40) {
      auditStatus = 'active' // 通過
      auditTime = getRandomDate(0) // 較新的時間
    } else if (index >= 40) {
      auditStatus = 'rejected' // 拒絕
      auditTime = getRandomDate(0)
    }

    return {
      key: (index + 1).toString(),
      agentLevel: agent.level,
      agentName: agent.name,
      memberAccount: phone,
      memberName: name,
      accountStatus: Math.random() > 0.1 ? 'active' : 'disabled', // 90% 帳號啟用
      privilege: PRIVILEGES[Math.floor(Math.random() * PRIVILEGES.length)],
      discountType: discountInfo.type,
      discountName: `${discountInfo.name}\n建立者:admin`,
      bonusAmount: amount,
      turnoverReq: turnover,
      withdrawCount: `${Math.random() > 0.8 ? 1 : 0} / 1`,
      applyMethod: Math.random() > 0.5 ? '前台-會員手動' : '後台-代理申請',
      collectionMethod: Math.random() > 0.5 ? '站內信' : '自動派發',
      applyTime: applyTime,
      auditTime: auditTime,
      remark: discountInfo.remark,
      auditStatus: auditStatus,
    }
  }
)

// ==========================================
// 2. 新增頁面 (BonusCreate) 使用的模擬資料
// ==========================================
export const BONUS_DATA: BonusItem[] = [
  {
    key: '1',
    name: '線下體驗金-168',
    points: 168,
    method: '後台-營運手動申請',
    distribute: '站內信',
    turnover: 0,
    remark: '(後台專用)VIP2-bok會員儲值回饋金',
  },
  {
    key: '2',
    name: '線下體驗金-268',
    points: 268,
    method: '後台-營運手動申請',
    distribute: '站內信',
    turnover: 0,
    remark: '(後台專用)VIP3-青銅會員儲值回饋金',
  },
  {
    key: '3',
    name: '代理紅包',
    points: 5000,
    method: '後台-代理手動申請',
    distribute: '站內信',
    turnover: 0,
    remark: '(後台專用)VIP4-白銀會員儲值回饋金',
  },
  {
    key: '4',
    name: '週年慶大紅包',
    points: 8888,
    method: '後台-營運手動申請',
    distribute: '自動派發',
    turnover: 8888,
    remark: '週年慶活動專用',
  },
  {
    key: '5',
    name: '補償金',
    points: 100,
    method: '後台-技術補償',
    distribute: '站內信',
    turnover: 0,
    remark: '系統維修補償',
  },
]

// 為了符合型別，給一個空陣列或預設值
export const MEMBER_DATA: MemberItem[] = []
