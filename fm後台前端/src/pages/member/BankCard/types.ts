export interface BankCardType {
  key: React.Key
  tag: string
  tagType: string
  account: string
  name: string
  submitTime: string
  status: string // '啟用' | '停用'
  paymentType: string
  bankName: string
  cardNumber: string
  hasImage1: boolean
  hasImage2: boolean
  processStatus: string // '待審核' | '通過' | '拒絕'
  remark: string
}
