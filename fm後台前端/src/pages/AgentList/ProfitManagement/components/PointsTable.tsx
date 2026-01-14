import { useEffect, useRef, useState } from 'react'
import { Table, Card, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { DataType } from '../types'

interface Props {
  dataSource: DataType[]
  columns: ColumnsType<DataType>
}

export default function PointsTable({ dataSource, columns }: Props) {
  const [list, setList] = useState<DataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ★ 初始化載入 20 筆
  useEffect(() => {
    setList(dataSource.slice(0, 20))
  }, [dataSource])

  // ★ 偵測滾動到底
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

    setTimeout(() => {
      const newLimit = limit + 20
      const next = dataSource.slice(0, newLimit)

      setList(next)
      setLimit(newLimit)
      setLoading(false)

      if (next.length >= dataSource.length) {
        setFinished(true)
      }
    }, 700)
  }

  return (
    <Card className="shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: '600px', overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 1300 }}
          pagination={false}
          size="middle"
          rowClassName="hover:bg-blue-50"
          sticky
        />

        {/* ★ Loading 效果 */}
        {loading && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {/* ★ 已無更多資料 */}
        {finished && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </Card>
  )
}
