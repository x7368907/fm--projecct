import React, { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'
import type { CommissionData } from '../types'
import { getColumns } from '../columns'

// 定義 Props，接收父層傳來的 dataSource 與 loading
interface CommissionTableProps {
  dataSource: CommissionData[]
  loading: boolean
  onEdit: (r: CommissionData) => void
  onLogs: (r: CommissionData) => void
}

const CommissionTable: React.FC<CommissionTableProps> = ({
  dataSource = [], // 設定預設值以防 undefined
  loading: parentLoading, // 重新命名以區分內部滾動的 loading
  onEdit,
  onLogs,
}) => {
  // 用於顯示在畫面上的部分資料 (前端分頁/無限滾動用)
  const [displayList, setDisplayList] = useState<CommissionData[]>([])

  // 記錄目前顯示到第幾筆
  const [limit, setLimit] = useState(20)

  // 內部滾動加載的 loading 狀態
  const [scrollLoading, setScrollLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ★ 監聽父層傳來的 dataSource 變化
  // 當父層搜尋結果改變時，重置顯示列表與計數器
  useEffect(() => {
    setLimit(20)
    if (dataSource.length > 0) {
      setDisplayList(dataSource.slice(0, 20))
    } else {
      setDisplayList([])
    }
  }, [dataSource])

  // ★ 判斷是否還有更多資料可以載入
  const hasMore = displayList.length < dataSource.length

  // ★ 滾動事件處理
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || scrollLoading || !hasMore) return

    // 判斷是否捲動到底部 (預留 20px 緩衝)
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20

    if (isBottom) {
      loadMore()
    }
  }

  // ★ 載入更多邏輯 (純前端切分資料)
  const loadMore = () => {
    setScrollLoading(true)

    // 模擬一點延遲感，讓使用者知道有在跑 (可選，若想順暢可移除 setTimeout)
    setTimeout(() => {
      const newLimit = limit + 20
      const nextData = dataSource.slice(0, newLimit)

      setDisplayList(nextData)
      setLimit(newLimit)
      setScrollLoading(false)
    }, 500)
  }

  return (
    <div
      ref={containerRef}
      style={{ maxHeight: '600px', overflowY: 'auto' }}
      onScroll={handleScroll}
      className="relative"
    >
      <Table
        className="[&_.ant-table-pagination]:!hidden"
        columns={getColumns({ onEdit, onLogs })}
        // 這裡使用的是經過 slice 切分後的 displayList
        dataSource={displayList}
        // 如果父層正在 API 搜尋中，Table 顯示 loading
        loading={parentLoading}
        rowKey="id" // 建議加上 rowKey，避免 React key warning (假設資料有 id)
        bordered
        scroll={{ x: 1300 }}
        pagination={false}
        sticky
      />

      {/* ★ 滾動加載時的 Loading 效果 (底部) */}
      {scrollLoading && !parentLoading && (
        <div className="flex justify-center py-3">
          <Spin tip="載入更多..." />
        </div>
      )}

      {/* ★ 顯示已無更多資料 (僅在資料量大於一頁且已全部顯示時出現) */}
      {!hasMore && dataSource.length > 20 && !parentLoading && (
        <div className="py-3 text-center text-sm text-gray-400">
          已顯示所有資料
        </div>
      )}
    </div>
  )
}

export default CommissionTable
