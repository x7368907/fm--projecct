export interface GameSettingData {
  key: string
  station: string // 站別
  category: string // 遊戲類別
  vendorName: string // 遊戲商名稱
  jackpotSettlement: string // 彩金結算狀態
  contribution: number // 彩金貢獻值
  gameCap: number // 遊戲上限(%)
  negativeProfit: string // 負營利狀態
  settlementType: string // 結算方式標題 (e.g., 週結)
  settlementTime: string // 結算方式時間 (e.g., 每週日...)
  remark: string // 備註
}
