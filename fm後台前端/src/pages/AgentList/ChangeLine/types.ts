export interface ProfitItem {
  type: string
  detail: string
  val: string
}
export interface ProfitCycleItem {
  title: string
  detail: string
}
export interface ProfitSystemItem {
  title: string
  detail?: string
}
export interface ChangeLineDataType {
  key: React.Key
  sourceLevel: string
  memberCount: number
  sourceAgentName: string
  sourceAgentRealName: string
  upperLevel: string
  upperAgentName: string

  profitSetting: ProfitItem[]

  /** 分潤名稱（不要寫死） */
  profitName: string /** 
  ✅ 代理分潤制度（流程） */
  profitSystems: ProfitSystemItem[]

  /** ✅ 換線日期 */
  changeDate: string
  /** ✅ 代理分潤結算（顯示用，支援換行） */
  profitCycles: ProfitCycleItem[]

  handler: string
}

export interface AgentData {
  key: number
  name: string
  realName: string
  profitSystem: string
  profitName: string
  cycle: string
  memberCount: number
}

export interface LevelData {
  label: string
  count: number
  active?: boolean
}
