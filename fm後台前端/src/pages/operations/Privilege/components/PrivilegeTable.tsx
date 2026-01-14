import { useEffect, useRef, useState } from 'react'
import { Table, Button, Dropdown, Spin } from 'antd'
import { EditOutlined, FileTextOutlined, DownOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DataType } from '../types'
import { createRebateGroup } from '../hook/columnsHelper'

interface PrivilegeTableProps {
  dataSource: DataType[]
  onEdit: (record: DataType) => void
  onViewLogs: (record: DataType) => void
}

export default function PrivilegeTable({
  dataSource,
  onEdit,
  onViewLogs,
}: PrivilegeTableProps) {
  /** ===== 無限滾動狀態 ===== */
  const [list, setList] = useState<DataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  /** ===== 欄位（原封不動） ===== */
  const columns: ColumnsType<DataType> = [
    {
      title: '編號',
      dataIndex: 'no',
      width: 60,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '特權類型',
      dataIndex: 'type',
      width: 120,
      align: 'center',
      fixed: 'left',
    },
    { title: '存款要求', dataIndex: 'depositReq', width: 100, align: 'center' },
    {
      title: '有效投注(保級)進度',
      dataIndex: 'validBet',
      width: 150,
      align: 'center',
    },
    {
      title: '有效投注(升級)進度',
      dataIndex: 'validBetUpgrade',
      width: 150,
      align: 'center',
    },
    {
      title: '升級紅利',
      dataIndex: 'upgradeBonus',
      width: 100,
      align: 'center',
    },
    {
      title: '儲值回饋金(%)',
      dataIndex: 'rebateRatio',
      width: 120,
      align: 'center',
    },
    {
      title: '生日禮金',
      dataIndex: 'birthdayBonus',
      width: 100,
      align: 'center',
    },
    {
      title: '每日託售次數',
      dataIndex: 'dailyWithdrawCount',
      width: 120,
      align: 'center',
    },
    {
      title: '每日託售額度',
      dataIndex: 'dailyWithdrawLimit',
      width: 120,
      align: 'center',
    },

    // Helper 產生欄位（不動）
    createRebateGroup('真人返水(%)', 'live'),
    createRebateGroup('電子返水(%)', 'elec'),
    createRebateGroup('體育返水(%)', 'sport'),
    createRebateGroup('彩票返水(%)', 'lottery'),
    createRebateGroup('棋牌返水(%)', 'card'),
    createRebateGroup('捕魚返水(%)', 'fish'),

    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 80,
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
              { key: 'details', label: '詳情' },
            ],
          }}
          trigger={['click']}
        >
          <Button
            size="small"
            className="mx-auto flex items-center justify-center gap-1 text-xs text-gray-600"
          >
            管理 <DownOutlined style={{ fontSize: 10 }} />
          </Button>
        </Dropdown>
      ),
    },
  ]

  /** ===== 初始化 / dataSource 改變 ===== */
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
    <div className="rounded-lg bg-white shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        onScroll={handleScroll}
        className="p-4"
      >
        <Table
          columns={columns}
          dataSource={list}
          bordered
          size="middle"
          scroll={{ x: 2500 }}
          pagination={false}
          rowClassName="align-top"
          // 之後若需要固定表頭
          // sticky
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
