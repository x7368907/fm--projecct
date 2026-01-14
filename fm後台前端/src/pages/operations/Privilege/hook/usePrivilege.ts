import { useState } from 'react'
import type { DataType } from '../types'
import { MOCK_DATA } from '../utils/fakeData'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal' // 依實際路徑調整
// 依實際路徑調整

export const usePrivilege = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(MOCK_DATA)
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null)

  // 經手人相關
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // Actions
  const handleSearch = (values: any) => {
    console.log('Search:', values)
    console.log(setDataSource)
    // TODO: Filter logic
  }

  const fetchLogs = (record: DataType) => {
    console.log('Fetching logs for:', record.type)
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-05-30 14:00',
        handler: 'admin',
        status: '修改',
        details: `修改 [${record.type}] 設定`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  const toCreateMode = () => {
    setEditingRecord(null)
    setViewMode('create')
  }

  const toEditMode = (record: DataType) => {
    setEditingRecord(record)
    setViewMode('edit')
  }

  const backToList = (isSaved = false) => {
    if (isSaved) console.log('Saved!')
    setEditingRecord(null)
    setViewMode('list')
  }

  return {
    dataSource,
    viewMode,
    editingRecord,
    isHandlerModalOpen,
    currentLogs,
    setIsHandlerModalOpen,
    handleSearch,
    fetchLogs,
    toCreateMode,
    toEditMode,
    backToList,
  }
}
