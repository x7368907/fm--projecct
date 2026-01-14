export interface DataType {
  key: string
  agentLevel: string
  agentName: string
  memberCount: number
  agentInfo: { account: string; name: string }
  accountStatus: string
  profitMode: string
  settlementCycle: string
  cycleDate: string
  betAmount: number
  lossAmount: number
  agentProfit: number
  note: string
  reviewStatus: string
}
