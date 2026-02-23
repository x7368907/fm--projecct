import type { ChangeLineDataType, AgentData, LevelData } from './types'
export const MOCK_DATA: ChangeLineDataType[] = Array.from({ length: 60 }).map(
  (_, i) => ({
    key: i,
    sourceLevel: '4/5',
    memberCount: 23,
    sourceAgentName: 'yaya520',
    sourceAgentRealName: '金池/成數代理-外代-yaya',
    upperLevel: '2/5',
    upperAgentName: 'FMCA2\n(主站-總代)',

    profitSetting: [
      {
        type: '反水',
        detail: '(總投注額回饋)',
        val: '抽水代理(無下退水) 返水:0.6 總彩:0.5 彩票:0',
      },
      {
        type: '反水',
        detail: '(總投注額回饋)',
        val: '抽水代理(無下退水) 返水: 真人1 其他0.5 彩票0',
      },
    ],

    /** ✅ 分潤名稱（不要再寫死） */
    profitName: '抽水代理(無績效退水)',
    profitSystems: [
      {
        title: '反水制',
        detail: '(總投注額回饋)',
      },
      {
        title: '反水制',
        detail: '(總投注額回饋)',
      },
    ],
    profitCycles: [
      {
        title: '週結',
        detail: '(每週日-23:59:59)',
      },
      {
        title: '月結',
        detail: '(每月最後一天-23:59:59)',
      },
    ],

    changeDate: '2025/04/05\n12:59:58',
    handler: 'Admin',
  })
)

export const CREATE_MOCK_DATA: AgentData[] = Array.from({ length: 6 }).map(
  (_, i) => ({
    key: i,
    name: `代理名稱範例-${i}`,
    realName: `金池/成數代理-範例-${i}`,
    profitSystem: i % 2 === 0 ? '反水制\n(總投注額回饋)' : '佔成制',
    profitName:
      i % 2 === 0 ? '抽水代理(無下退水) 返水:0.7 其他:0.5' : '通用代理90%',

    cycle: '月結\n(每月最後天-23:59:59)',
    memberCount: Math.floor(Math.random() * 100),
  })
)

export const LEVEL_MOCK_DATA: LevelData[] = [
  { label: '1級總代理', count: 23 },
  { label: '2級代理', count: 56 },
  { label: '3級代理', count: 97 },
  { label: '4級代理', count: 104, active: true },
  { label: '5級代理', count: 2536 },
  { label: '6級代理', count: 3256 },
  { label: '7級代理', count: 1556 },
  { label: '8級代理', count: 2236 },
]
