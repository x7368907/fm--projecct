import type { DataType } from '../types'

// 輔助函式：產生帶有千分位的字串
const fmt = (num: number) => num.toLocaleString()

export const MOCK_DATA: DataType[] = Array.from({ length: 25 }).map((_, i) => {
  // VIP0 (遊客) 特殊處理
  if (i === 0) {
    return {
      key: '1',
      no: 1,
      type: 'VIP0-遊客',
      depositReq: '-',
      validBet: '-',
      validBetUpgrade: '-',
      upgradeBonus: '-',
      rebateRatio: 0,
      birthdayBonus: 88,
      dailyWithdrawCount: 0,
      dailyWithdrawLimit: '-',
      live_h: 0.3,
      live_d: 0.3,
      live_w: 0.3,
      elec_h: 0.3,
      elec_d: 0.3,
      elec_w: 0.3,
      sport_h: 0.2,
      sport_d: 0.2,
      sport_w: 0.2,
      lottery_h: 0,
      lottery_d: 0,
      lottery_w: 0,
      card_h: 0.3,
      card_d: 0.3,
      card_w: 0.3,
      fish_h: 0.3,
      fish_d: 0.3,
      fish_w: 0.3,
    }
  }

  // VIP1 ~ VIP24 計算邏輯
  const level = i // 1 ~ 24
  const baseDeposit = 100000
  const baseBet = 200000

  // 計算數值 (隨等級增加)
  const depositReq = baseDeposit * level * 1.5
  const validBet = baseBet * level
  const validBetUpgrade = validBet * 1.2
  const upgradeBonus = 188 + level * 100
  const birthdayBonus = 168 + level * 200
  const rebateRatio = parseFloat((0.1 + level * 0.1).toFixed(1)) // 模擬返水比例上限
  const dailyWithdrawCount = 3 + Math.floor(level / 3)
  const dailyWithdrawLimit = 200000 + level * 100000

  // 模擬各遊戲返水 (微幅遞增，上限約 1.2% ~ 2.0%)
  const live = parseFloat(Math.min(0.5 + level * 0.02, 1.0).toFixed(2))
  const elec = parseFloat(Math.min(0.6 + level * 0.03, 1.5).toFixed(2)) // 電子通常較高
  const sport = parseFloat(Math.min(0.3 + level * 0.02, 0.8).toFixed(2))
  const card = parseFloat(Math.min(0.5 + level * 0.02, 1.0).toFixed(2))
  const fish = parseFloat(Math.min(0.5 + level * 0.02, 1.0).toFixed(2))
  const lottery = 0 // 彩票通常無返水

  // 名稱邏輯
  let typeName = `VIP${level}`
  if (level <= 5) typeName += '-一般會員'
  else if (level <= 10) typeName += '-黃金會員'
  else if (level <= 15) typeName += '-白金會員'
  else if (level <= 20) typeName += '-鑽石會員'
  else typeName += '-至尊會員'

  return {
    key: (i + 1).toString(),
    no: i + 1,
    type: typeName,
    depositReq: fmt(depositReq),
    validBet: fmt(validBet),
    validBetUpgrade: fmt(validBetUpgrade),
    upgradeBonus: upgradeBonus,
    rebateRatio: rebateRatio > 3 ? 3 : rebateRatio, // 限制顯示上限
    birthdayBonus: birthdayBonus,
    dailyWithdrawCount: dailyWithdrawCount,
    dailyWithdrawLimit: fmt(dailyWithdrawLimit),

    // 真人
    live_h: live,
    live_d: live,
    live_w: live,
    // 電子
    elec_h: elec,
    elec_d: elec,
    elec_w: elec,
    // 體育
    sport_h: sport,
    sport_d: sport,
    sport_w: sport,
    // 彩票
    lottery_h: lottery,
    lottery_d: lottery,
    lottery_w: lottery,
    // 棋牌
    card_h: card,
    card_d: card,
    card_w: card,
    // 捕魚
    fish_h: fish,
    fish_d: fish,
    fish_w: fish,
  }
})
