import type { CommissionData } from '../types'

export const mockData: CommissionData[] = Array.from({ length: 50 }).map(
  (_, i) => ({
    key: `${i + 1}`,
    system: i % 2 === 0 ? '佔成制' : '反水制',
    name: i % 2 === 0 ? `合營計畫 ${i + 1}` : `退水方案 ${i + 1}`,
    agentLevel: '任一層級',
    agentName: '任一代理',
    shareRatio: i % 2 === 0 ? 90 : 0,
    rebateLive: 0.4,
    rebateElec: 0.4,
    rebateSport: 0.3,
    rebateLottery: 0,
    rebateChess: 0.4,
    rebateFish: 0.4,
    settlement: i % 3 === 0 ? '月結' : '週結',
  })
)
