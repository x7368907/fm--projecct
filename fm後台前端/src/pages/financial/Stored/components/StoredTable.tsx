// src/pages/Discount/components/DepositTable.tsx
import { useEffect, useRef, useState } from 'react'
import { Table, Tag, Select, Button, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DepositDataType } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface DepositTableProps {
  dataSource: DepositDataType[]
  onSaveNote: (key: string, newNote: string) => void
  onShowLogs: (record: DepositDataType) => void
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function DepositTable({
  dataSource,
  onSaveNote,
  onShowLogs,
}: DepositTableProps) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<DepositDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const columns: ColumnsType<DepositDataType> = [
    {
      title: '標籤',
      key: 'tag',
      width: 100,
      fixed: 'left',
      align: 'center',
      render: (_, r) => {
        let color = 'blue'
        let text = '一般會員'
        if (r.tagType === 'ip_black') {
          color = 'red'
          text = r.amount > 100000 ? '金流黑名單' : 'IP黑名單'
        } else if (r.tagType === 'new') {
          color = 'green'
          text = '新會員'
        }
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '會員編號/特權',
      key: 'memberInfo',
      width: 140,
      render: (_, r) => (
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-mono text-gray-600">{r.memberPhone}</span>
          <span className="text-gray-400">{r.memberLevel}</span>
        </div>
      ),
    },
    {
      title: '會員姓名',
      dataIndex: 'memberName',
      key: 'memberName',
      width: 100,
      render: (t) => <span className="font-medium text-gray-700">{t}</span>,
    },
    {
      title: '金流群組',
      dataIndex: 'group',
      key: 'group',
      width: 100,
      render: (t) => <span className="text-xs text-gray-600">{t}</span>,
    },
    {
      title: '金流類型',
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: 100,
      render: (t) => <span className="text-xs">{t}</span>,
    },
    {
      title: '交易類別',
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 120,
      render: (t) => <span className="text-xs">{t}</span>,
    },
    {
      title: '訂單編號',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 160,
      render: (t) => (
        <span className="font-mono text-xs text-gray-500">{t}</span>
      ),
    },
    {
      title: '儲值金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 100,
      render: (v) => <b className="text-gray-800">{v?.toLocaleString()}</b>,
    },
    {
      title: '免手續費次數',
      dataIndex: 'freeFeeCount',
      key: 'freeFeeCount',
      align: 'center',
      width: 110,
      render: (v) => <span className="text-xs text-gray-500">{v}</span>,
    },
    {
      title: '儲值回饋金',
      key: 'return',
      align: 'right',
      width: 100,
      render: (_, r) => (
        <div className="flex flex-col items-end text-xs">
          <span className="text-gray-400">{r.returnRate}%</span>
          <span className="font-medium text-teal-600">{r.returnAmount}</span>
        </div>
      ),
    },
    {
      title: '儲值手續費',
      key: 'fee',
      align: 'right',
      width: 100,
      render: (_, r) => (
        <div className="flex flex-col items-end text-xs">
          <span className="text-gray-400">{r.feeRate}%</span>
          <span className="text-red-500">{r.feeAmount}</span>
        </div>
      ),
    },
    {
      title: '應付金額',
      dataIndex: 'payable',
      key: 'payable',
      align: 'right',
      width: 110,
      render: (v) => <b className="text-teal-600">{v?.toLocaleString()}</b>,
    },
    {
      title: '申請時間',
      dataIndex: 'requestTime',
      key: 'requestTime',
      width: 110,
      render: (t) => {
        const [date, time] = t.split(' ')
        return (
          <div className="flex flex-col text-xs text-gray-500">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        )
      },
    },
    {
      title: '儲值狀況',
      key: 'status',
      width: 240,
      render: (_, record) => (
        <EditableNoteCell
          value={record.statusNote}
          onSave={(newVal) => onSaveNote(record.key, newVal)}
        />
      ),
    },
    {
      title: '審核狀態',
      key: 'audit',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: () => (
        <Select
          defaultValue="pending"
          size="small"
          className="w-24"
          options={[
            { label: '待審核', value: 'pending' },
            { label: '通過', value: 'pass' },
            { label: '拒絕', value: 'reject' },
          ]}
        />
      ),
    },
    {
      title: '經手人',
      key: 'handler',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          icon={<FileTextOutlined />}
          size="small"
          type="text"
          onClick={() => onShowLogs(record)}
        />
      ),
    },
  ]

  // ✅ dataSource 變動時 reset（篩選 / 搜尋 / 重新抓資料都會走這裡）
  useEffect(() => {
    setList(dataSource.slice(0, PAGE_SIZE))
    setLimit(PAGE_SIZE)
    setLoadingMore(false)
    setFinished(dataSource.length <= PAGE_SIZE)
    containerRef.current?.scrollTo({ top: 0 })
  }, [dataSource])

  const loadMore = () => {
    if (loadingMore || finished) return
    setLoadingMore(true)

    setTimeout(() => {
      const newLimit = limit + PAGE_SIZE
      const next = dataSource.slice(0, newLimit)

      setList(next)
      setLimit(newLimit)
      setLoadingMore(false)

      if (next.length >= dataSource.length) setFinished(true)
    }, 400)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore()
  }

  return (
    <div className="mt-2">
      {/* ✅ 滾動容器不要 padding，避免 sticky 位置錯亂 */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey="key"
          pagination={false}
          scroll={{ x: 1800 }}
          size="small"
          bordered
          sticky
          rowClassName="hover:bg-gray-50"
        />

        {loadingMore && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {finished && list.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}

        {finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}
      </div>
    </div>
  )
}
