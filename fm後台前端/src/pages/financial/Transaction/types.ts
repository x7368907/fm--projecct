export interface TransactionData {
  key: string
  agentLevel: string
  agentName: string
  memberName: string
  // 儲值
  manualDeposit: { amount: number; count: number }
  atmDeposit: { amount: number; count: number }
  creditDeposit: { amount: number; count: number }
  epayDeposit: { amount: number; count: number }
  usdtDeposit: { amount: number; count: number }
  cvsDeposit: { amount: number; count: number }
  depositSubtotal: number
  // 託售
  bankWithdraw: { amount: number; count: number }
  usdtWithdraw: { amount: number; count: number }
  withdrawSubtotal: number
  // 加扣點
  addPoints: { amount: number; count: number }
  deductPoints: { amount: number; count: number }
  pointsSubtotal: number
}
