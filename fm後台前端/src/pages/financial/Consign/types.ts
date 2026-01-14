// src/pages/Consign/types.ts

export interface ConsignDataType {
  key: string
  tagType: 'ip_black' | 'normal' | 'money_black' | 'new'
  memberPhone: string
  memberLevel: string
  memberName: string
  group: string
  paymentType: string
  transactionType: string
  orderId: string
  amount: number
  dailyCount: string
  dailyLimitUsed: number
  dailyLimitTotal: number
  requestTime: string
  statusNote: string
}
