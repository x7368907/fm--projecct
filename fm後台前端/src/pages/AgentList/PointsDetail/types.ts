export interface BalanceInfo {
  change: number
  before: string
  after: string
}

export interface PointsRecord {
  key: string
  type: string
  issuingLevel: string
  issuingAgentName: string
  issuingAgent: string
  issuingBalance: BalanceInfo

  receivingLevel: string
  receivingAgentName: string
  receivingMember: string
  receivingBalance: BalanceInfo

  turnoverMultiple: number
  requiredTurnover: number

  remarks: string
}

export interface PointsFormData {
  id?: string
  type: string
  rewardType?: string
  points?: number
  turnoverMultiple?: number
  requiredTurnover?: number
  remarks?: string
  issuerId?: string
  receiverIds?: string[]
}

// 用於選擇器的資料介面
export interface LevelData {
  id: string
  name: string
  count: number
}

export interface AccountData {
  id: string
  name: string
  count: number
  balance: string
}
