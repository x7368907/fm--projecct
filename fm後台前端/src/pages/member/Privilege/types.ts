export interface RebateDetail {
  hour: number | string
  day: number | string
  week: number | string
}

export interface PrivilegeDataType {
  key: string
  vipLevel: string
  account: string
  name: string
  status: string
  depositProgress: { current: number; target: number }
  bettingProgress: { current: number; target: number }
  updateProgress: { current: number; target: number }
  upgradeBonus: number | string
  topUpBonus: number | string
  birthDateBonus: number | string
  consignment: number
  totalConsignment: number
  consignmentProgress: { current: number; target: number }
  rebates: {
    electronic: RebateDetail
    live: RebateDetail
    chess: RebateDetail
    lottery: RebateDetail
    sports: RebateDetail
  }
}
