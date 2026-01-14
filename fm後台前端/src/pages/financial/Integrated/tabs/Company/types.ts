export interface DataType {
  key: string
  agentLevel: string
  agentName: string
  memberCount: number
  betCount: number
  betAmount: number
  validBetAmount: number
  winAmount: number
  lossAmount: number
  deposit: number
  withdraw: number
  rebate: number
  discount: number
  cost: number
  commission: number
  gameFee: number
  netProfit: number
}

// 用於計算合計的型別
export type TotalDataType = Omit<DataType, 'key' | 'agentLevel' | 'agentName'>
