import { useEffect, useRef, useState } from 'react'
import { Table, Button, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import EditableNoteCell from './EditableNoteCell'
import type { WalletData } from '../types'

interface WalletTableProps {
  dataSource: WalletData[]
  onUpdateNote: (key: string, newNote: string) => void
  onViewLog: (record: WalletData) => void
}

export default function WalletTable({
  dataSource,
  onUpdateNote,
  onViewLog,
}: WalletTableProps) {
  const [list, setList] = useState<WalletData[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /** 欄位（完全沿用你原本的） */
  const columns: ColumnsType<WalletData> = [
    { title: '代理層級', dataIndex: 'agentLevel', width: 100 },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      width: 250,
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="font-bold text-blue-600">{text}</span>
          <span className="text-xs text-gray-400">({record.agentPath})</span>
        </div>
      ),
    },
    { title: '會員帳號', dataIndex: 'memberAccount', width: 160 },
    { title: '會員姓名', dataIndex: 'memberName', width: 160 },
    { title: '類型', dataIndex: 'type', width: 100 },
    { title: '流水倍數', dataIndex: 'multiplier', width: 100 },
    { title: '必須流水', dataIndex: 'requiredTurnover', width: 100 },
    {
      title: '轉入 / 轉出',
      dataIndex: 'amount',
      width: 200,
      render: (amount, record) => (
        <div className="flex flex-col text-sm">
          <span className="mb-1 text-base font-bold">{amount}</span>
          <span className="text-xs text-gray-500">
            異動前: {record.beforeBalance.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">
            異動後: {record.afterBalance.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      width: 300,
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newValue) => onUpdateNote(record.key, newValue)}
        />
      ),
    },
    {
      title: '經手人',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Button
          icon={<FileTextOutlined />}
          size="small"
          type="text"
          onClick={() => onViewLog(record)}
        />
      ),
    },
  ]

  /** 初始載入 / dataSource 變動時重置 */
  useEffect(() => {
    setList(dataSource.slice(0, 20))
    setLimit(20)
    setFinished(false)
  }, [dataSource])

  /** 滾動偵測 */
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    const reachBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20

    if (reachBottom) loadMore()
  }

  /** 載入更多 */
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
    }, 600)
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white p-0 shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          bordered
          size="middle"
          scroll={{ x: 1600 }}
          pagination={false}
          sticky
        />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {/* No more */}
        {finished && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
