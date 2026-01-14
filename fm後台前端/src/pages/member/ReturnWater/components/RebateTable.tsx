import { useEffect, useRef, useState } from 'react'
import { Table, Tag, Button, Select, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { RebateDataType } from '../types'

const { Option } = Select

interface RebateTableProps {
  dataSource: RebateDataType[]
  onShowLog: (record: RebateDataType) => void
}

export default function RebateTable({
  dataSource,
  onShowLog,
}: RebateTableProps) {
  const [list, setList] = useState<RebateDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const TAG_COLOR_MAP: Record<string, string> = {
    裝置黑名單: 'red',
    多重帳號: 'volcano',
    套利疑慮: 'gold',
    新會員: 'blue',
    一般會員: 'default',
  }
  // ===== 欄位（完全沿用你原本的）=====
  const columns: ColumnsType<RebateDataType> = [
    {
      title: '標籤',
      dataIndex: 'tags',
      key: 'tags',
      width: 100,
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag
              key={tag}
              color={TAG_COLOR_MAP[tag] ?? 'default'}
              style={{ marginBottom: 4 }}
            >
              {tag}
            </Tag>
          ))}
        </>
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
      width: 150,
      render: (text) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-400">(金流/成數代理)</div>
        </div>
      ),
    },
    {
      title: '會員帳號/特權',
      dataIndex: 'memberAccount',
      key: 'memberAccount',
      width: 150,
      render: (text) => (
        <div>
          {text}
          <br />
          <Tag color="gold" className="text-[10px]">
            VIP1
          </Tag>
        </div>
      ),
    },
    {
      title: '會員姓名',
      dataIndex: 'memberName',
      key: 'memberName',
      width: 100,
      render: (text) => <a className="text-blue-500">{text}</a>,
    },
    {
      title: '帳號狀態',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (text) => (
        <span className={text === '停用' ? 'text-red-500' : 'text-blue-600'}>
          {text}
        </span>
      ),
    },
    {
      title: '返水結算',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      width: 90,
    },
    {
      title: '註冊 / 登入時間',
      key: 'time',
      width: 160,
      render: (_, record) => (
        <div className="text-xs text-gray-500">
          <div>{record.regTime}</div>
          <div>{record.loginTime}</div>
        </div>
      ),
    },
    {
      title: '結算返水時間(開始)',
      dataIndex: 'returnWaterTimeStart',
      key: 'returnWaterTimeStart',
      width: 120,
    },
    {
      title: '結算返水時間(結束)',
      dataIndex: 'returnWaterTimeEnd',
      key: 'returnWaterTimeEnd',
      width: 120,
    },
    { title: '遊戲類型', dataIndex: 'gameType', key: 'gameType', width: 90 },
    { title: '遊戲商', dataIndex: 'provider', key: 'provider', width: 80 },
    { title: '遊戲名稱', dataIndex: 'gameName', key: 'gameName', width: 120 },
    { title: '有效注', dataIndex: 'validBet', key: 'validBet', width: 80 },
    {
      title: '返水比例(%)',
      dataIndex: 'rebateRatio',
      key: 'rebateRatio',
      width: 110,
    },
    {
      title: '返水點數',
      dataIndex: 'rebateAmount',
      key: 'rebateAmount',
      width: 100,
    },
    {
      title: '管理',
      key: 'manager',
      width: 100,
      render: () => (
        <Select defaultValue="待審核" size="small" className="w-full">
          <Option value="待審核">待審核</Option>
          <Option value="通過">通過</Option>
          <Option value="拒絕">拒絕</Option>
        </Select>
      ),
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
          icon={<FileTextOutlined />}
          onClick={() => onShowLog(record)}
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
        scroll={{ x: 1600 }}
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
