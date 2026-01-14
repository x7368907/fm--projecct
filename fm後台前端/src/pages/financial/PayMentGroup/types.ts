export interface GroupDataType {
  key: string
  category: string // '儲值' 或 '託售'
  type: string
  name: string
  displayName: string
  rate: number
  minDeposit: number
  maxDeposit: number
  freeFeeCount: number
  feePercent: number
  minFeeAmount: number
  totalDeposit: number
  totalFee: number
  grandTotal: number
  status: boolean
  remark: string
}
