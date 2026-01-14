import { useEffect, useRef, useState } from 'react'
import { Table, Button, Tag, Select, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DiscountDataType, AuditStatusType } from '../types'
import EditableNoteCell from './EditableNoteCell'

const { Option } = Select

interface DiscountTableProps {
  dataSource: DiscountDataType[]
  onUpdateRemark: (key: string, newVal: string) => void
  onStatusChange: (key: string, newStatus: AuditStatusType) => void
  onFetchLogs: (record: DiscountDataType) => void
}

export default function DiscountTable({
  dataSource,
  onUpdateRemark,
  onStatusChange,
  onFetchLogs,
}: DiscountTableProps) {
  const [list, setList] = useState<DiscountDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ===== 欄位（完全沿用你原本的）=====
  const columns: ColumnsType<DiscountDataType> = [
    { title: '代理級別', dataIndex: 'agentLevel', width: 80, align: 'center' },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      width: 200,
      render: (text) => (
        <div className="whitespace-pre-line text-xs leading-relaxed">
          {text}
        </div>
      ),
    },
    {
      title: '會員帳號 / 特權',
      dataIndex: 'memberAccount',
      width: 150,
      render: (text, record) => (
        <div>
          <div className="font-semibold">{text}</div>
          <div className="text-xs text-gray-500">{record.privilege}</div>
        </div>
      ),
    },
    { title: '會員姓名', dataIndex: 'memberName', width: 90, align: 'center' },
    {
      title: '帳號狀態',
      dataIndex: 'accountStatus',
      width: 90,
      align: 'center',
      render: (val) => (
        <Tag color={val === 'active' ? 'green' : 'red'}>
          {val === 'active' ? '啟用' : '停用'}
        </Tag>
      ),
    },
    {
      title: '優惠類別',
      dataIndex: 'discountType',
      width: 90,
      align: 'center',
      render: (val) => <Tag>{val}</Tag>,
    },
    {
      title: '優惠名稱',
      dataIndex: 'discountName',
      width: 180,
      render: (text) => (
        <div className="whitespace-pre-line text-xs leading-relaxed">
          {text}
        </div>
      ),
    },
    {
      title: '獎勵點數',
      dataIndex: 'bonusAmount',
      width: 100,
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
    {
      title: '必須流水',
      dataIndex: 'turnoverReq',
      width: 100,
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
    {
      title: '領取次數',
      dataIndex: 'withdrawCount',
      width: 90,
      align: 'center',
    },
    {
      title: '申請方式',
      dataIndex: 'applyMethod',
      width: 120,
      align: 'center',
      render: (text) => <div className="text-xs">{text}</div>,
    },
    {
      title: '領取方式',
      dataIndex: 'collectionMethod',
      width: 90,
      align: 'center',
      render: (text) => <div className="text-xs">{text}</div>,
    },
    {
      title: '優惠申請時間',
      dataIndex: 'applyTime',
      width: 120,
      render: (text) => (
        <div className="whitespace-pre-line text-xs text-gray-600">{text}</div>
      ),
    },
    {
      title: '核准確認時間',
      dataIndex: 'auditTime',
      width: 120,
      render: (text) => (
        <div className="whitespace-pre-line text-xs text-gray-600">
          {text || '-'}
        </div>
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      width: 220,
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newVal) => onUpdateRemark(record.key, newVal)}
        />
      ),
    },
    {
      title: '審核狀態',
      dataIndex: 'auditStatus',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (val, record) => (
        <Select
          value={val}
          size="small"
          className="w-full text-center"
          onChange={(newVal) => onStatusChange(record.key, newVal)}
          status={val === 'rejected' || val === 'disabled' ? 'error' : ''}
        >
          <Option value="pending">待審核</Option>
          <Option value="active">啟用</Option>
          <Option value="rejected">拒絕</Option>
          <Option value="disabled">停用</Option>
        </Select>
      ),
    },
    {
      title: '經手人',
      key: 'handler',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Button
          type="text"
          icon={<FileTextOutlined style={{ fontSize: 20, color: '#000' }} />}
          onClick={() => onFetchLogs(record)}
        />
      ),
    },
  ]

  /** 初始 / dataSource 變動時重置 */
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
    <div
      ref={containerRef}
      style={{ maxHeight: 600, overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <Table
        columns={columns}
        dataSource={list}
        scroll={{ x: 2000 }}
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
  )
}
