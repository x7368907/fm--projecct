import { useEffect, useRef, useState } from 'react'
import { Table, Spin } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TransactionData } from '../types'
import MoneyCell from './MoneyCell'

interface TransactionTableProps {
  dataSource: TransactionData[]
  loading?: boolean
}

const PAGE_SIZE = 20
const SCROLL_HEIGHT = 600

export default function TransactionTable({
  dataSource,
  loading = false,
}: TransactionTableProps) {
  // ===== 無限滾動狀態 =====
  const [list, setList] = useState<TransactionData[]>([])
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const [finished, setFinished] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 定義表格欄位
  const columns: ColumnsType<TransactionData> = [
    {
      title: '代理級別',
      dataIndex: 'agentLevel',
      key: 'agentLevel',
      width: 100,
      fixed: 'left',
      align: 'center',
      className: 'bg-gray-50 text-gray-600 font-medium',
    },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      key: 'agentName',
      width: 100,
      fixed: 'left',
      align: 'center',
      className: 'bg-gray-50 text-gray-800',
    },
    {
      title: '會員姓名',
      dataIndex: 'memberName',
      key: 'memberName',
      width: 100,
      fixed: 'left',
      align: 'center',
      className: 'bg-gray-50 text-gray-500 text-xs',
    },
    // --- 儲值群組 ---
    {
      title: '儲值',
      className:
        'bg-gray-100 text-center text-gray-700 font-bold border-b-gray-300',
      children: [
        {
          title: '人工上分',
          key: 'manualDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.manualDeposit} />,
        },
        {
          title: 'ATM',
          key: 'atmDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.atmDeposit} />,
        },
        {
          title: '信用卡',
          key: 'creditDeposit',
          width: 90,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.creditDeposit} />,
        },
        {
          title: '電子支付',
          key: 'epayDeposit',
          width: 90,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.epayDeposit} />,
        },
        {
          title: 'USDT',
          key: 'usdtDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.usdtDeposit} />,
        },
        {
          title: '超商(CSV)',
          key: 'cvsDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.cvsDeposit} />,
        },
        {
          title: '小計',
          dataIndex: 'depositSubtotal',
          key: 'depositSubtotal',
          width: 120,
          align: 'center',
          className: 'bg-gray-50',
          render: (v) => (
            <span className="text-[13px] font-bold text-gray-800">
              {v.toLocaleString()}
            </span>
          ),
        },
      ],
    },
    // --- 託售群組 ---
    {
      title: '託售',
      className:
        'bg-gray-100 text-center text-gray-700 font-bold border-b-gray-300',
      children: [
        {
          title: '銀行卡',
          key: 'bankWithdraw',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.bankWithdraw} />,
        },
        {
          title: 'USDT',
          key: 'usdtWithdraw',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.usdtWithdraw} />,
        },
        {
          title: '小計',
          dataIndex: 'withdrawSubtotal',
          key: 'withdrawSubtotal',
          width: 120,
          align: 'center',
          className: 'bg-gray-50',
          render: (v) => (
            <span className="text-[13px] font-bold text-gray-800">
              {v.toLocaleString()}
            </span>
          ),
        },
      ],
    },
    // --- 加扣點群組 ---
    {
      title: '加扣點',
      className:
        'bg-gray-100 text-center text-gray-700 font-bold border-b-gray-300',
      children: [
        {
          title: '加點',
          key: 'addPoints',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.addPoints} />,
        },
        {
          title: '扣點',
          key: 'deductPoints',
          width: 90,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.deductPoints} />,
        },
        {
          title: '小計',
          dataIndex: 'pointsSubtotal',
          key: 'pointsSubtotal',
          width: 110,
          align: 'center',
          className: 'bg-gray-50',
          render: (v) => (
            <span className="text-[13px] font-bold text-gray-800">
              {v.toLocaleString()}
            </span>
          ),
        },
      ],
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
    }, 350)
  }

  const handleScroll = () => {
    const el = containerRef.current
    if (!el || loading || loadingMore || finished) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) loadMore()
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* ✅ 滾動容器不要 padding（sticky 才不會跑） */}
      <div
        ref={containerRef}
        style={{ maxHeight: SCROLL_HEIGHT, overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <Table
          columns={columns}
          dataSource={list}
          loading={loading}
          rowKey="key"
          bordered
          size="middle"
          scroll={{ x: 1800 }}
          pagination={false}
          sticky
          className="[&_.ant-table-thead_th]:whitespace-nowrap"
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
