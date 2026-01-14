import { useState } from 'react'
import type { DataType } from '../types'
import { initialData } from '../mock'

export function usePointsDetail() {
  // ★ 原始資料
  const [dataSource, setDataSource] = useState<DataType[]>(initialData)

  // ★ 目前所選的 Tab
  const [activeTab, setActiveTab] = useState<
    'pending' | 'approved' | 'rejected'
  >('pending')

  // --- 詳細彈窗控制 ---
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [detailModalType, setDetailModalType] = useState<'bet' | 'loss'>('bet')

  // --- 分潤彈窗控制 ---
  const [isProfitModalOpen, setIsProfitModalOpen] = useState(false)
  const [currentProfitMode, setCurrentProfitMode] = useState('')

  // ----------------------------------------------------------
  // ⭐⭐⭐ 根據 activeTab 過濾出不同資料（就是切換頁籤的資料）⭐⭐⭐
  // ----------------------------------------------------------
  const filteredData = dataSource.filter((item) => {
    switch (activeTab) {
      case 'pending':
        return item.reviewStatus === '待審核'
      case 'approved':
        return item.reviewStatus === '通過'
      case 'rejected':
        return item.reviewStatus === '拒絕'
      default:
        return true
    }
  })

  // ----------------------------------------------------------
  // ⭐ 更新備註
  // ----------------------------------------------------------
  const handleUpdateNote = (key: string, newNote: string) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, note: newNote } : item
    )
    setDataSource(newData)
  }

  // ----------------------------------------------------------
  // ⭐ 打開「投注 / 虧損」彈窗
  // ----------------------------------------------------------
  const handleOpenDetail = (_record: DataType, type: 'bet' | 'loss') => {
    setDetailModalType(type)
    setIsDetailModalOpen(true)
  }

  // ----------------------------------------------------------
  // ⭐ 打開「分潤」彈窗
  // ----------------------------------------------------------
  const handleOpenProfit = (record: DataType) => {
    setCurrentProfitMode(record.profitMode)
    setIsProfitModalOpen(true)
  }

  const pendingCount = dataSource.filter(
    (d) => d.reviewStatus === '待審核'
  ).length
  const approvedCount = dataSource.filter(
    (d) => d.reviewStatus === '通過'
  ).length
  const rejectedCount = dataSource.filter(
    (d) => d.reviewStatus === '拒絕'
  ).length

  return {
    // --- 資料 ---
    dataSource,
    filteredData, // ★ 表格要用這個資料，而不是原始 dataSource
    activeTab,

    pendingCount,
    approvedCount,
    rejectedCount,

    // --- Setter ---
    setActiveTab,
    setIsDetailModalOpen,
    setIsProfitModalOpen,

    // --- 彈窗資料 ---
    isDetailModalOpen,
    detailModalType,
    isProfitModalOpen,
    currentProfitMode,

    // --- Methods ---
    handleUpdateNote,
    handleOpenDetail,
    handleOpenProfit,
  }
}
