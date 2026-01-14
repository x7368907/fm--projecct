import type { AnnounceDataType } from '../types'

// =================================================================
// 輔助函式與常數 (用於隨機生成)
// =================================================================
const CREATORS = [
  '張經理',
  '李主任',
  '王小美',
  '陳大文',
  '系統管理員',
  '林阿豪',
]
const STATUSES = ['進行中', '準備開始', '結束', '強迫結束']

const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const getRandomDate = (startYear = 2024, endYear = 2026) => {
  const year = getRandomInt(startYear, endYear)
  const month = getRandomInt(1, 12).toString().padStart(2, '0')
  const day = getRandomInt(1, 28).toString().padStart(2, '0')
  const hour = getRandomInt(0, 23).toString().padStart(2, '0')
  const minute = getRandomInt(0, 59).toString().padStart(2, '0')
  const second = getRandomInt(0, 59).toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// =================================================================
// 1. ACTIVITY_DATA (活動公告 - 25筆)
// =================================================================
const ACTIVITY_NAMES = [
  {
    繁: '新會員首儲好禮大放送',
    簡: '新会员首储好礼大放送',
    英: 'New Member First Deposit Bonus',
  },
  {
    繁: '週末狂歡，紅利加倍送',
    簡: '周末狂欢，红利加倍送',
    英: 'Weekend Bonus Double Up',
  },
  {
    繁: 'VIP 專屬尊榮禮包',
    簡: 'VIP 专属尊荣礼包',
    英: 'VIP Exclusive Gift Package',
  },
  {
    繁: '中秋佳節，月圓人團圓禮金',
    簡: '中秋佳节，月圆人团圆礼金',
    英: 'Moon Festival Bonus',
  },
  {
    繁: '幸運輪盤，天天抽 iPhone',
    簡: '幸运轮盘，天天抽 iPhone',
    英: 'Lucky Wheel Win iPhone',
  },
  {
    繁: '老虎機爭霸戰，百萬獎金等你拿',
    簡: '老虎机争霸战，百万奖金等你拿',
    英: 'Slot Machine Tournament',
  },
  {
    繁: '好友推薦賞，一起發大財',
    簡: '好友推荐赏，一起发大财',
    英: 'Refer a Friend Bonus',
  },
  {
    繁: '每日簽到，領取免費籌碼',
    簡: '每日签到，领取免费筹码',
    英: 'Daily Check-in Free Chips',
  },
  {
    繁: '輸錢救援金，助你東山再起',
    簡: '输钱救援金，助你东山再起',
    英: 'Loss Rescue Bonus',
  },
  {
    繁: '百家樂連贏挑戰賽',
    簡: '百家乐连赢挑战赛',
    英: 'Baccarat Winning Streak Challenge',
  },
]

export const ACTIVITY_DATA: AnnounceDataType[] = Array.from({ length: 25 }).map(
  (_, i) => {
    const nameObj = getRandom(ACTIVITY_NAMES)
    const startTime = getRandomDate(2025, 2025)

    return {
      key: (i + 1).toString(),
      activityType: getRandom(['人工審核', '系統機制', '自動派發']),
      category: getRandom([
        '儲值禮',
        '註冊禮',
        'VIP禮包',
        '救援金',
        '返水優惠',
      ]),
      type: getRandom(['儲值禮', '紅利贈送', '實體獎品']),
      name: nameObj.繁,
      names: nameObj,
      creator: getRandom(CREATORS),
      announceTime: getRandomDate(2024, 2025),
      startTime: startTime,
      endTime: getRandomDate(2026, 2027), // 結束時間晚於開始
      status: getRandom(STATUSES),
      factoryDisabled: Math.random() > 0.8, // 20% 機率停用
      pageClicks: getRandomInt(100, 50000),
      linkClicks: getRandomInt(50, 30000),
    }
  }
)

// =================================================================
// 2. SYSTEM_DATA (系統公告 - 25筆)
// =================================================================
const SYSTEM_TITLES = [
  '【維護通知】台灣ATM儲值系統維護',
  '【系統升級】全站服務器優化作業',
  '【緊急通知】USDT 通道臨時維護',
  '【重要公告】會員條款更新通知',
  '【防詐騙宣導】請勿輕信非官方來源訊息',
  '【線路調整】部分地區連線優化',
  '【維護通知】超商代碼繳費系統維護',
  '【功能更新】APP 版本強制更新通知',
  '【系統公告】每週例行性維護通知',
  '【資安升級】登入兩步驟驗證功能上線',
]

export const SYSTEM_DATA: AnnounceDataType[] = Array.from({ length: 25 }).map(
  (_, i) => {
    const title = getRandom(SYSTEM_TITLES)
    const start = getRandomDate(2025, 2025)

    // 系統維護通常比較短，這裡簡單模擬
    return {
      key: (i + 1).toString(),
      activityType: '系統公告',
      name: title,
      creator: getRandom(CREATORS),
      announceTime: getRandomDate(2025, 2025),
      startTime: start,
      endTime: start.replace(
        /(\d{2}):(\d{2})/,
        (_, h, m) => `${(parseInt(h) + 2) % 24}:${m}`
      ), // 簡單加2小時
      status: getRandom(['進行中', '結束']),
      factoryDisabled: Math.random() > 0.9,
    }
  }
)

// =================================================================
// 3. GAME_DATA (遊戲公告 - 25筆)
// =================================================================
const GAME_TITLES = [
  { 繁: '【維護通知】BT捕魚臨時維護', 英: '[Maintenance] BT Fishing' },
  { 繁: '【新遊戲上線】雷神之鎚強勢登場', 英: '[New Game] Thor is coming' },
  { 繁: '【維護通知】RSG電子全館維護', 英: '[Maintenance] RSG Slot' },
  { 繁: '【異常補償】DG真人視訊延遲補償', 英: '[Compensation] DG Live Lag' },
  { 繁: '【維護通知】EVO真人例行維護', 英: '[Maintenance] EVO Live' },
  { 繁: '【新功能】體育博彩新增串關功能', 英: '[Feature] Sports Parlay' },
  { 繁: '【下架通知】水果盤遊戲即將下架', 英: '[Notice] Fruit Slot Removal' },
  { 繁: '【維護通知】JDB電子臨時維護', 英: '[Maintenance] JDB Slot' },
  { 繁: '【熱門推薦】百萬大獎等你來拿', 英: '[Hot] Million Jackpot' },
  { 繁: '【維護通知】OB體育盤口調整', 英: '[Maintenance] OB Sports' },
]

export const GAME_DATA: AnnounceDataType[] = Array.from({ length: 25 }).map(
  (_, i) => {
    const nameObj = getRandom(GAME_TITLES)
    const start = getRandomDate(2025, 2025)

    return {
      key: (i + 1).toString(),
      activityType: '遊戲公告',
      name: nameObj.繁,
      names: { 繁: nameObj.繁, 英: nameObj.英 },
      creator: getRandom(CREATORS),
      announceTime: getRandomDate(2025, 2025),
      startTime: start,
      endTime: getRandomDate(2026, 2026),
      status: getRandom(STATUSES),
      factoryDisabled: Math.random() > 0.9,
    }
  }
)
