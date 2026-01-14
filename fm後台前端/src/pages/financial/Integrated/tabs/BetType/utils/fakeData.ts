import type { BetTypeDataType } from '../types'

// 輔助資料陣列
const AGENTS = [
  'FMCA (金流/成數代理-主站)',
  'XOUT (金流/成數代理-外單位)',
  'SUPER (超級代理)',
  'TEST (測試代理)',
  'WIN88 (發發發代理)',
  'LUCKY (幸運代理)',
  'AGENT01 (一般代理)',
]
const NAMES = [
  '馬佩琳',
  '林哲賢',
  '陳志豪',
  '黃雅婷',
  '李怡君',
  '張建國',
  '王淑芬',
  '劉俊傑',
  '吳欣怡',
  '蔡志明',
  '楊宗翰',
  '許美麗',
  '鄭光輝',
  '謝小雨',
  '郭大華',
]
const VIP_LEVELS = [
  'VIP1-一般會員',
  'VIP2-黃金會員',
  'VIP3-白金會員',
  'VIP4-鑽石會員',
  'VIP5-至尊會員',
]

export const MOCK_DATA: BetTypeDataType[] = Array.from({ length: 25 }).map(
  (_, index) => {
    // 1. 隨機生成各類別筆數
    const liveBetCount = Math.floor(Math.random() * 50)
    const slotBetCount = Math.floor(Math.random() * 100)
    const sportBetCount = Math.floor(Math.random() * 30)
    const lotteryBetCount = Math.floor(Math.random() * 40)
    const chessBetCount = Math.floor(Math.random() * 20)
    const fishBetCount = Math.floor(Math.random() * 20)

    // 計算總筆數
    const betCount =
      liveBetCount +
      slotBetCount +
      sportBetCount +
      lotteryBetCount +
      chessBetCount +
      fishBetCount

    // 2. 隨機生成各類別金額 (平均每筆 100~2000 不等)
    const liveValidBet = liveBetCount * Math.floor(Math.random() * 1000 + 100)
    const slotValidBet = slotBetCount * Math.floor(Math.random() * 500 + 50)
    const sportValidBet = sportBetCount * Math.floor(Math.random() * 2000 + 200)
    const lotteryValidBet =
      lotteryBetCount * Math.floor(Math.random() * 300 + 50)
    const chessValidBet = chessBetCount * Math.floor(Math.random() * 400 + 100)
    const fishValidBet = fishBetCount * Math.floor(Math.random() * 200 + 50)

    // 計算總投注額
    const totalValidBet =
      liveValidBet +
      slotValidBet +
      sportValidBet +
      lotteryValidBet +
      chessValidBet +
      fishValidBet

    // 3. 模擬輸贏 (RTP 約 95% ~ 105% 浮動)
    // 假設 winAmount 是會員贏的錢 (派彩), lossAmount 是會員輸的錢 (或是淨損益，這邊模擬絕對值)
    // 這裡簡單模擬：winAmount 為總投注的 0~1.5倍
    const winAmount = Math.floor(totalValidBet * (Math.random() * 1.5))
    // lossAmount 簡單設為投注額的一小部分作為手續費或淨輸值 (僅為模擬數據)
    const lossAmount = Math.floor(totalValidBet * 0.1)

    return {
      key: (index + 1).toString(),
      agentLevel: `1 / ${Math.floor(Math.random() * 6) + 3} (${Math.floor(Math.random() * 50) + 1})`,
      agentName: AGENTS[Math.floor(Math.random() * AGENTS.length)],
      memberName: NAMES[Math.floor(Math.random() * NAMES.length)],
      vipLevel: VIP_LEVELS[Math.floor(Math.random() * VIP_LEVELS.length)],

      // 總筆數
      betCount,

      // 筆數細項
      liveBetCount,
      slotBetCount,
      sportBetCount,
      lotteryBetCount,
      chessBetCount,
      fishBetCount,

      // 金額細項
      liveValidBet,
      slotValidBet,
      sportValidBet,
      lotteryValidBet,
      chessValidBet,
      fishValidBet,

      // 總金額
      totalValidBet,

      // 財務數據
      winAmount,
      lossAmount,
      accountBalance: Math.floor(Math.random() * 500000),
      gameBalance: Math.floor(Math.random() * 1000),
    }
  }
)
