import type { WalletData } from '../types'

// 設定要生成的資料筆數
const COUNT = 50

// 定義一些樣本資料來隨機挑選
const TYPES = ['優惠活動', '會員返水', '會員託售', '人工存入', '人工提出']
const NAMES = [
  '王大星',
  '李小明',
  '陳志豪',
  '林雅婷',
  '張建國',
  '黃美玲',
  '劉德華',
  '周杰倫',
]
const AGENTS = ['damn1688', 'super_agent', 'money_flow_01', 'test_888']

export const INITIAL_DATA: WalletData[] = Array.from({ length: COUNT }).map(
  (_, index) => {
    // 1. 隨機挑選類型與名稱
    const type = TYPES[Math.floor(Math.random() * TYPES.length)]
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]

    // 2. 判斷是否為扣款類型 (託售、提出為負數)
    const isDeduct = ['會員託售', '人工提出'].includes(type)

    // 3. 隨機生成金額 (100 ~ 5000)
    const rawAmount = Math.floor(Math.random() * 4900) + 100
    const amount = isDeduct ? -rawAmount : rawAmount

    // 4. 隨機生成變動前餘額 (1000 ~ 50000)
    const beforeBalance = Math.floor(Math.random() * 49000) + 1000

    // 5. 計算變動後餘額 (確保邏輯正確)
    const afterBalance = beforeBalance + amount

    return {
      key: `${index + 1}`,
      agentLevel: `1/${Math.floor(Math.random() * 6) + 1} (${Math.floor(Math.random() * 10)})`,
      agentName: agent,
      agentPath: `金流/成數代理-群組A/${agent}`,
      // 隨機生成 09 開頭的手機號碼
      memberAccount: `09${Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, '0')}`,
      memberName: name,
      type: type,
      // 優惠活動通常倍數較高
      multiplier: type === '優惠活動' ? 10 : 1,
      requiredTurnover:
        type === '會員託售' ? 0 : Math.floor(Math.random() * 3000),
      amount: amount,
      beforeBalance: beforeBalance,
      afterBalance: afterBalance,
      // 30% 機率會有備註
      remark: Math.random() > 0.7 ? `${type}-測試備註-${index}` : '',
    }
  }
)
