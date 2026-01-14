import { useEffect, useRef, useState } from 'react'
import { Table, Tag, Dropdown, Button, Spin, type MenuProps } from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { GameSettingData } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface GameSettingTableProps {
  dataSource: GameSettingData[]
  onEdit: (record: GameSettingData) => void
  onLog: (record: GameSettingData) => void
  onDelete: (record: GameSettingData) => void
  onSaveRemark: (key: string, newRemark: string) => void
  loading?: boolean
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function GameSettingTable({
  dataSource,
  onEdit,
  onLog,
  onDelete,
  onSaveRemark,
  loading = false,
}: GameSettingTableProps) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<GameSettingData[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const columns: ColumnsType<GameSettingData> = [
    {
      title: '站別',
      dataIndex: 'station',
      key: 'station',
      width: 80,
      align: 'center',
    },
    {
      title: '遊戲類別',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      align: 'center',
    },
    {
      title: '遊戲商名稱',
      dataIndex: 'vendorName',
      key: 'vendorName',
      width: 120,
      align: 'center',
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: '彩金結算',
      dataIndex: 'jackpotSettlement',
      key: 'jackpotSettlement',
      width: 100,
      align: 'center',
      render: (text) => (
        <span className={text === '停用' ? 'text-gray-400' : 'text-green-600'}>
          {text}
        </span>
      ),
    },
    {
      title: '彩金貢獻值(JC/%)',
      dataIndex: 'contribution',
      key: 'contribution',
      width: 140,
      align: 'center',
    },
    {
      title: '遊戲上繳(%)',
      dataIndex: 'gameCap',
      key: 'gameCap',
      width: 120,
      align: 'center',
    },
    {
      title: '負營利狀態',
      dataIndex: 'negativeProfit',
      key: 'negativeProfit',
      width: 120,
      align: 'center',
      render: (text) => (
        <Tag
          color={
            text === '承擔' ? 'green' : text === '不承擔' ? 'red' : 'default'
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: '結算方式',
      key: 'settlement',
      width: 180,
      align: 'center',
      render: (_, r) => (
        <div className="flex flex-col items-center leading-tight">
          <span className="font-bold text-gray-700">{r.settlementType}</span>
          <span className="scale-90 text-[10px] text-gray-500">
            {r.settlementTime}
          </span>
        </div>
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      key: 'remark',
      width: 350,
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
            label: '編輯設定',
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
            key: 'delete',
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
              className="mx-auto flex items-center justify-center gap-1 text-xs text-gray-600"
            >
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // ✅ dataSource 變動重置（搜尋/切 tab/重拉資料）
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
    <div className="rounded-lg bg-white">
      {/* ✅ 滾動容器不要 padding（sticky 才不會跑） */}
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
          size="middle"
          scroll={{ x: 1400 }}
          bordered
          sticky
          rowClassName="hover:bg-gray-50"
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
