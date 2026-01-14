export interface DataType {
  key: string
  tags: string[]
  agentLevel: string
  agentName: string
  memberAccount: string
  memberName: string
  paymentGroup: string
  status: string
  statusNote?: string
  rebateType: string
  isVerified: boolean
  bankVerified: boolean
  storeVerified: string
  usdt: string
  depositAmount: number
  withdrawAmount: number
  withdrawCount: string
  registerTime: string
  loginTime: string
  daysOffline: number
  accountBalance: number
  gameBalance: number
  name: any
}
