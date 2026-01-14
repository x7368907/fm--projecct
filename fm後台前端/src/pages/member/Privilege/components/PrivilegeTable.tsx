import { useEffect, useRef, useState } from 'react'
import { Table, Tag, Progress, Dropdown, Button, Spin } from 'antd'
import { DownOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { PrivilegeDataType } from '../types'

interface PrivilegeTableProps {
  dataSource: PrivilegeDataType[]
  onEdit: (record: PrivilegeDataType) => void
  onShowLog: (record: PrivilegeDataType) => void
}

export default function PrivilegeTable({
  dataSource,
  onEdit,
  onShowLog,
}: PrivilegeTableProps) {
  const [list, setList] = useState<PrivilegeDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // ===== Helper: 生成巢狀返水欄位（原封不動）=====
  const createRebateColumn = (
    title: string,
    dataKey: keyof PrivilegeDataType['rebates']
  ) => ({
    title: (
      <div className="text-center text-xs font-bold text-gray-600">
        {title}
        <br />
        (%)
      </div>
    ),
    children: [
      {
        title: <span className="text-orange-400">時</span>,
        dataIndex: ['rebates', dataKey, 'hour'],
        key: `${dataKey}_hour`,
        width: 60,
        align: 'center' as const,
        render: (val: any) => <span className="text-orange-400">{val}</span>,
      },
      {
        title: <span className="text-blue-600">日</span>,
        dataIndex: ['rebates', dataKey, 'day'],
        key: `${dataKey}_day`,
        width: 60,
        align: 'center' as const,
        render: (val: any) => (
          <span className="font-bold text-blue-600">{val}</span>
        ),
      },
      {
        title: '週',
        dataIndex: ['rebates', dataKey, 'week'],
        key: `${dataKey}_week`,
        width: 60,
        align: 'center' as const,
        render: (val: any) => <span className="text-gray-600">{val}</span>,
      },
    ],
  })

  // ===== Helper: 進度條渲染（原封不動）=====
  const renderProgress = (current: number, target: number) => {
    const percent = target > 0 ? Math.round((current / target) * 100) : 0
    if (current === 0 && target === 0)
      return <div className="text-center">-</div>

    return (
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{current.toLocaleString()}</span>/
          <span>{target.toLocaleString()}</span>
        </div>
        <Progress percent={percent} size="small" showInfo={false} />
      </div>
    )
  }

  // ===== 欄位（原封不動）=====
  const columns: ColumnsType<PrivilegeDataType> = [
    {
      title: '會員帳號 / 特權',
      dataIndex: 'account',
      key: 'account',
      width: 150,
      fixed: 'left',
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-bold text-gray-700">{record.account}</span>
          <span className="text-xs text-gray-500">{record.vipLevel}</span>
        </div>
      ),
    },
    {
      title: '會員姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
    },
    {
      title: '帳號狀態',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'enable' ? 'success' : 'error'}>
          {status === 'enable' ? '啟用' : '停用'}
        </Tag>
      ),
    },
    {
      title: '儲值進度',
      key: 'depositProgress',
      width: 200,
      render: (_, record) =>
        renderProgress(
          record.depositProgress.current,
          record.depositProgress.target
        ),
    },
    {
      title: '有效投注(保級)進度',
      key: 'bettingProgress',
      width: 200,
      render: (_, record) =>
        renderProgress(
          record.bettingProgress.current,
          record.bettingProgress.target
        ),
    },
    {
      title: '有效投注(升級)進度',
      key: 'updateProgress',
      width: 200,
      render: (_, record) =>
        renderProgress(
          record.updateProgress.current,
          record.updateProgress.target
        ),
    },
    {
      title: '升級紅利',
      dataIndex: 'upgradeBonus',
      key: 'upgradeBonus',
      width: 100,
      align: 'center',
    },
    {
      title: '儲值回饋金(%)',
      dataIndex: 'topUpBonus',
      key: 'topUpBonus',
      width: 120,
      align: 'center',
    },
    {
      title: '生日禮金',
      dataIndex: 'birthDateBonus',
      key: 'birthDateBonus',
      width: 100,
      align: 'center',
    },
    {
      title: '每日托售',
      key: 'consignment',
      width: 100,
      align: 'center',
      render: (_, record) => `${record.consignment}/${record.totalConsignment}`,
    },
    createRebateColumn('電子 / 捕魚返水', 'electronic'),
    createRebateColumn('真人返水', 'live'),
    createRebateColumn('棋牌返水', 'chess'),
    createRebateColumn('彩票返水', 'lottery'),
    createRebateColumn('體育返水', 'sports'),
    {
      title: '管理',
      key: 'action',
      fixed: 'right',
      width: 100,
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
                icon: <FileTextOutlined className="text-lg text-black" />,
                onClick: () => onShowLog(record),
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
    <div
      ref={containerRef}
      style={{ maxHeight: 600, overflowY: 'auto' }}
      onScroll={handleScroll}
    >
      <Table
        columns={columns as any}
        dataSource={list}
        scroll={{ x: 2200 }}
        bordered
        size="middle"
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
