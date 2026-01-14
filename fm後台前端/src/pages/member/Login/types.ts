export interface MemberLoginType {
  key: string
  tags: string[]
  agentLevel: string
  agentName: string
  agentSubInfo: string
  account: string
  privilege: string
  name: string
  registerTime: string
  loginTime: string
  daysOffline: number
  country: string
  city: string
  ip: string
  deviceType: string
  deviceId: string
  status: string
}
// 新增：黑名單資料介面
export interface BlocklistData {
  key: string
  tag: string
  agentLevel: string
  agentName: string
  account: string
  privilege: string
  name: string
  registerTime: string
  loginTime: string
  daysOffline: number
  country: string
  city: string
  duplicateValue: string // IP 或 DeviceID
  status: string
  remark: string
}
