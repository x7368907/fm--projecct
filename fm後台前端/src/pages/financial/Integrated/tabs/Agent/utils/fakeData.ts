import type { DataType } from '../types'

// 設定生成筆數
const COUNT = 25

// 輔助陣列
const AGENT_NAMES = [
  'FMCA (金流/成數代理-主站)',
  'XOUT (金流/成數代理-外單位)',
  'SUPER (超級代理)',
  'TEST (測試代理)',
  'WIN88 (發發發代理)',
  'LUCKY (幸運代理)',
  'AGENT01 (一般代理)',
]

export const MOCK_DATA: DataType[] = Array.from({ length: COUNT }).map(
  (_, index) => {
    // 1. 先隨機生成「會員人數」
    const memberCount = Math.floor(Math.random() * 50) + 50

    // 2. 隨機生成「最高代理級別」 (例如 3 ~ 9)
    const maxLevel = Math.floor(Math.random() * 7) + 3

    // 3. 組合字串： "當前級別 / 最高級別 (會員數)"
    // 假設當前視角都是 "1級"，若有變動也可設變數
    const currentLevel = 1
    const agentLevelStr = `${currentLevel} / ${maxLevel} (${memberCount})`

    // 4. 生成其他金額數據
    const betCount = Math.floor(memberCount * (Math.random() * 50 + 10))
    const betAmount = betCount * Math.floor(Math.random() * 500 + 100)
    const validBetAmount = Math.floor(betAmount * 0.98)

    // 簡單模擬輸贏與淨利邏輯
    const isWin = Math.random() > 0.6 // 40% 機率代理賺錢(會員輸)
    const winAmount = Math.floor(validBetAmount * (Math.random() * 0.05))
    const lossAmount = isWin
      ? -Math.floor(validBetAmount * (Math.random() * 0.1))
      : Math.floor(validBetAmount * 0.02)

    // 成本計算
    const rebate = Math.floor(validBetAmount * 0.003)
    const discount = Math.floor(Math.random() * 50000)
    const cost = Math.floor(Math.random() * 10000)
    const commission = Math.floor(Math.abs(lossAmount) * 0.1)
    const gameFee = Math.floor(validBetAmount * 0.0005)

    return {
      key: (index + 1).toString(),

      // ★ 這裡就是你要的連動邏輯
      agentLevel: agentLevelStr,

      agentName: AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)],
      commissionMode: Math.random() > 0.5 ? '佔成制' : '返水制',

      memberCount: memberCount,

      betCount,
      betAmount,
      validBetAmount,
      winAmount,
      lossAmount,
      deposit: Math.floor(betAmount * 0.3),
      withdraw: Math.floor(betAmount * 0.2),
      rebate,
      discount,
      cost,
      commission,
      gameFee,
    }
  }
)
