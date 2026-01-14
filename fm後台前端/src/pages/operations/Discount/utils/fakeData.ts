import type { DiscountDataType } from '../types'

const CREATORS = ['張短瑞', '陳小美', '林阿豪', '王大明', 'Admin', 'System']
// const STATUSES = ['即將開始', '進行中', '已結束', '暫停']
const WALLETS = ['站內償', '會員錢包']

// 設定不同類別的特徵
const CATEGORY_CONFIGS = [
  {
    category: '特權',
    names: [
      'VIP2 儲值回饋',
      'VIP3 晉級禮金',
      'VIP4 保級獎勵',
      '生日禮金 888',
      '週末特權加碼',
    ],
    defaultApply: '前台-會員手動',
    defaultTiming: '月結',
  },
  {
    category: '優惠',
    names: [
      '首儲10%',
      '二儲5% 回饋',
      '跳槽金',
      '天天返水 0.8%',
      '電子遊戲專屬優惠',
    ],
    defaultApply: '系統自動',
    defaultTiming: '即時',
  },
  {
    category: '紅包',
    names: [
      '代理紅包',
      '新年開運紅包',
      '端午節加菜金',
      '系統維護補償',
      '線下活動獎勵',
    ],
    defaultApply: '後台-代理手動',
    defaultTiming: '即時',
  },
]

// 隨機數 Helper
const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// =================================================================
// 生成 25 筆資料
// =================================================================
export const INITIAL_DATA: DiscountDataType[] = Array.from({ length: 25 }).map(
  (_, index) => {
    // 1. 隨機決定類別
    const config = getRandom(CATEGORY_CONFIGS)
    const name = getRandom(config.names)

    // 2. 決定金額模式 (紅包通常是定額，其他通常是公式)
    const isFixed = config.category === '紅包'
    const fixedAmount = isFixed ? getRandomInt(100, 5000) : 0
    const formula = isFixed ? '0' : `儲值金額 * ${getRandomInt(1, 10)}%`

    // 3. 隨機日期 (2025年內)
    const startMonth = getRandomInt(1, 6)
    const endMonth = getRandomInt(7, 12)
    const periodStart = `2025-${startMonth.toString().padStart(2, '0')}-01`
    const periodEnd = `2025-${endMonth.toString().padStart(2, '0')}-30`

    // 4. 狀態權重 (讓 '進行中' 出現機率高一點)
    const statusRoll = Math.random()
    let status = '進行中'
    if (statusRoll < 0.1) status = '即將開始'
    else if (statusRoll < 0.2) status = '已結束'
    else if (statusRoll < 0.3) status = '暫停'

    return {
      key: (index + 1).toString(),
      category: config.category,
      name: name,
      creator: getRandom(CREATORS),
      timing: Math.random() > 0.3 ? config.defaultTiming : '週結', // 偶爾出現不同結算

      fixedAmount,
      formula,

      requiredFlow: getRandomInt(0, 20) * 1000, // 0 ~ 20000 流水
      applyMethod: Math.random() > 0.2 ? config.defaultApply : '後台-人工審核',
      wallet: getRandom(WALLETS),

      periodStart,
      periodEnd,

      status,
      limitPerUser: Math.random() > 0.8 ? 9999 : getRandomInt(1, 5), // 20% 機率無限次
      totalUsage: getRandomInt(0, 500),

      note:
        config.category === '紅包'
          ? '(後台專用) 線下代理私派，代理100%承擔'
          : `(測試資料) ${name} 活動說明...`,
    }
  }
)
