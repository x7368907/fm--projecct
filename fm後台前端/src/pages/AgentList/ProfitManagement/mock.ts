import type { DataType } from './types'

export const initialData: DataType[] = [
  {
    key: '1',
    agentLevel: '1 / 5 (8)',
    agentName: 'FMCA',
    memberCount: 58,
    agentInfo: { account: '0976061431', name: '王大衛' },
    accountStatus: '啟用',
    profitMode: '佔成制',
    settlementCycle: '月結',
    cycleDate: '2025/05/01 - 2025/05/31',
    betAmount: 50000,
    lossAmount: 50000,
    agentProfit: 45000,
    note: '',
    reviewStatus: '待審核',
  },
  {
    key: '2',
    agentLevel: '1 / 8 (3)',
    agentName: 'test1234',
    memberCount: 9,
    agentInfo: { account: '0976061431', name: '王大衛' },
    accountStatus: '啟用',
    profitMode: '反水制',
    settlementCycle: '週結',
    cycleDate: '2025/05/05 - 2025/05/11',
    betAmount: 20000,
    lossAmount: 20000,
    agentProfit: 14000,
    note: '',
    reviewStatus: '待審核',
  },

  // ⭐⭐⭐ 新增 2 筆「已發放 = 通過」資料 ⭐⭐⭐
  {
    key: 'A1',
    agentLevel: '2 / 5 (4)',
    agentName: 'ApprovedOne',
    memberCount: 88,
    agentInfo: { account: '0912345678', name: '陳雅雯' },
    accountStatus: '啟用',
    profitMode: '佔成制',
    settlementCycle: '月結',
    cycleDate: '2025/04/01 - 2025/04/30',
    betAmount: 60000,
    lossAmount: 60000,
    agentProfit: 48000,
    note: '已確認付款',
    reviewStatus: '通過', // ★ 已發放
  },
  {
    key: 'A2',
    agentLevel: '1 / 4 (2)',
    agentName: 'ApprovedTwo',
    memberCount: 42,
    agentInfo: { account: '0988776655', name: '林惠婷' },
    accountStatus: '啟用',
    profitMode: '反水制',
    settlementCycle: '週結',
    cycleDate: '2025/04/08 - 2025/04/14',
    betAmount: 30000,
    lossAmount: 30000,
    agentProfit: 12000,
    note: '審核通過',
    reviewStatus: '通過', // ★ 已發放
  },

  // ⭐⭐⭐ 新增 2 筆「已拒絕 = 拒絕」資料 ⭐⭐⭐
  {
    key: 'R1',
    agentLevel: '3 / 6 (3)',
    agentName: 'RejectedOne',
    memberCount: 15,
    agentInfo: { account: '0966887744', name: '許建翔' },
    accountStatus: '停用',
    profitMode: '佔成制',
    settlementCycle: '月結',
    cycleDate: '2025/03/01 - 2025/03/31',
    betAmount: 15000,
    lossAmount: 15000,
    agentProfit: 12000,
    note: '資料異常',
    reviewStatus: '拒絕', // ★ 已拒絕
  },
  {
    key: 'R2',
    agentLevel: '2 / 3 (5)',
    agentName: 'RejectedTwo',
    memberCount: 21,
    agentInfo: { account: '0977332211', name: '吳俊豪' },
    accountStatus: '啟用',
    profitMode: '反水制',
    settlementCycle: '週結',
    cycleDate: '2025/03/10 - 2025/03/16',
    betAmount: 25000,
    lossAmount: 25000,
    agentProfit: 10000,
    note: '審核未通過',
    reviewStatus: '拒絕', // ★ 已拒絕
  },

  // ------- 以下為原本的隨機 50 筆資料 -------
  ...Array.from({ length: 50 }).map((_, i) => {
    const idx = i + 3
    const levelPool = ['1 / 5 (8)', '1 / 7 (4)', '2 / 3 (5)', '3 / 6 (3)']
    const agentNames = [
      'FMAG',
      'test5678',
      'AgentA',
      'AgentB',
      'VIP001',
      'TomLee',
    ]
    const namePool = [
      '王大衛',
      '陳小明',
      '張雅婷',
      '林志浩',
      '許家豪',
      '吳小芬',
    ]
    const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

    const month = Math.floor(Math.random() * 12) + 1
    const cycleStart = `2025/${String(month).padStart(2, '0')}/01`
    const cycleEnd = `2025/${String(month).padStart(2, '0')}/28`

    const bet = Math.floor(Math.random() * 80000) + 10000
    const loss = bet
    const profit = Math.floor(bet * 0.8)

    return {
      key: `${idx}`,
      agentLevel: random(levelPool),
      agentName: random(agentNames),
      memberCount: Math.floor(Math.random() * 200) + 1,
      agentInfo: {
        account: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
        name: random(namePool),
      },
      accountStatus: Math.random() > 0.5 ? '啟用' : '停用',
      profitMode: Math.random() > 0.5 ? '佔成制' : '反水制',
      settlementCycle: Math.random() > 0.5 ? '月結' : '週結',
      cycleDate:
        Math.random() > 0.5
          ? `${cycleStart} - ${cycleEnd}`
          : `2025/05/0${Math.floor(Math.random() * 7) + 1} - 2025/05/1${Math.floor(
              Math.random() * 7
            )}`,
      betAmount: bet,
      lossAmount: loss,
      agentProfit: profit,
      note: '',
      reviewStatus: '待審核', // 隨機 50 筆還是以待審核為主
    } as DataType
  }),
]
