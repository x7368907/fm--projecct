export interface RedLimitDataType {
  key: string
  type: string // '真人' 或 '體育'
  gameName: string // 遊戲名稱
  hallCode: string // 廳別
  minBet: number
  maxBet: number
  maxLoss: number
  maxWin: number
}
