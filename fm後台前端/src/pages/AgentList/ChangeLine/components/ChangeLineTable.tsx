import { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'

import { getColumns } from '../columns'
import { MOCK_DATA } from '../mock'
import type { ChangeLineDataType } from '../types'

export default function ChangeLineTable({
  onLogs,
}: {
  onLogs: (r: ChangeLineDataType) => void
}) {
  const [list, setList] = useState<ChangeLineDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ★ 初次載入 20 筆
  useEffect(() => {
    setList(MOCK_DATA.slice(0, 20))
  }, [])

  // ★ 滾動偵測
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20
    if (bottom) loadMore()
  }

  // ★ 載入更多資料
  const loadMore = () => {
    if (loading) return
    setLoading(true)

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
        columns={getColumns({ onLogs })}
        dataSource={list}
        pagination={false}
        scroll={{ x: 1300 }}
        rowClassName="hover:bg-blue-50"
        sticky
      />

      {/* ★ Loading 效果 */}
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
