import { useEffect, useRef, useState } from 'react'
import { Table, Spin, ConfigProvider } from 'antd'
import DetailModal from '../../../../../components/DetailModal'
import { useCompanyTable } from './hook/useCompanyTable'
import { getCompanyColumns } from './components/CompanyColumns'

interface CompanyTableProps {
  searchParams?: any
}
const themeConfig = { token: { colorPrimary: '#14b8a6' } }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CompanyTable({ searchParams }: CompanyTableProps) {
  // 原本的 Hook（完全不動）
  const {
    dataSource,
    totalData,
    modalState,
    handleOpenDetail,
    handleCloseModal,
  } = useCompanyTable()

  // 無限滾動狀態
  const [list, setList] = useState<any[]>([])
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // 欄位設定（完全沿用）
  const columns = getCompanyColumns({
    totalData,
    onOpenDetail: handleOpenDetail,
  })

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
    <>
      <div className="mb-4 border-l-4 border-teal-500 pl-2 text-lg font-bold text-gray-700">
        1級總代理 (公司視角)
      </div>
      <ConfigProvider theme={themeConfig}>
        <div
          ref={containerRef}
          style={{ maxHeight: 600, overflowY: 'auto' }}
          onScroll={handleScroll}
          className="rounded-lg bg-white shadow-sm"
        >
          <Table
            columns={columns}
            dataSource={list}
            scroll={{ x: 2200 }}
            pagination={false}
            bordered
            size="middle"
            rowClassName="hover:bg-blue-50 transition-colors"
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
      </ConfigProvider>

      <DetailModal
        open={modalState.open}
        onCancel={handleCloseModal}
        title={modalState.title}
        subTitle={modalState.subTitle}
        data={modalState.data}
        mode={modalState.mode}
      />
    </>
  )
}
