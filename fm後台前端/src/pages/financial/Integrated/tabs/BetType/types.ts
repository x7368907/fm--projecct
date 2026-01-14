// 定義主要的資料結構
export interface BetTypeDataType {
  key: string
  agentLevel: string
  agentName: string
  memberName: string
  vipLevel: string
  betCount: number // 總筆數

  // --- 各遊戲類別下注筆數 ---
  liveBetCount: number
  slotBetCount: number
  sportBetCount: number
  lotteryBetCount: number
  chessBetCount: number
  fishBetCount: number

  // --- 有效投注金額細項 ---
  liveValidBet: number
  slotValidBet: number
  sportValidBet: number
  lotteryValidBet: number
  chessValidBet: number
  fishValidBet: number
  totalValidBet: number // 總計

  winAmount: number
  lossAmount: number
  accountBalance: number
  gameBalance: number
}

// 合計資料的型別 (排除非數值欄位)
export type TotalDataType = Omit<
  BetTypeDataType,
  'key' | 'agentLevel' | 'agentName' | 'memberName' | 'vipLevel'
>
