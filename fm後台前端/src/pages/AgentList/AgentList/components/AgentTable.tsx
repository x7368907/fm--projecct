import { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'
import type { DataType } from '../types'
import { getColumns } from '../columns'

interface Props {
  data: DataType[] // ⭐ 該層「全部代理」
  onEdit: (r: DataType) => void
  onLogs: (r: DataType) => void
  onViewFrontend: (r: DataType) => void
  onPoints: (r: DataType) => void
  onLevelClick: (r: DataType) => void
}

export default function AgentTable({
  data,
  onEdit,
  onLogs,
  onViewFrontend,
  onPoints,
  onLevelClick,
}: Props) {
  const [list, setList] = useState<DataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * =========================
   * 當「層級資料 data 改變」
   * 重置無限滾動狀態
   * =========================
   */
  useEffect(() => {
    setList(data.slice(0, 20))
    setLimit(20)
    setFinished(data.length <= 20)
    setLoading(false)

    // 滾動回頂
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [data])

  /**
   * =========================
   * 滾動偵測
   * =========================
   */
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20

    if (isBottom) loadMore()
  }

  /**
   * =========================
   * 載入更多
   * =========================
   */
  const loadMore = () => {
    if (loading) return
    setLoading(true)

    setTimeout(() => {
      const newLimit = limit + 20
      const nextList = data.slice(0, newLimit)

      setList(nextList)
      setLimit(newLimit)
      setLoading(false)

      if (nextList.length >= data.length) {
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
        className="[&_.ant-table-pagination]:!hidden"
        columns={getColumns({
          onEdit,
          onLogs,
          onViewFrontend,
          onPoints,
          onLevelClick,
        })}
        dataSource={list}
        scroll={{ x: 1800 }}
        pagination={false}
        rowKey="key"
        sticky
      />

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-3">
          <Spin tip="載入中..." />
        </div>
      )}

      {/* 已無更多資料 */}
      {finished && (
        <div className="py-3 text-center text-sm text-gray-400">
          已無更多資料
        </div>
      )}
    </div>
  )
}
