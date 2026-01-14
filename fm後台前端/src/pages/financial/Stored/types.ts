// src/pages/Discount/types.ts

export interface DepositDataType {
  key: string
  tagType: 'ip_black' | 'normal' | 'new'
  memberPhone: string
  memberLevel: string
  memberName: string
  group: string
  paymentType: string
  transactionType: string
  orderId: string
  amount: number
  freeFeeCount: string
  returnRate: number
  returnAmount: number
  feeRate: number
  feeAmount: number
  payable: number
  requestTime: string
  statusNote: string
}
