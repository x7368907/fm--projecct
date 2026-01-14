export interface DataType {
  key: string
  category: string // 'deposit' | 'withdraw'
  type: string
  name: string
  displayName: string
  merchantId: string
  hashKey: string
  hashIv: string
  status: boolean
  remark: string
}
