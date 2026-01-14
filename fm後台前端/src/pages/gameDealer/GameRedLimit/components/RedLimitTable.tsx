import { useEffect, useRef, useState } from 'react'
import { Table, Button, Dropdown, Spin, type MenuProps } from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { RedLimitDataType } from '../types'

interface Props {
  dataSource: RedLimitDataType[]
  loading?: boolean
  onEdit: (record: RedLimitDataType) => void
  onLog: (record: RedLimitDataType) => void
  onDelete: (record: RedLimitDataType) => void
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function RedLimitTable({
  dataSource,
  loading = false,
  onEdit,
  onLog,
  onDelete,
}: Props) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<RedLimitDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 定義欄位
  const columns: ColumnsType<RedLimitDataType> = [
    {
      title: '遊戲類型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      align: 'center',
    },
    {
      title: '遊戲名稱',
      dataIndex: 'gameName',
      key: 'gameName',
      width: 150,
      align: 'center',
    },
    {
      title: '廳別',
      dataIndex: 'hallCode',
      key: 'hallCode',
      width: 120,
      align: 'center',
      render: (t) => <span className="font-semibold text-gray-700">{t}</span>,
    },
    {
      title: '下注最低限紅',
      dataIndex: 'minBet',
      key: 'minBet',
      width: 150,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '下注最高限紅',
      dataIndex: 'maxBet',
      key: 'maxBet',
      width: 150,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '單日最大輸額限制',
      dataIndex: 'maxLoss',
      key: 'maxLoss',
      width: 160,
      align: 'center',
      render: (v) => (v === 0 ? '-' : v.toLocaleString()),
    },
    {
      title: '單日最大贏額限制',
      dataIndex: 'maxWin',
      key: 'maxWin',
      width: 160,
      align: 'center',
      render: (v) => (v === 0 ? '-' : v.toLocaleString()),
    },
    {
      title: '管理',
      key: 'action',
      width: 100,
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
            onClick: () => onLog(record),
          },
          { type: 'divider' },
          {
            key: 'disable',
            label: '刪除',
            icon: <StopOutlined />,
            danger: true,
            onClick: () => onDelete(record),
          },
        ]
        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button
              size="small"
              className="mx-auto flex items-center justify-between gap-1 px-3 text-gray-600"
            >
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // ✅ dataSource 變動就重置（搜尋/切 tab/重拉資料）
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

    // 之後接 API：把 setTimeout 換成 await fetchMore()
    setTimeout(() => {
      const nextLimit = limit + PAGE_SIZE
      const next = dataSource.slice(0, nextLimit)

      setList(next)
      setLimit(nextLimit)
      setLoadingMore(false)

      if (next.length >= dataSource.length) setFinished(true)
    }, 350)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore()
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* ✅ 這層不要 padding，sticky 才不會跑 */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<RedLimitDataType>
          columns={columns}
          dataSource={list}
          rowKey="key"
          loading={loading}
          pagination={false}
          sticky
          size="middle"
          scroll={{ x: 1200 }}
          bordered
          rowClassName="hover:bg-gray-50 align-middle"
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
