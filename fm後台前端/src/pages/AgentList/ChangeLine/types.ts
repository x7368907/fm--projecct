export interface ProfitItem {
  type: string
  detail: string
  val: string
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
  profitName: string
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
