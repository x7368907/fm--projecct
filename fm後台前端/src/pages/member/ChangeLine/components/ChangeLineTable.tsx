import { useEffect, useRef, useState } from 'react'
import { Table, Tag, Button, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FileTextOutlined } from '@ant-design/icons'
import type { ChangeLineDataType } from '../types'

interface ChangeLineTableProps {
  dataSource: ChangeLineDataType[]
  onViewLog: (record: ChangeLineDataType) => void
}

export default function ChangeLineTable({
  dataSource,
  onViewLog,
}: ChangeLineTableProps) {
  const [list, setList] = useState<ChangeLineDataType[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const columns: ColumnsType<ChangeLineDataType> = [
    {
      title: '數據轉移方式',
      dataIndex: 'transferMethod',
      width: 150,
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs">{text}</div>
      ),
    },
    { title: '代理層級(舊)', dataIndex: 'oldAgentLevel', width: 100 },
    {
      title: '代理名稱(舊)',
      dataIndex: 'oldAgentName',
      width: 150,
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs">{text}</div>
      ),
    },
    { title: '會員帳號(舊)', dataIndex: 'oldMemberAccount', width: 150 },
    { title: '特權等級(舊)', dataIndex: 'oldPrivilegeLevel', width: 150 },
    { title: '代理層級(新)', dataIndex: 'newAgentLevel', width: 100 },
    {
      title: '代理名稱(新)',
      dataIndex: 'newAgentName',
      width: 150,
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs">{text}</div>
      ),
    },
    { title: '會員帳號(新)', dataIndex: 'newMemberAccount', width: 150 },
    { title: '特權等級(新)', dataIndex: 'newPrivilegeLevel', width: 150 },
    { title: '會員姓名', dataIndex: 'memberName', width: 100 },
    {
      title: '帳號狀態',
      dataIndex: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '啟用' : '停用'}
        </Tag>
      ),
    },
    {
      title: '註冊 / 登入時間',
      dataIndex: 'regLoginTime',
      width: 160,
      render: (times: string[]) => (
        <div className="text-xs text-gray-500">
          <div>{times[0]}</div>
          <div>{times[1]}</div>
        </div>
      ),
    },
    {
      title: '上次換線時間',
      dataIndex: 'lastTransferTime',
      width: 120,
      render: (times: string[]) => (
        <div className="text-xs text-gray-500">
          <div>{times[0]}</div>
          <div>{times[1]}</div>
        </div>
      ),
    },
    {
      title: '經手人',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Button
          icon={<FileTextOutlined />}
          size="small"
          type="text"
          onClick={() => onViewLog(record)}
        />
      ),
    },
  ]

  /** 初始化 / dataSource 改變時重置 */
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
    <div className="overflow-hidden rounded-lg bg-white p-0 shadow-sm">
      <div
        ref={containerRef}
        style={{ maxHeight: 600, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 1600 }}
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
    </div>
  )
}
