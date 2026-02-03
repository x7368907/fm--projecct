import { useEffect, useState } from 'react'
import { message } from 'antd'
import type { DataType } from '../types'
import { getAgents, getSubAgents } from '../../../../api/agents'
import { MOCK_DATA } from '../mock'

export type ViewMode = 'search' | 'hierarchy'

interface UseAgentHierarchyReturn {
  agentList: DataType[]
  cardTitle: React.ReactNode
  viewMode: ViewMode

  // actions
  initDefaultLevel: () => void
  searchByLevel: (levelValue: string) => void
  goNextLevel: (record: DataType) => void
  goBackToLevel: (index: number) => void
}

/**
 * 代理層級 / 搜尋狀態管理
 */
export function useAgentHierarchy(): UseAgentHierarchyReturn {
  // ⭐ Table 資料
  const [agentList, setAgentList] = useState<DataType[]>([])

  // ⭐ Card title 層級
  const [cardLevelPath, setCardLevelPath] = useState<number[]>([1])

  // ⭐ 每層對應的 parentKey（返回用）
  const [parentKeyPath, setParentKeyPath] = useState<(string | null)[]>([null])

  // ⭐ 搜尋 / 層級 模式
  const [viewMode, setViewMode] = useState<ViewMode>('search')

  /**
   * =========================
   * 初始化：預設 1 級（搜尋模式）
   * =========================
   */
  const initDefaultLevel = async () => {
    const res = await getAgents({ level: 1 })

    setAgentList(res.data)
    setCardLevelPath([1])
    setParentKeyPath([null])
    setViewMode('search')
  }

  useEffect(() => {
    initDefaultLevel()
  }, [])

  /**
   * =========================
   * 搜尋：依代理級別
   * =========================
   */
  const searchByLevel = async (levelValue: string) => {
    if (!levelValue || levelValue === 'all') {
      message.warning('請選擇代理級別')
      return
    }

    const levelNumber = Number(levelValue.replace('lvl', ''))
    const res = await getAgents({ level: levelNumber })

    setAgentList(res.data)
    setCardLevelPath([levelNumber])
    setParentKeyPath([null])
    setViewMode('search')
  }

  /**
   * =========================
   * 層級導覽：往下一層
   * =========================
   */
  const goNextLevel = async (record: DataType) => {
    const nextLevel = record.currentLevel + 1
    if (nextLevel > record.maxLevel) return

    const res = await getSubAgents(record.id)

    if (res.data.length === 0) {
      message.info('此代理沒有下線代理')
      return
    }

    setAgentList(res.data)
    setCardLevelPath((prev) => [...prev, nextLevel])
    setParentKeyPath((prev) => [...prev, record.key])
    setViewMode('hierarchy')
  }

  /**
   * =========================
   * Card title 點擊返回
   * =========================
   */
  const goBackToLevel = (index: number) => {
    const parentKey = parentKeyPath[index]
    const level = cardLevelPath[index]

    const list =
      parentKey === null
        ? MOCK_DATA.filter((a) => a.currentLevel === level)
        : MOCK_DATA.filter((a) => a.parentKey === parentKey)

    setAgentList(list)
    setCardLevelPath(cardLevelPath.slice(0, index + 1))
    setParentKeyPath(parentKeyPath.slice(0, index + 1))
  }

  /**
   * =========================
   * Card title render（外部直接用）
   * =========================
   */
  const cardTitle =
    viewMode === 'search' ? (
      cardLevelPath[0] === 1 ? (
        '1級總代理'
      ) : (
        `${cardLevelPath[0]}級代理`
      )
    ) : (
      <div className="flex flex-wrap items-center gap-1">
        {cardLevelPath.map((level, idx) => (
          <span key={idx}>
            <span
              onClick={() => goBackToLevel(idx)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {level === 1 ? '1級總代理' : `${level}級代理`}
            </span>
            {idx < cardLevelPath.length - 1 && ' > '}
          </span>
        ))}
      </div>
    )

  return {
    agentList,
    cardTitle,
    viewMode,

    initDefaultLevel,
    searchByLevel,
    goNextLevel,
    goBackToLevel,
  }
}
