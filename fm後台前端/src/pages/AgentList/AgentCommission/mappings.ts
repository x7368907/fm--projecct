// src/pages/AgentCommission/mappings.ts

export const SYSTEM_TYPE_LABEL: Record<string, string> = {
  share: '佔成制',
  rebate: '返水制',
}

export const SETTLEMENT_LABEL: Record<string, string> = {
  daily: '日結',
  weekly: '週結',
  monthly: '月結',
}

export const SETTLEMENT_HINT: Record<string, string> = {
  daily: '(每日-23:59:59)',
  weekly: '(每週日-23:59:59)',
  monthly: '(每月最後一天-23:59:59)',
}

export const AGENT_LEVEL_LABEL: Record<string, string> = {
  any: '任一層級',
  '1': '1級總代理',
  '2': '2級代理',
  '3': '3級代理',
  '4': '4級代理',
  '5': '5級代理',
}

// 小工具：避免每次都寫 ?? value
export const mapLabel = (
  map: Record<string, string>,
  value: unknown
): string => {
  const key = String(value ?? '')
  return map[key] ?? key
}
