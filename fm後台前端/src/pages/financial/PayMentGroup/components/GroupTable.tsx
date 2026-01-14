import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Tabs,
  Table,
  Segmented,
  Tag,
  Switch,
  Dropdown,
  Button,
  Spin,
  type MenuProps,
} from 'antd'
import {
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
  DownOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

import type { GroupDataType } from '../types'
import EditableNoteCell from './EditableNoteCell'

interface GroupListProps {
  dataSource: GroupDataType[]
  onEdit: (record: GroupDataType) => void
  onLogs: (record: GroupDataType) => void
  onStatusChange: (checked: boolean, key: string) => void
  onSaveRemark: (key: string, newRemark: string) => void
  onDisable: (record: GroupDataType) => void
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function GroupList({
  dataSource,
  onEdit,
  onLogs,
  onStatusChange,
  onSaveRemark,
  onDisable,
}: GroupListProps) {
  // 列表內部的 UI 狀態 (Tabs & Segmented)
  const [activeTab, setActiveTab] = useState('general')
  const [transactionType, setTransactionType] = useState('儲值')

  // 前端篩選邏輯 (根據 props 傳進來的 dataSource 做篩選)
  const filteredDataSource = useMemo(() => {
    return dataSource.filter((item) => item.category === transactionType)
  }, [dataSource, transactionType])

  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<GroupDataType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 表格欄位定義
  const columns: ColumnsType<GroupDataType> = [
    {
      title: '數值類別',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      fixed: 'left',
      align: 'center',
      render: (text) => (
        <Tag color={text === '儲值' ? 'blue' : 'orange'}>{text}</Tag>
      ),
    },
    { title: '金流類型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '金流名稱', dataIndex: 'name', key: 'name', width: 100 },
    {
      title: '顯示名稱',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 140,
      ellipsis: true,
    },
    {
      title: '匯率',
      dataIndex: 'rate',
      key: 'rate',
      width: 70,
      align: 'center',
    },
    {
      title: '儲值範圍',
      key: 'range',
      width: 160,
      render: (_, r) => (
        <span className="text-gray-600">
          {r.minDeposit.toLocaleString()} ~ {r.maxDeposit.toLocaleString()}
        </span>
      ),
    },
    {
      title: '免手續費',
      dataIndex: 'freeFeeCount',
      key: 'freeFeeCount',
      width: 90,
      align: 'center',
      render: (v) => `${v} 次`,
    },
    {
      title: '手續費',
      key: 'fee',
      width: 140,
      render: (_, r) => (
        <span className="text-xs">
          {r.feePercent}% (低消 ${r.minFeeAmount})
        </span>
      ),
    },
    {
      title: '累計儲值',
      dataIndex: 'totalDeposit',
      key: 'totalDeposit',
      width: 130,
      align: 'right',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '總計金額',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      width: 130,
      align: 'right',
      render: (v) => <b className="text-teal-600">{v.toLocaleString()}</b>,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 90,
      render: (checked, record) => (
        <Switch
          checked={checked}
          onChange={(val) => onStatusChange(val, record.key)}
          style={{ backgroundColor: checked ? '#22c55e' : undefined }}
        />
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
          onSave={(val) => onSaveRemark(record.key, val)}
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
            onClick: () => onDisable(record),
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

  // Tabs 選項
  const tabItems = [
    { key: 'general', label: '一般會員' },
    { key: 'credit', label: '信用代理' },
    { key: 'usdt', label: 'USDT' },
    { key: 'principal', label: '本金會員' },
    { key: 'test', label: '測試用' },
  ]

  // ✅ 篩選結果變動時（切 Segmented / 重新拿資料），重置無限滾動
  useEffect(() => {
    setList(filteredDataSource.slice(0, PAGE_SIZE))
    setLimit(PAGE_SIZE)
    setLoadingMore(false)
    setFinished(filteredDataSource.length <= PAGE_SIZE)
    // 讓滾動回到頂部（體感更像換資料）
    containerRef.current?.scrollTo({ top: 0 })
  }, [filteredDataSource])

  const loadMore = () => {
    if (loadingMore || finished) return
    setLoadingMore(true)

    setTimeout(() => {
      const newLimit = limit + PAGE_SIZE
      const next = filteredDataSource.slice(0, newLimit)

      setList(next)
      setLimit(newLimit)
      setLoadingMore(false)

      if (next.length >= filteredDataSource.length) setFinished(true)
    }, 400)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      loadMore()
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems.map((tab) => ({
          label: tab.label,
          key: tab.key,
          children: (
            <div className="mt-4">
              {/* 儲值/託售 切換 (Segmented) */}
              <div className="mb-4">
                <Segmented
                  options={['儲值', '託售']}
                  value={transactionType}
                  onChange={(val) => setTransactionType(val as string)}
                  size="middle"
                />
              </div>

              {/* ✅ 無限滾動容器：不要 padding */}
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
                  scroll={{ x: 1600 }}
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
                  <div className="py-10 text-center text-sm text-gray-400">
                    無資料
                  </div>
                )}
              </div>
            </div>
          ),
        }))}
        type="card"
        className="custom-tabs"
      />
    </div>
  )
}
