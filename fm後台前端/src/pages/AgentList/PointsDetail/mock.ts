import type { PointsRecord, LevelData, AccountData } from './types'

export const MOCK_DATA: PointsRecord[] = Array.from({ length: 100 }).map(
  (_, i) => ({
    key: `${i}`,
    type: i % 2 === 0 ? '獎勵點數發放' : '獎勵點數回收',
    issuingLevel: `1/${4 + i} (8)`,
    issuingAgentName: 'FMCA (金哥/成數代理-主站)',
    issuingAgent: '張大媽',
    issuingBalance: {
      change: i % 2 === 0 ? -2000 : 2000,
      before: '5,213,594',
      after: '5,211,594',
    },
    receivingLevel: `2/${4 + i} (3)`,
    receivingAgentName: 'FMCA2 (主站-股東)',
    receivingMember: '王大福',
    receivingBalance: {
      change: i % 2 === 0 ? 2000 : -2000,
      before: '99,999,999',
      after: '99,999,999',
    },
    turnoverMultiple: i % 2 === 0 ? 1 : 0,
    requiredTurnover: i % 2 === 0 ? 2000 : 0,
    remarks: i === 0 ? '手動補發獎勵測試備註' : '',
  })
)

export const MOCK_LEVELS: LevelData[] = [
  { id: '1', name: '1級總代理', count: 38 },
  { id: '2', name: '2級代理', count: 53 },
  { id: '3', name: '3級代理', count: 88 },
  { id: '4', name: '4級代理', count: 104 },
  { id: '5', name: '5級代理', count: 2352 },
]

export const MOCK_ISSUERS: AccountData[] = [
  {
    id: 'A01',
    name: 'FMCA01 (金流/成數代理-主站)',
    count: 11,
    balance: '12,458,752',
  },
  {
    id: 'A02',
    name: 'FMCA02 (金流/成數代理-主站)',
    count: 4,
    balance: '9,651,235',
  },
  {
    id: 'A03',
    name: 'FMCA03 (金流/成數代理-主站)',
    count: 6,
    balance: '59,875,632',
  },
  {
    id: 'A04',
    name: 'W01 總站 (信用/成數+返水代理-外單位)',
    count: 7,
    balance: '658,963,651',
  },
]

export const MOCK_RECEIVERS: AccountData[] = [
  { id: 'B01', name: 'FMCA2 (主站-股東)', count: 3, balance: '562,354' },
  {
    id: 'B02',
    name: 'abv (金流/成數代理-總公司廣告條【一】)abv',
    count: 2,
    balance: '1,123,421',
  },
  {
    id: 'B03',
    name: 'aa888 CA01 (金流/成數代理-旺喔-CA01)aa888',
    count: 3,
    balance: '8,569,898',
  },
  {
    id: 'B04',
    name: 'ca2 CA02 (金流/成數代理-阿罩-CA02)ca2',
    count: 1,
    balance: '56,985,666',
  },
  {
    id: 'B05',
    name: 'TD01 CA04(金流/成數代理-天狗-CA04)TD01',
    count: 2,
    balance: '9,563,251',
  },
]
