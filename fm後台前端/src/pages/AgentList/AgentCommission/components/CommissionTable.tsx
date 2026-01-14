import { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'

import { mockData } from '../utils/fakeData'
import type { CommissionData } from '../types'
import { getColumns } from '../columns'

export default function CommissionTable({
  onEdit,
  onLogs,
}: {
  onEdit: (r: CommissionData) => void
  onLogs: (r: CommissionData) => void
}) {
  const [list, setList] = useState<CommissionData[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // ★ 初始 20 筆
  useEffect(() => {
    setList(mockData.slice(0, 20))
  }, [])

  // ★ 滾動事件
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20
    if (isBottom) loadMore()
  }

  const loadMore = () => {
    if (loading) return
    setLoading(true)

    // 模擬 API 延遲
    setTimeout(() => {
      const newLimit = limit + 20
      const nextData = mockData.slice(0, newLimit)

      setList(nextData)
      setLimit(newLimit)
      setLoading(false)

      if (nextData.length >= mockData.length) {
        setFinished(true)
      }
    }, 800)
  }

  return (
    <div
      ref={containerRef}
      style={{ maxHeight: '600px', overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <Table
        className="[&_.ant-table-pagination]:!hidden"
        columns={getColumns({ onEdit, onLogs })}
        dataSource={list}
        bordered
        scroll={{ x: 1300 }}
        pagination={false}
        sticky
      />

      {/* ★ Loading 效果 */}
      {loading && (
        <div className="flex justify-center py-3">
          <Spin tip="載入中..." />
        </div>
      )}

      {/* ★ 沒資料時顯示 */}
      {finished && (
        <div className="py-3 text-center text-sm text-gray-400">
          已無更多資料
        </div>
      )}
    </div>
  )
}
