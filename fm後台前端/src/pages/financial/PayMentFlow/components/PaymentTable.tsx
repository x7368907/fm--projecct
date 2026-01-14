import { useEffect, useRef, useState } from 'react'
import {
  Table,
  Tag,
  Switch,
  Button,
  Dropdown,
  Spin,
  type MenuProps,
} from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import type { DataType } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface PaymentTableProps {
  dataSource: DataType[]
  onEdit: (record: DataType) => void
  onLogs: (record: DataType) => void
  onSaveRemark: (key: string, value: string) => void
}

export default function PaymentTable({
  dataSource,
  onEdit,
  onLogs,
  onSaveRemark,
}: PaymentTableProps) {
  /** ===== 無限滾動狀態 ===== */
  const [list, setList] = useState<DataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /** ===== columns（原封不動） ===== */
  const columns: ColumnsType<DataType> = [
    {
      title: '款項類別',
      dataIndex: 'category',
      width: 90,
      render: (val) =>
        val === 'deposit' ? (
          <Tag color="blue">儲值</Tag>
        ) : (
          <Tag color="orange">託售</Tag>
        ),
    },
    { title: '金流類型', dataIndex: 'type', width: 110 },
    { title: '金流名稱', dataIndex: 'name', width: 110 },
    { title: '顯示名稱', dataIndex: 'displayName', width: 160 },
    {
      title: '商家代碼',
      dataIndex: 'merchantId',
      width: 150,
      render: (text) => (
        <span className="whitespace-nowrap font-mono text-gray-600">
          {text}
        </span>
      ),
    },
    {
      title: 'HashKey / 廠商信託碼',
      dataIndex: 'hashKey',
      width: 220,
      render: (text) => (
        <div className="max-w-[220px] break-all font-mono text-xs text-gray-500">
          {text}
        </div>
      ),
    },
    {
      title: 'HashIV / 系統信託碼',
      dataIndex: 'hashIv',
      width: 200,
      render: (text) => (
        <div className="max-w-[200px] break-all font-mono text-xs text-gray-500">
          {text}
        </div>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      align: 'center',
      width: 100,
      render: (checked) => (
        <Switch
          checked={checked}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          style={{ backgroundColor: checked ? '#22c55e' : undefined }}
        />
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      width: 250,
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newValue) => onSaveRemark(record.key, newValue)}
        />
      ),
    },
    {
      title: '管理',
      key: 'action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        const menuItems: MenuProps['items'] = [
          {
            key: 'edit',
            label: '編輯',
            icon: <EditOutlined />,
            onClick: () => onEdit(record),
          },
          {
            key: 'logs',
            label: '經手人',
            icon: <FileTextOutlined />,
            onClick: () => onLogs(record),
          },
          { type: 'divider' },
          {
            key: 'disable',
            label: '停用',
            icon: <StopOutlined />,
            danger: true,
          },
        ]

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button
              size="small"
              className="mx-auto flex items-center justify-center gap-1 text-xs text-gray-600"
            >
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  /** ===== 初始化 / dataSource 變動 ===== */
  useEffect(() => {
    setList(dataSource.slice(0, 20))
    setLimit(20)
    setFinished(false)
  }, [dataSource])

  /** ===== 滾動偵測 ===== */
  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || finished) return

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      loadMore()
    }
  }

  /** ===== 載入更多 ===== */
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
    <div className="rounded-b-lg bg-white shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey="key"
          pagination={false}
          size="middle"
          scroll={{ x: 'max-content' }}
          rowClassName="align-top hover:bg-gray-50"
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
