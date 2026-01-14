export interface ChangeLineDataType {
  key: string
  transferMethod: string
  oldAgentLevel: string
  oldAgentName: string
  oldMemberAccount: string
  newAgentLevel: string
  newAgentName: string
  newMemberAccount: string
  memberName: string
  status: 'active' | 'suspended'
  regLoginTime: string[]
  lastTransferTime: string[]
  oldPrivilegeLevel: string
  newPrivilegeLevel: string
}

export interface AgentData {
  key: string
  name: string
  system: string
  splitName: string
  share: number
  settlement: string
}

export interface MemberData {
  key: string
  tag: string
  account: string
  name: string
  vip: string
  status: string
  wallet: number
  gameBalance: number
}

export interface AgentLevelData {
  label: string
  count: number
}
