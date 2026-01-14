export interface DataType {
  /* ===== 基本識別 ===== */
  key: string

  /* ===== 層級關係 ===== */
  currentLevel: number
  maxLevel: number
  childCount: number
  parentKey: string | null

  /* ===== 基本資料 ===== */
  name: string
  account: string
  realName: string
  memberCount: number

  status: string
  cashGroup: string

  /* ===== 時間 ===== */
  registerTime: string
  lastLoginTime: string

  /* ===== 分潤 ===== */
  profitSystem: string
  profitRate: number

  liveRate: number
  slotRate: number
  sportRate: number
  lotteryRate: number
  chessRate: number
  fishRate: number

  /* ===== 結算 ===== */
  settlement: string
}
