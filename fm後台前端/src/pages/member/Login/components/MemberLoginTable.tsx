import { useEffect, useRef, useState } from 'react'
import { Table, Tag, Badge, Dropdown, Button, Checkbox, Spin } from 'antd'
import { DownOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { MemberLoginType } from '../types'

interface CheckboxState {
  selectedKeys: React.Key[]
  isAllSelected: boolean
  isIndeterminate: boolean
  onSelectAll: (e: CheckboxChangeEvent) => void
  onSelect: (key: string, checked: boolean) => void
}

interface MemberLoginTableProps {
  dataSource: MemberLoginType[]
  ipState: CheckboxState
  deviceState: CheckboxState
  onEdit: (record: MemberLoginType) => void
  onShowLog: (record: MemberLoginType) => void
}

export default function MemberLoginTable({
  dataSource,
  ipState,
  deviceState,
  onEdit,
  onShowLog,
}: MemberLoginTableProps) {
  const [list, setList] = useState<MemberLoginType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /** 欄位（完全沿用你原本的） */
  const columns: any = [
    {
      title: '標籤',
      dataIndex: 'tags',
      key: 'tags',
      width: 100,
      render: (tags: string[]) => (
        <div className="flex flex-col gap-1">
          {tags.map((tag) => {
            let color = 'default'
            if (tag === 'IP黑名單' || tag === '常客黑名單') color = 'error'
            return (
              <Tag color={color} key={tag} className="mr-0 w-fit">
                {tag}
              </Tag>
            )
          })}
        </div>
      ),
    },
    {
      title: '代理級別',
      dataIndex: 'agentLevel',
      key: 'agentLevel',
      width: 80,
    },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      key: 'agentName',
      render: (text: string, record: any) => (
        <div>
          <div className="font-bold">{text}</div>
          <div className="text-xs text-gray-400">{record.agentSubInfo}</div>
        </div>
      ),
    },
    {
      title: '會員帳號 / 特權',
      dataIndex: 'account',
      key: 'account',
      render: (text: string, record: any) => (
        <div>
          <div className="cursor-pointer font-bold text-blue-600">{text}</div>
          <div className="text-xs text-gray-500">{record.privilege}</div>
        </div>
      ),
    },
    { title: '會員姓名', dataIndex: 'name', key: 'name' },
    {
      title: '註冊 / 登入時間',
      dataIndex: 'registerTime',
      key: 'registerTime',
      width: 160,
      render: (text: string, record: any) => (
        <div className="text-xs">
          <div>{text}</div>
          <div className="text-orange-500">{record.loginTime}</div>
        </div>
      ),
    },
    {
      title: '未登入天數',
      dataIndex: 'daysOffline',
      key: 'daysOffline',
      align: 'center',
    },
    { title: '國家', dataIndex: 'country', key: 'country' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    {
      title: (
        <div className="flex items-center gap-1">
          IP
          <Checkbox
            className="text-xs"
            checked={ipState.isAllSelected}
            indeterminate={ipState.isIndeterminate}
            onChange={ipState.onSelectAll}
          >
            一鍵全選
          </Checkbox>
        </div>
      ),
      width: 240,
      dataIndex: 'ip',
      key: 'ip',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2">
          <span>{text}</span>
          <Checkbox
            checked={ipState.selectedKeys.includes(record.key)}
            onChange={(e) => ipState.onSelect(record.key, e.target.checked)}
          />
        </div>
      ),
    },
    { title: '裝置', dataIndex: 'deviceType', key: 'deviceType', width: 80 },
    {
      title: (
        <div className="flex items-center gap-1">
          裝置
          <Checkbox
            className="text-xs"
            checked={deviceState.isAllSelected}
            indeterminate={deviceState.isIndeterminate}
            onChange={deviceState.onSelectAll}
          >
            一鍵全選
          </Checkbox>
        </div>
      ),
      dataIndex: 'deviceId',
      key: 'deviceId',
      width: 160,
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="max-w-[150px] truncate" title={text}>
            {text}
          </span>
          <Checkbox
            checked={deviceState.selectedKeys.includes(record.key)}
            onChange={(e) => deviceState.onSelect(record.key, e.target.checked)}
          />
        </div>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === '啟用' ? 'success' : 'error'} text={status} />
      ),
    },
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_: any, record: any) => (
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
                icon: <FileTextOutlined className="text-lg" />,
                onClick: () => onShowLog(record),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button size="small" style={{ fontSize: '12px' }}>
            管理 <DownOutlined style={{ fontSize: '10px' }} />
          </Button>
        </Dropdown>
      ),
    },
  ]

  /** 初始化 / dataSource 變動時重置 */
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
    <div className="overflow-hidden rounded-lg bg-white p-4 shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 1500 }}
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
    </div>
  )
}
