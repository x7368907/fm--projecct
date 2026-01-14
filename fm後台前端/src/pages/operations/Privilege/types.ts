export interface DataType {
  key: string
  no: number
  type: string
  depositReq: string
  validBet: string
  validBetUpgrade: string
  upgradeBonus: string | number
  rebateRatio: number
  birthdayBonus: number
  dailyWithdrawCount: number
  dailyWithdrawLimit: string
  // 返水相關欄位
  live_h?: number
  live_d?: number
  live_w?: number
  elec_h?: number
  elec_d?: number
  elec_w?: number
  sport_h?: number
  sport_d?: number
  sport_w?: number
  lottery_h?: number
  lottery_d?: number
  lottery_w?: number
  card_h?: number
  card_d?: number
  card_w?: number
  fish_h?: number
  fish_d?: number
  fish_w?: number
  [key: string]: any
}
