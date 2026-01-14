// GameManagementTable.tsx (或你這支檔案原本的名稱)
import { useEffect, useMemo, useRef, useState } from 'react'
import { Table, Select, Button, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { GameSettlementType } from '../types'

interface ColumnProps {
  onOpenBet: (r: GameSettlementType) => void
  onOpenJc: (r: GameSettlementType) => void
  onOpenRevenue: (r: GameSettlementType) => void
  onFetchLogs: (r: GameSettlementType) => void
  onStatusChange: (key: string, val: string) => void
}

const getTableColumns = ({
  onOpenBet,
  onOpenJc,
  onOpenRevenue,
  onFetchLogs,
  onStatusChange,
}: ColumnProps): ColumnsType<GameSettlementType> => [
  {
    title: '代理級別',
    dataIndex: 'agentLevel',
    key: 'agentLevel',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '代理名稱',
    key: 'agentName',
    width: 220,
    fixed: 'left',
    render: (_, r) => (
      <div className="flex flex-col leading-tight">
        <span className="font-medium text-gray-800">{r.agentName}</span>
        <span className="text-[11px] text-gray-500">{r.agentDesc}</span>
      </div>
    ),
  },
  { title: '遊戲類別', dataIndex: 'category', width: 90, align: 'center' },
  { title: '遊戲商名稱', dataIndex: 'provider', width: 110, align: 'center' },
  { title: '彩金結算', dataIndex: 'jpSettlement', width: 90, align: 'center' },
  { title: '結算方式', dataIndex: 'method', width: 90, align: 'center' },
  { title: '結算日', dataIndex: 'date', width: 110, align: 'center' },
  {
    title: '下注筆數',
    dataIndex: 'betCount',
    width: 90,
    align: 'center',
    render: (v, r) => (
      <a
        className="cursor-pointer text-blue-600 hover:underline"
        onClick={() => onOpenBet(r)}
      >
        {v}
      </a>
    ),
  },
  {
    title: '投注金額',
    dataIndex: 'betAmount',
    width: 100,
    align: 'right',
    render: (v) => v.toLocaleString(),
  },
  {
    title: '有效投注金額',
    dataIndex: 'validBet',
    width: 120,
    align: 'right',
    render: (v) => v.toLocaleString(),
  },
  {
    title: '彩金貢獻值(JC)',
    dataIndex: 'jc',
    width: 120,
    align: 'center',
    render: (v, r) =>
      v > 0 ? (
        <a
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => onOpenJc(r)}
        >
          {v}
        </a>
      ) : (
        '0'
      ),
  },
  {
    title: '彩金(JP)',
    dataIndex: 'jp',
    width: 90,
    align: 'center',
    render: (v) => v.toLocaleString(),
  },
  {
    title: '中獎金額',
    dataIndex: 'winAmount',
    width: 100,
    align: 'center',
    render: (v) => v.toLocaleString(),
  },
  {
    title: '虧損金額',
    dataIndex: 'lossAmount',
    width: 100,
    align: 'center',
    render: (v) => v.toLocaleString(),
  },
  {
    title: 'JC+JP',
    dataIndex: 'jcJpTotal',
    width: 80,
    align: 'center',
    render: (v) => v.toLocaleString(),
  },
  {
    title: '遊戲上繳金額',
    dataIndex: 'revenueAmount',
    width: 120,
    align: 'center',
    render: (v, r) => (
      <a
        className="cursor-pointer font-bold text-blue-600 hover:underline"
        onClick={() => onOpenRevenue(r)}
      >
        {v.toLocaleString()}
      </a>
    ),
  },
  {
    title: '繳費狀態',
    dataIndex: 'status',
    width: 110,
    align: 'center',
    fixed: 'right',
    render: (val, r) => (
      <Select
        value={val}
        size="small"
        style={{ width: 90 }}
        onChange={(v) => onStatusChange(r.key, v)}
        options={[
          { label: '未繳費', value: 'unpaid' },
          { label: '待審核', value: 'auditing' },
          { label: '已繳費', value: 'paid' },
        ]}
      />
    ),
  },
  {
    title: '經手人',
    key: 'handler',
    width: 80,
    align: 'center',
    fixed: 'right',
    render: (_, r) => (
      <Button
        type="text"
        icon={<FileTextOutlined className="text-lg text-gray-600" />}
        onClick={() => onFetchLogs(r)}
      />
    ),
  },
]

// =======================
// ✅ 無限滾動 Table Component
// =======================
const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

interface GameManagementTableProps extends ColumnProps {
  dataSource: GameSettlementType[]
  loading?: boolean
}

export default function GameManagementTable({
  dataSource,
  loading = false,
  onOpenBet,
  onOpenJc,
  onOpenRevenue,
  onFetchLogs,
  onStatusChange,
}: GameManagementTableProps) {
  const columns = useMemo(
    () =>
      getTableColumns({
        onOpenBet,
        onOpenJc,
        onOpenRevenue,
        onFetchLogs,
        onStatusChange,
      }),
    [onOpenBet, onOpenJc, onOpenRevenue, onFetchLogs, onStatusChange]
  )

  const [list, setList] = useState<GameSettlementType[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

    // 你之後接 API 時，把這裡換成 await fetchMore()
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
      {/* ⚠️ 這一層不要加 padding（你之前 sticky 跑掉就是常見原因） */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table<GameSettlementType>
          columns={columns}
          dataSource={list}
          rowKey="key"
          pagination={false}
          sticky
          scroll={{ x: 1800 }}
          loading={loading}
          size="middle"
        />

        {loadingMore && (
          <div className="flex justify-center py-3">
            <Spin tip="載入中..." />
          </div>
        )}

        {!loading && finished && dataSource.length > 0 && (
          <div className="py-3 text-center text-sm text-gray-400">
            已無更多資料
          </div>
        )}
      </div>
    </div>
  )
}
