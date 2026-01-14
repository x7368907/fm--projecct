import { useState } from 'react'
import { message } from 'antd'
import type { DiscountDataType } from '../types'
import { INITIAL_DATA } from '../utils/fakeData'
import type { HandlerLogData } from '../../../AgentList/components/HandlerModal'

export const useDiscount = () => {
  const [dataSource, setDataSource] = useState<DiscountDataType[]>(INITIAL_DATA)
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [activeTab, setActiveTab] = useState('upcoming')
  const [editingRecord, setEditingRecord] = useState<DiscountDataType | null>(
    null
  )

  // 經手人相關
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // --- Logic ---

  const handleUpdateNote = (key: string, newNote: string) => {
    setDataSource((prev) =>
      prev.map((item) => (item.key === key ? { ...item, note: newNote } : item))
    )
    message.success('備註更新成功')
  }

  const fetchLogs = (record: DiscountDataType) => {
    console.log('Fetching logs for:', record.name)
    // 模擬 API 回傳
    setCurrentLogs([
      {
        key: '1',
        time: '2025-12-01 10:00',
        handler: 'admin',
        status: '新增',
        details: `建立優惠: ${record.name}`,
      },
    ])
    setIsHandlerModalOpen(true)
  }

  const toCreateMode = () => {
    setEditingRecord(null)
    setViewMode('create')
  }

  const toEditMode = (record: DiscountDataType) => {
    setEditingRecord(record)
    setViewMode('edit')
  }

  const backToList = (isSaved = false) => {
    if (isSaved) {
      message.success(viewMode === 'create' ? '新增成功' : '編輯儲存成功')
    }
    setEditingRecord(null)
    setViewMode('list')
  }

  return {
    dataSource,
    viewMode,
    activeTab,
    editingRecord,
    isHandlerModalOpen,
    currentLogs,
    setActiveTab,
    setIsHandlerModalOpen,
    handleUpdateNote,
    fetchLogs,
    toCreateMode,
    toEditMode,
    backToList,
  }
}
