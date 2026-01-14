export type AuditStatusType = string

export interface DiscountDataType {
  key: string
  agentLevel: string
  agentName: string
  memberAccount: string
  memberName: string
  accountStatus: string
  privilege: string
  discountType: string
  discountName: string
  bonusAmount: number
  turnoverReq: number
  withdrawCount: string
  applyMethod: string
  collectionMethod: string
  applyTime: string
  auditTime: string
  remark: string
  auditStatus: AuditStatusType
}

// ==========================================
// 2. 新增頁面 (BonusCreate) 使用的型別
// ==========================================
export interface BonusItem {
  key: string
  name: string
  points: number
  method: string
  distribute: string
  turnover: number
  remark: string
}

export interface MemberItem {
  key: string
  level: string
  agent: string
  account: string
  name: string
  vip: string
  status: string
  balance: number
}
