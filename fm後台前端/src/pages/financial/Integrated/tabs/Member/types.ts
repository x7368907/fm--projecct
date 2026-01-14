import type { DetailDataType } from '../../../../../components/DetailModal'

export interface MemberDataType {
  key: string
  agentLevel: string
  agentName: string
  memberName: string
  vipLevel: string
  betCount: number
  betAmount: number
  validBetAmount: number
  winAmount: number
  lossAmount: number
  deposit: number
  withdraw: number
  rebate: number
  discount: number
  cost: number
  gameFee: number
}

// 合計資料的型別 (排除非數字欄位)
export type TotalDataType = Omit<
  MemberDataType,
  'key' | 'agentLevel' | 'agentName' | 'memberName' | 'vipLevel'
>

// 彈窗模式型別
export type ModalMode =
  | 'agent'
  | 'member-bet'
  | 'member-rebate'
  | 'member-discount'
  | 'member-cost'
  | 'member-gamefee'
  | 'member-transaction'

export interface ModalState {
  open: boolean
  title: string
  subTitle: string
  data: DetailDataType[]
  mode: ModalMode
}
