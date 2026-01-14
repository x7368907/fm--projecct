import { useState } from 'react'
import type { AnnounceDataType } from '../types'
import { ACTIVITY_DATA, SYSTEM_DATA, GAME_DATA } from '../utils/fakeData'

export type TabKey = 'activity' | 'system' | 'game'

export const useAnnounce = () => {
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list')
  const [activeTab, setActiveTab] = useState<TabKey>('activity')
  const [currentLang, setCurrentLang] = useState('繁')
  const [editingRecord, setEditingRecord] = useState<AnnounceDataType | null>(
    null
  )

  // 根據 Tab 決定資料來源
  let currentData: AnnounceDataType[] = []
  if (activeTab === 'activity') currentData = ACTIVITY_DATA
  if (activeTab === 'system') currentData = SYSTEM_DATA
  if (activeTab === 'game') currentData = GAME_DATA

  // Actions
  const handleSearch = (values: any) => {
    console.log('Search:', values)
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  const toCreateMode = () => {
    setEditingRecord(null) // 清空，代表新增
    setViewMode('create')
  }

  const toEditMode = (record: AnnounceDataType) => {
    setEditingRecord(record) // 帶入資料，代表編輯
    setViewMode('create')
  }

  const backToList = () => {
    setEditingRecord(null)
    setViewMode('list')
  }

  return {
    loading,
    viewMode,
    activeTab,
    currentLang,
    editingRecord,
    currentData,
    dataCounts: {
      activity: ACTIVITY_DATA.length,
      system: SYSTEM_DATA.length,
      game: GAME_DATA.length,
    },
    setActiveTab,
    setCurrentLang,
    handleSearch,
    toCreateMode,
    toEditMode,
    backToList,
  }
}
