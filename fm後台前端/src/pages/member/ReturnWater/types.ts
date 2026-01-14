export interface RebateDataType {
  key: string
  tags: string[]
  agentLevel: string
  agentName: string
  memberAccount: string
  memberName: string
  status: '啟用' | '停用'
  auditStatus: string
  regTime: string
  loginTime: string
  provider: string
  validBet: number
  rebateRatio: string
  rebateAmount: number
  manager: string
  gameType: string
  gameName: string
  returnWaterTimeEnd: string
  returnWaterTimeStart: string
}
