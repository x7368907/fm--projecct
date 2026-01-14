import { useEffect, useRef, useState } from 'react'
import { Table, Button, Select, Spin, Tag } from 'antd' // 1. 引入 Tag
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { BankCardType } from '../types'
import EditableNoteCell from './EditableNoteCell'

const { Option } = Select

interface BankCardTableProps {
  data: BankCardType[]
  onUpdateNote: (key: React.Key, newNote: string) => void
  onFetchLogs: (record: BankCardType) => void
}

export default function BankCardTable({
  data,
  onUpdateNote,
  onFetchLogs,
}: BankCardTableProps) {
  const [list, setList] = useState<BankCardType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ===== 欄位 =====
  const columns: ColumnsType<BankCardType> = [
    {
      title: '標籤',
      dataIndex: 'tag',
      key: 'tag',
      width: 160,
      align: 'center',
      fixed: 'left',
      render: (text, record) => {
        // 3. 修改樣式邏輯：對齊託售申請頁面
        if (record.tagType === 'danger' || record.tagType === 'ip_black') {
          return <Tag color="error">{text}</Tag>
        }
        if (record.tagType === 'money_black') {
          return <Tag color="magenta">{text}</Tag>
        }
        if (record.tagType === 'new') {
          return <Tag color="success">{text}</Tag>
        }
        // 預設 (一般會員樣式)
        return (
          <Tag bordered={false} className="bg-gray-100 text-gray-600">
            {text}
          </Tag>
        )
      },
    },
    { title: '會員帳號', dataIndex: 'account', key: 'account', width: 120 },
    { title: '會員姓名', dataIndex: 'name', key: 'name', width: 100 },
    {
      title: '資料提交時間',
      dataIndex: 'submitTime',
      key: 'submitTime',
      width: 110,
      render: (text) => (
        <div className="text-xs text-gray-500">
          {text.split(' ').map((t: string, i: number) => (
            <div key={i}>{t}</div>
          ))}
        </div>
      ),
    },
    {
      title: '帳號狀態',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (text) => (
        <span className={text === '停用' ? 'text-red-500' : 'text-green-600'}>
          {text}
        </span>
      ),
    },
    {
      title: '金流類型',
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: 180,
      render: (text) => {
        const parts = text.split('(')
        return parts.length > 1 ? (
          <div>
            <div>{parts[0]}</div>
            <div className="text-xs text-gray-400">({parts[1]}</div>
          </div>
        ) : (
          text
        )
      },
    },
    { title: '名稱', dataIndex: 'bankName', key: 'bankName', width: 120 },
    {
      title: '帳號 / 卡號',
      dataIndex: 'cardNumber',
      key: 'cardNumber',
      width: 200,
      render: (text) => <div className="break-all text-xs">{text}</div>,
    },
    {
      title: '圖片1',
      key: 'image1',
      width: 80,
      align: 'center',
      render: (_, record) =>
        record.hasImage1 ? (
          <Button
            size="small"
            type="primary"
            className="border-none bg-green-500 hover:bg-green-400"
          >
            檢視
          </Button>
        ) : (
          '-'
        ),
    },
    {
      title: '圖片2',
      key: 'image2',
      width: 80,
      align: 'center',
      render: (_, record) =>
        record.hasImage2 ? (
          <Button
            size="small"
            type="primary"
            className="border-none bg-green-500 hover:bg-green-400"
          >
            檢視
          </Button>
        ) : (
          '-'
        ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      key: 'remark',
      width: 200,
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newValue) => onUpdateNote(record.key, newValue)}
        />
      ),
    },
    {
      title: '處理情況',
      key: 'processStatus',
      width: 130,
      render: (_, record) => {
        let defaultValue = '待審核'
        if (record.processStatus === '拒絕') defaultValue = '拒絕'
        else if (record.status === '停用') defaultValue = '停用'
        else if (record.status === '啟用') defaultValue = '啟用'

        return (
          <Select
            defaultValue={defaultValue}
            size="small"
            className="w-full"
            onChange={(val) =>
              console.log(`變更狀態: ${record.account} -> ${val}`)
            }
          >
            <Option value="待審核">待審核</Option>
            <Option value="啟用">啟用</Option>
            <Option value="拒絕">拒絕</Option>
            <Option value="停用">停用</Option>
          </Select>
        )
      },
    },
    {
      title: '經手人',
      key: 'handler',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          type="text"
          icon={<FileTextOutlined className="text-lg text-gray-600" />}
          onClick={() => onFetchLogs(record)}
        />
      ),
    },
  ]

  /** 初始 / data 變動時重置 */
  useEffect(() => {
    setList(data.slice(0, 20))
    setLimit(20)
    setFinished(false)
  }, [data])

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
      const next = data.slice(0, newLimit)

      setList(next)
      setLimit(newLimit)
      setLoading(false)

      if (next.length >= data.length) {
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
  )
}
