import { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'

import { MOCK_DATA } from '../mock'
import { getColumns } from '../columns'
import type { PointsRecord } from '../types'

export default function PointsTable({
  onUpdateNote,
  onLogs,
}: {
  onUpdateNote: (key: string, val: string) => void
  onLogs: (r: PointsRecord) => void
}) {
  const [list, setList] = useState<PointsRecord[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ★ 初始載入 20 筆
  useEffect(() => {
    setList(MOCK_DATA.slice(0, 20))
  }, [])

  // ★ 偵測滾到底
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20

    if (isBottom) loadMore()
  }

  // ★ 載入更多資料
  const loadMore = () => {
    if (loading) return
    setLoading(true)

    // 模擬 API 延遲
    setTimeout(() => {
      const newLimit = limit + 20
      const nextData = MOCK_DATA.slice(0, newLimit)

      setList(nextData)
      setLimit(newLimit)
      setLoading(false)

      if (nextData.length >= MOCK_DATA.length) {
        setFinished(true)
      }
    }, 700)
  }

  return (
    <div
      ref={containerRef}
      style={{ maxHeight: '600px', overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <Table
        columns={getColumns({ onUpdateNote, onLogs })}
        dataSource={list}
        pagination={false}
        scroll={{ x: 1500 }}
        size="middle"
        rowClassName="align-top"
        sticky
      />

      {/* ★ Loading UI */}
      {loading && (
        <div className="flex justify-center py-3">
          <Spin tip="載入中..." />
        </div>
      )}

      {/* ★ 沒有更多資料 */}
      {finished && (
        <div className="py-3 text-center text-sm text-gray-400">
          已無更多資料
        </div>
      )}
    </div>
  )
}
