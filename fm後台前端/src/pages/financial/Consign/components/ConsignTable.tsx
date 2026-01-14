import { useEffect, useMemo, useRef, useState } from 'react'
import { Table, Tag, Button, Select, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { ConsignDataType } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface ConsignTableProps {
  dataSource: ConsignDataType[]
  onSaveNote: (key: string, newNote: string) => void
  onShowLogs: (record: ConsignDataType) => void
  loading?: boolean
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function ConsignTable({
  dataSource,
  onSaveNote,
  onShowLogs,
  loading = false,
}: ConsignTableProps) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<ConsignDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 定義 Columns（沿用你原本的）
  const columns: ColumnsType<ConsignDataType> = useMemo(
    () => [
      {
        title: '標籤',
        key: 'tag',
        width: 100,
        fixed: 'left',
        align: 'center',
        render: (_, r) => {
          if (r.tagType === 'ip_black') return <Tag color="error">IP黑名單</Tag>
          if (r.tagType === 'money_black')
            return <Tag color="magenta">金流黑名單</Tag>
          if (r.tagType === 'new') return <Tag color="success">新會員</Tag>
          return (
            <Tag bordered={false} className="bg-gray-100 text-gray-600">
              一般會員
            </Tag>
          )
        },
      },
      {
        title: '會員編號/特權',
        key: 'memberInfo',
        width: 130,
        render: (_, r) => (
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-mono text-gray-700">{r.memberPhone}</span>
            <span className="text-gray-400">{r.memberLevel}</span>
          </div>
        ),
      },
      {
        title: '會員姓名',
        dataIndex: 'memberName',
        key: 'memberName',
        width: 100,
        render: (t) => <span className="font-medium text-gray-800">{t}</span>,
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
        width: 90,
        render: (t) => <span className="text-xs">{t}</span>,
      },
      {
        title: '交易類別',
        dataIndex: 'transactionType',
        key: 'transactionType',
        width: 130,
        render: (t) => <span className="text-xs">{t}</span>,
      },
      {
        title: '訂單編號',
        dataIndex: 'orderId',
        key: 'orderId',
        width: 170,
        render: (t) => (
          <span className="select-all font-mono text-xs text-gray-500">
            {t}
          </span>
        ),
      },
      {
        title: '託售金額',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        width: 110,
        render: (v) => (
          <b className="text-base text-gray-800">{v?.toLocaleString()}</b>
        ),
      },
      {
        title: '每日託售次數',
        dataIndex: 'dailyCount',
        key: 'dailyCount',
        align: 'center',
        width: 110,
        render: (v) => (
          <span className="text-xs font-medium text-gray-600">{v}</span>
        ),
      },
      {
        title: '每日託售額度',
        key: 'dailyLimit',
        align: 'right',
        width: 160,
        render: (_, r) => (
          <div className="font-mono text-xs">
            <span className="text-gray-800">
              {r.dailyLimitUsed.toLocaleString()}
            </span>
            <span className="mx-1 text-gray-400">/</span>
            <span className="text-gray-400">
              {r.dailyLimitTotal.toLocaleString()}
            </span>
          </div>
        ),
      },
      {
        title: '申請時間',
        dataIndex: 'requestTime',
        key: 'requestTime',
        width: 130,
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
        title: '備註/狀態',
        key: 'status',
        width: 280,
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
    ],
    [onSaveNote, onShowLogs]
  )

  // ✅ 外部 loading 變 true 時（通常是搜尋/切 tab 重新查）
  // 先不 loadMore，等 dataSource 更新後 reset
  useEffect(() => {
    if (loading) return
  }, [loading])

  // ✅ dataSource 變動重置（搜尋/篩選/換 tab 都會走）
  useEffect(() => {
    const init = dataSource.slice(0, PAGE_SIZE)
    setList(init)
    setLimit(PAGE_SIZE)
    setLoadingMore(false)
    setFinished(dataSource.length <= PAGE_SIZE)
    containerRef.current?.scrollTo({ top: 0 })
  }, [dataSource])

  const loadMore = () => {
    if (loading || loadingMore || finished) return
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
    if (!el || loading || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore()
  }

  return (
    <div className="mt-2">
      {/* ✅ 滾動容器不要 padding（sticky 才不會跑掉） */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey="key"
          loading={loading}
          pagination={false}
          scroll={{ x: 1900 }}
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

        {!loading && finished && list.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}

        {!loading && finished && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">無資料</div>
        )}
      </div>
    </div>
  )
}
