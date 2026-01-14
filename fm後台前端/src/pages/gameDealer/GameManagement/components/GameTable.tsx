import { useEffect, useRef, useState } from 'react'
import { Table, Button, Switch, Dropdown, message, Spin } from 'antd'
import type { MenuProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  DownOutlined,
  EditOutlined,
  StopOutlined,
  EyeOutlined,
  FileTextOutlined,
} from '@ant-design/icons'

import type { GameDataType } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface Props {
  dataSource: GameDataType[]
  onStatusChange: (checked: boolean, key: string) => void
  onSaveRemark: (key: string, newRemark: string) => void
  onEdit: (record: GameDataType) => void
  onLogs: (record: GameDataType) => void
  loading?: boolean
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function GameTable({
  dataSource,
  onStatusChange,
  onSaveRemark,
  onEdit,
  onLogs,
  loading = false,
}: Props) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<GameDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMenuClick = (key: string, record: GameDataType) => {
    if (key === 'edit') onEdit(record)
    else if (key === 'logs') onLogs(record)
    else if (key === 'view') message.info(`檢視詳情: ${record.gameName}`)
  }

  const columns: ColumnsType<GameDataType> = [
    { title: '遊戲類型', dataIndex: 'type', width: 100, align: 'center' },
    { title: 'Game ID', dataIndex: 'gameId', width: 100, align: 'center' },
    {
      title: 'Game Code',
      dataIndex: 'gameCode',
      width: 150,
      render: (t) => <span className="font-mono text-xs">{t}</span>,
    },
    { title: '遊戲名稱', dataIndex: 'gameName', width: 150, align: 'center' },
    {
      title: '遊戲Logo',
      key: 'logo',
      width: 120,
      align: 'center',
      render: () => (
        <Button size="small" icon={<EyeOutlined />} className="text-gray-500">
          檢視
        </Button>
      ),
    },
    { title: 'RTP', dataIndex: 'rtp', width: 100, align: 'center' },
    {
      title: '支援裝置',
      dataIndex: 'device',
      width: 120,
      align: 'center',
      render: (t) => <span className="text-gray-500">{t}</span>,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render: (checked, record) => (
        <Switch
          checked={checked}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={(val) => onStatusChange(val, record.key)}
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
          onSave={(newVal) => onSaveRemark(record.key, newVal)}
        />
      ),
    },
    {
      title: '管理',
      key: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        const menuItems: MenuProps['items'] = [
          {
            key: 'edit',
            label: '編輯設定',
            icon: <EditOutlined />,
            onClick: () => handleMenuClick('edit', record),
          },
          {
            key: 'logs',
            label: '經手人',
            icon: <FileTextOutlined />,
            onClick: () => handleMenuClick('logs', record),
          },
          {
            key: 'view',
            label: '檢視詳細',
            icon: <EyeOutlined />,
            onClick: () => handleMenuClick('view', record),
          },
          { type: 'divider' },
          {
            key: 'disable',
            label: '停用遊戲',
            icon: <StopOutlined />,
            danger: true,
          },
        ]
        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button className="flex w-24 items-center justify-between px-3 text-gray-600">
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
    <div className="rounded-lg bg-white">
      {/* ✅ 這層不要 padding，sticky 才不會跑 */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<GameDataType>
          columns={columns}
          dataSource={list}
          rowKey="key"
          pagination={false}
          sticky
          scroll={{ x: 1200 }}
          bordered
          size="middle"
          rowClassName="hover:bg-gray-50 align-middle"
          loading={loading}
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
