import { useEffect, useRef, useState } from 'react'
import { Table, Space, Tag, Dropdown, Button, Spin } from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  WalletOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  DollarCircleOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import type { DataType } from '../types'
import { MOCK_DATA } from '../utils/fakeData'

interface MemberTableProps {
  onEdit: (record: DataType) => void
  onLogs: (record: DataType) => void
}

export default function MemberTable({ onEdit, onLogs }: MemberTableProps) {
  const [list, setList] = useState<DataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const columns: ColumnsType<DataType> = [
    {
      title: '標籤',
      dataIndex: 'tags',
      width: 100,
      fixed: 'left',
      render: (tags: string[]) => (
        <Space direction="vertical" size={4}>
          {tags.map((tag) => {
            const colorMap: Record<string, string> = {
              裝置黑名單: 'error',
              多重帳號: 'warning',
              套利疑慮: 'gold',
              新會員: 'blue',
              一般會員: 'default',
            }

            return (
              <Tag key={tag} color={colorMap[tag] ?? 'default'}>
                {tag}
              </Tag>
            )
          })}
        </Space>
      ),
    },
    { title: '代理級別', dataIndex: 'agentLevel', width: 80, align: 'center' },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      width: 200,
      render: (text) => (
        <div
          style={{ fontSize: '12px', whiteSpace: 'pre-line', lineHeight: 1.4 }}
        >
          {text}
        </div>
      ),
    },
    {
      title: '會員帳號 / 特權',
      dataIndex: 'memberAccount',
      width: 140,
      render: (text) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>VIP1-一般會員</div>
        </div>
      ),
    },
    { title: '會員姓名', dataIndex: 'memberName', width: 90 },
    { title: '金流群組', dataIndex: 'paymentGroup', width: 90 },
    {
      title: '帳號狀態',
      dataIndex: 'status',
      width: 100,
      render: (status, record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: record.statusNote ? '#ff4d4f' : '#333' }}>
            {status}
          </div>
          {record.statusNote && (
            <div style={{ color: '#ff4d4f', fontSize: '12px' }}>
              {record.statusNote}
            </div>
          )}
        </div>
      ),
    },
    { title: '返水結算', dataIndex: 'rebateType', width: 90, align: 'center' },
    {
      title: '實名認證',
      dataIndex: 'isVerified',
      width: 90,
      align: 'center',
      render: (val) => (
        <Tag
          color={val ? '#52c41a' : '#d9d9d9'}
          style={{
            borderRadius: 12,
            padding: '0 8px',
            border: 'none',
            margin: 0,
          }}
        >
          {val ? '已認證' : '未認證'}
        </Tag>
      ),
    },
    {
      title: '銀行卡認證',
      dataIndex: 'bankVerified',
      width: 100,
      align: 'center',
      render: (val) => (
        <Tag
          color={val ? '#52c41a' : '#d9d9d9'}
          style={{
            borderRadius: 12,
            padding: '0 8px',
            border: 'none',
            margin: 0,
          }}
        >
          {val ? '已認證' : '無資料'}
        </Tag>
      ),
    },
    {
      title: '超商認證',
      dataIndex: 'storeVerified',
      width: 90,
      align: 'center',
      render: (val) => {
        const color =
          val === 'success'
            ? '#52c41a'
            : val === 'warning'
              ? '#faad14'
              : '#d9d9d9'
        const text =
          val === 'success' ? '已認證' : val === 'warning' ? '待審核' : '無資料'
        return (
          <Tag
            color={color}
            style={{
              borderRadius: 12,
              padding: '0 8px',
              border: 'none',
              margin: 0,
            }}
          >
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'USDT',
      dataIndex: 'usdt',
      width: 90,
      align: 'center',
      render: (val) => {
        const color =
          val === 'success'
            ? '#52c41a'
            : val === 'warning'
              ? '#faad14'
              : '#d9d9d9'
        const text =
          val === 'success' ? '已認證' : val === 'warning' ? '待審核' : '無資料'
        return (
          <Tag
            color={color}
            style={{
              borderRadius: 12,
              padding: '0 8px',
              border: 'none',
              margin: 0,
            }}
          >
            {text}
          </Tag>
        )
      },
    },
    {
      title: '儲值 / 託售',
      key: 'dw',
      width: 120,
      render: (_, record) => (
        <div style={{ fontSize: '12px', textAlign: 'right' }}>
          <div>{record.depositAmount.toLocaleString()}</div>
          <div style={{ color: '#888' }}>
            {record.withdrawAmount.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      title: '託售次數(週)',
      dataIndex: 'withdrawCount',
      width: 100,
      align: 'center',
    },
    {
      title: '註冊 / 登入時間',
      key: 'time',
      width: 160,
      render: (_, record) => (
        <div style={{ fontSize: '12px', color: '#333' }}>
          <div>{record.registerTime}</div>
          <div style={{ marginTop: 2, color: '#888' }}>{record.loginTime}</div>
        </div>
      ),
    },
    {
      title: '未登入天數',
      dataIndex: 'daysOffline',
      width: 90,
      align: 'center',
    },
    {
      title: '帳戶錢包餘額',
      dataIndex: 'accountBalance',
      width: 130,
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
    {
      title: '遊戲錢包餘額',
      dataIndex: 'gameBalance',
      width: 130,
      align: 'right',
      render: (val) => val.toLocaleString(),
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
                label: '編輯會員',
                icon: <EditOutlined />,
                onClick: () => onEdit(record),
              },
              {
                key: 'wallet',
                label: '錢包紀錄',
                icon: <WalletOutlined />,
                onClick: () => console.log('查看錢包紀錄', record),
              },
              {
                key: 'bank',
                label: '銀行卡資料',
                icon: <CreditCardOutlined />,
                onClick: () => console.log('查看銀行卡', record),
              },
              {
                key: 'bet',
                label: '下注紀錄',
                icon: <HistoryOutlined />,
                onClick: () => console.log('查看下注紀錄', record),
              },
              {
                key: 'rebate',
                label: '返水紀錄',
                icon: <DollarCircleOutlined />,
                onClick: () => console.log('查看返水紀錄', record),
              },
              {
                key: 'message',
                label: '訊息發送',
                icon: <MessageOutlined />,
                onClick: () => console.log('發送訊息', record),
              },
              {
                key: 'handler',
                label: '經手人',
                icon: <FileTextOutlined />,
                onClick: () => onLogs(record),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button size="small" style={{ fontSize: 12 }}>
            管理 <DownOutlined style={{ fontSize: 10 }} />
          </Button>
        </Dropdown>
      ),
    },
  ]

  /** 初始化 */
  useEffect(() => {
    setList(MOCK_DATA.slice(0, 20))
    setLimit(20)
    setFinished(false)
  }, [])

  /** 滾動 */
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
      const next = MOCK_DATA.slice(0, newLimit)

      setList(next)
      setLimit(newLimit)
      setLoading(false)

      if (next.length >= MOCK_DATA.length) {
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
        scroll={{ x: 2500 }}
        pagination={false}
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
  )
}
