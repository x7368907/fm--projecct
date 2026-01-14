import type { PrivilegeDataType } from '../types'

// ==========================================
// 1. 定義隨機資料庫與設定
// ==========================================
const SURNAMES = [
  '林',
  '陳',
  '張',
  '黃',
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
  '豪豪',
  '雨琳',
  '志明',
  '雅婷',
  '宗翰',
  '淑芬',
  '家豪',
  '欣怡',
  '冠宇',
  '心愛',
  '承恩',
  '依婷',
  '俊傑',
  '佩珊',
]
const VIP_CONFIGS = [
  {
    level: 'VIP0-普通',
    baseTarget: 0,
    rebate: '-',
    bonus: '-',
    consignTotal: 5,
  },
  {
    level: 'VIP1-一般會員',
    baseTarget: 100000,
    rebate: 0.3,
    bonus: 168,
    consignTotal: 10,
  },
  {
    level: 'VIP2-黃金會員',
    baseTarget: 500000,
    rebate: 0.4,
    bonus: 588,
    consignTotal: 15,
  },
  {
    level: 'VIP3-白金會員',
    baseTarget: 1000000,
    rebate: 0.5,
    bonus: 1288,
    consignTotal: 20,
  },
  {
    level: 'VIP4-鑽石會員',
    baseTarget: 3000000,
    rebate: 0.6,
    bonus: 3888,
    consignTotal: 30,
  },
  {
    level: 'VIP5-至尊會員',
    baseTarget: 5000000,
    rebate: 0.8,
    bonus: 8888,
    consignTotal: 50,
  },
]

// 產生隨機進度物件
const getProgress = (target: number) => {
  if (target === 0) return { current: 0, target: 0 }
  const current = Math.floor(Math.random() * target)
  return { current, target }
}

// 產生隨機返水物件
const getRebateObj = (
  baseRate: number | string,
  type: 'lottery' | 'normal'
) => {
  if (baseRate === '-') return { hour: '-', day: '-', week: '-' }

  // 彩票通常返水較低或沒有，這裡做個隨機處理
  if (type === 'lottery') return { hour: '-', day: '-', week: '-' }

  // 正常遊戲返水
  return {
    hour: baseRate,
    day: baseRate,
    week: baseRate,
  }
}

// ==========================================
// 2. 隨機生成 50 筆資料
// ==========================================
export const MOCK_DATA: PrivilegeDataType[] = Array.from({ length: 50 }).map(
  (_, index) => {
    // 1. 隨機挑選 VIP 設定
    // 權重分配：VIP0~1 (40%), VIP2~3 (40%), VIP4~5 (20%)
    const rand = Math.random()
    let vipIndex = 0
    if (rand > 0.8)
      vipIndex = Math.floor(Math.random() * 2) + 4 // 4,5
    else if (rand > 0.4)
      vipIndex = Math.floor(Math.random() * 2) + 2 // 2,3
    else vipIndex = Math.floor(Math.random() * 2) // 0,1

    const config = VIP_CONFIGS[vipIndex]

    // 2. 基本資料
    const name = `${SURNAMES[Math.floor(Math.random() * SURNAMES.length)]}${NAMES[Math.floor(Math.random() * NAMES.length)]}`
    const account = `09${Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')}`

    // 3. 託售次數 (已用/總共)
    const usedConsign = Math.floor(Math.random() * config.consignTotal)

    // 4. 紅利與禮金 (VIP0 為 '-', 其他為數字)
    const isVip0 = config.level === 'VIP0-普通'
    const upgradeBonus = isVip0 ? '-' : config.bonus
    const topUpBonus = isVip0 ? '-' : 100
    const birthDateBonus = isVip0 ? '-' : 88

    return {
      key: (index + 1).toString(),
      vipLevel: config.level,
      account: account,
      name: name,
      status: Math.random() > 0.05 ? 'enable' : 'disable', // 95% 啟用

      // 進度條邏輯
      depositProgress: getProgress(config.baseTarget),
      bettingProgress: getProgress(config.baseTarget * 2), // 投注目標通常比存款高
      updateProgress: getProgress(config.baseTarget / 10), // 保級目標通常較低
      consignmentProgress: getProgress(10000 * (vipIndex + 1)), // 託售額度隨等級提升

      // 紅利資訊
      upgradeBonus: upgradeBonus,
      topUpBonus: topUpBonus,
      birthDateBonus: birthDateBonus,

      // 託售次數
      consignment: usedConsign,
      totalConsignment: config.consignTotal,

      // 返水設定
      rebates: {
        electronic: getRebateObj(config.rebate, 'normal'),
        live: getRebateObj(config.rebate, 'normal'),
        chess: getRebateObj(config.rebate, 'normal'),
        lottery: getRebateObj(config.rebate, 'lottery'), // 彩票特別處理
        sports: getRebateObj(
          typeof config.rebate === 'number'
            ? Number((config.rebate - 0.1).toFixed(1))
            : '-',
          'normal'
        ), // 體育通常比電子低一點
      },
    }
  }
)
