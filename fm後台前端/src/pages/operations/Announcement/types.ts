import { Dayjs } from 'dayjs'
export interface AnnounceDataType {
  key: string
  activityType: string
  category?: string
  type?: string
  name: string
  names?: Record<string, string> // 多語系
  creator: string
  announceTime: string
  startTime: string
  endTime: string
  status: '進行中' | '準備開始' | '結束' | '強迫開始' | '強迫結束'
  factoryDisabled?: boolean
  pageClicks?: number
  linkClicks?: number
}

export type TabType = 'activity' | 'system' | 'game'

export interface AnnounceFormValues {
  activityType: string
  category: string
  type: string
  name: string
  announceTime: Dayjs
  activityRange: [Dayjs, Dayjs]
  sort?: number
  status: string
  // 其他動態欄位 (Rank, Loss, Sign-in 相關)
  settlementType?: 'daily' | 'weekly'
  lossResetType?: 'daily' | 'weekly'
  rankDisplayLimit?: string
  rankBonus?: Record<string, any>
  lossReport?: any[]
  signBonus?: Record<string, any>
  betThreshold?: string
  bonusFund?: string
}

export interface BannerImages {
  web: { home: Record<string, string>; inner: Record<string, string> }
  mobile: { home: Record<string, string>; inner: Record<string, string> }
}
