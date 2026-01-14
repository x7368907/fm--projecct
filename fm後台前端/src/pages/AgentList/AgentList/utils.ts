import type { DataType } from './types'

// ⭐ 用參數動態產生：1/5(8)
export const formatLevel = (item: DataType) => {
  return `${item.currentLevel}/${item.maxLevel}(${item.childCount})`
}

// ⭐ 如果你還需要解析字串，可保留（此版不再需要解析）
export const parseLevelString = (level: string) => {
  const m = level.match(/(\d+)\/(\d+)\((\d+)\)/)
  if (!m) return { current: 1, max: 1, count: 0 }
  return { current: +m[1], max: +m[2], count: +m[3] }
}
