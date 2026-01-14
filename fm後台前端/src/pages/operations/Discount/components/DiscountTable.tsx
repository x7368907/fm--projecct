import { useEffect, useRef, useState } from 'react'
import { Table, Button, Dropdown, Spin } from 'antd'
import {
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  DownOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DiscountDataType } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface DiscountTableProps {
  dataSource: DiscountDataType[]
  onEdit: (record: DiscountDataType) => void
  onUpdateNote: (key: string, newNote: string) => void
  onViewLogs: (record: DiscountDataType) => void
}

export default function DiscountTable({
  dataSource,
  onEdit,
  onUpdateNote,
  onViewLogs,
}: DiscountTableProps) {
  /** 無限滾動狀態 */
  const [list, setList] = useState<DiscountDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /** 欄位（原封不動） */
  const columns: ColumnsType<DiscountDataType> = [
    {
      title: '優惠類別',
      dataIndex: 'category',
      key: 'category',
      width: 90,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '優惠名稱',
      key: 'name',
      width: 180,
      fixed: 'left',
      render: (_, r) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{r.name}</span>
          <span className="text-xs text-gray-500">建立者：{r.creator}</span>
        </div>
      ),
    },
    { title: '結算時機', dataIndex: 'timing', width: 90, align: 'center' },
    {
      title: '獎金發放方式',
      children: [
        {
          title: '獎金發放',
          dataIndex: 'fixedAmount',
          width: 100,
          align: 'center',
          render: (v) => (v > 0 ? v.toLocaleString() : '-'),
        },
        {
          title: '公式計算',
          dataIndex: 'formula',
          width: 160,
          align: 'center',
          render: (t) => <span className="text-xs text-gray-600">{t}</span>,
        },
      ],
    },
    {
      title: '必須流水',
      dataIndex: 'requiredFlow',
      align: 'right',
      width: 90,
      render: (v) => v.toLocaleString(),
    },
    {
      title: '申請方式',
      dataIndex: 'applyMethod',
      width: 110,
      align: 'center',
    },
    { title: '派發', dataIndex: 'wallet', width: 90, align: 'center' },
    {
      title: '優惠期限',
      key: 'period',
      width: 120,
      align: 'center',
      render: (_, r) => (
        <div className="text-xs leading-tight text-gray-600">
          <div>{r.periodStart}</div>
          <div className="scale-y-50 text-center text-gray-300">|</div>
          <div>{r.periodEnd}</div>
        </div>
      ),
    },
    { title: '狀態', dataIndex: 'status', width: 90, align: 'center' },
    { title: '限領', dataIndex: 'limitPerUser', width: 80, align: 'center' },
    { title: '已用', dataIndex: 'totalUsage', width: 80, align: 'center' },
    {
      title: '備註',
      dataIndex: 'note',
      key: 'note',
      width: 300,
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newValue) => onUpdateNote(record.key, newValue)}
        />
      ),
    },
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: '編輯',
                icon: <EditOutlined />,
                onClick: () => onEdit(record),
              },
              {
                key: 'handler',
                label: '經手人',
                icon: <FileTextOutlined />,
                onClick: () => onViewLogs(record),
              },
              { key: 'detail', label: '詳情', icon: <EyeOutlined /> },
            ],
          }}
          trigger={['click']}
        >
          <Button
            size="small"
            className="mx-auto flex items-center justify-center gap-1 text-xs text-gray-600"
          >
            管理 <DownOutlined style={{ fontSize: '10px' }} />
          </Button>
        </Dropdown>
      ),
    },
  ]

  /** dataSource 改變時初始化 */
  useEffect(() => {
    setList(dataSource.slice(0, 20))
    setLimit(20)
    setFinished(false)
  }, [dataSource])

  /** 滾動偵測 */
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      loadMore()
    }
  }

  /** 載入更多 */
  const loadMore = () => {
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
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
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
          scroll={{ x: 2000 }}
          pagination={false}
          rowClassName={() => 'align-top'}
          sticky
        />

        {loading && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {finished && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
