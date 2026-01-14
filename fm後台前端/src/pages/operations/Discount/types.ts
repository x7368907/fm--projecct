export interface DiscountDataType {
  key: string
  category: string
  name: string
  creator: string
  timing: string
  fixedAmount: number
  formula: string
  requiredFlow: number
  applyMethod: string
  wallet: string
  periodStart: string
  periodEnd: string
  status: string
  limitPerUser: number
  totalUsage: number
  note: string
}
// 表單用的 Values
export interface DiscountFormValues {
  name: string
  vipLevel?: string
  depositCondition?: string
  rebate?: number
  timing: string
  checkAmounts: number[]
  isCheckAmountUnlimited: boolean
  amountType: 'formula' | 'fixed' | 'points'
  fixedAmount?: number
  formulaLeft?: string
  turnover: number
  applyMethod: string
  distributeMethod: string
  limitCount?: number
  isUnlimited: boolean
  period?: [any, any] // dayjs object
  note: string
}
