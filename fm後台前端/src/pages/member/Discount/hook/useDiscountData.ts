import { useState, useMemo } from 'react'
import { message } from 'antd'
import type { DiscountDataType, AuditStatusType } from '../types'
import { MOCK_DATA } from '../utils/fakeData'

export const useDiscountData = () => {
  const [dataSource, setDataSource] = useState<DiscountDataType[]>(MOCK_DATA)
  const [statusFilter, setStatusFilter] = useState<string>('pending')

  // 計算各狀態數量
  const counts = useMemo(
    () => ({
      pending: dataSource.filter((d) => d.auditStatus === 'pending').length,
      active: dataSource.filter((d) => d.auditStatus === 'active').length,
      rejected: dataSource.filter((d) => d.auditStatus === 'rejected').length,
      disabled: dataSource.filter((d) => d.auditStatus === 'disabled').length,
    }),
    [dataSource]
  )

  // 更新備註
  const handleUpdateRemark = (key: string, newRemark: string) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, remark: newRemark } : item
    )
    setDataSource(newData)
    message.success('備註已更新')
  }

  // 更新審核狀態
  const handleStatusChange = (key: string, newStatus: AuditStatusType) => {
    const newData = dataSource.map((item) =>
      item.key === key ? { ...item, auditStatus: newStatus } : item
    )
    setDataSource(newData)

    const statusMap = {
      pending: '待審核',
      active: '啟用',
      rejected: '拒絕',
      disabled: '停用',
    } as const

    message.info(
      `狀態已變更為：${statusMap[newStatus as keyof typeof statusMap]}`
    )
  }

  // 根據 Tab 過濾資料
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return dataSource
    // 這裡簡單範例：如果 Tab 選 rejected，就只顯示 rejected
    // 您可以根據實際需求調整過濾邏輯
    return dataSource.filter((item) => {
      if (statusFilter === 'pending') return item.auditStatus === 'pending'
      if (statusFilter === 'active') return item.auditStatus === 'active'
      if (statusFilter === 'rejected') return item.auditStatus === 'rejected'
      return true
    })
  }, [dataSource, statusFilter])

  return {
    dataSource,
    filteredData,
    statusFilter,
    setStatusFilter,
    counts,
    handleUpdateRemark,
    handleStatusChange,
  }
}
