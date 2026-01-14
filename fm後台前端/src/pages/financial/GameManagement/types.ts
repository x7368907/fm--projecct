export interface GameSettlementType {
  key: string
  agentLevel: string
  agentName: string
  agentDesc: string
  category: string
  provider: string
  jpSettlement: string
  method: string
  date: string
  betCount: number
  betAmount: number
  validBet: number
  jc: number
  jp: number
  winAmount: number
  lossAmount: number
  jcJpTotal: number
  revenueAmount: number
  status: 'unpaid' | 'auditing' | 'paid'
}

export interface BetDetailType {
  key: string
  playerName: string
  validBet: number
  winAmount: number
  lossAmount: number
}

export interface JcDetailType {
  key: string
  provider: string
  validBet: number
  jcRate: number
  jcAmount: number
}

export interface RevenueDetailType {
  key: string
  provider: string
  validBet: number
  rate: number
  jcJp: number
  amount: number
}
