import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Radio, Tabs, message } from 'antd'

// 外部引用 (Components & Utils)
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

// ✅ 改：改成引入「整個無限滾動 Table Component」
import GameManagementTable from './components/GameManagementTable'

import {
  MOCK_DATA,
  MOCK_BET_DETAILS,
  MOCK_JC_DETAILS,
  MOCK_REVENUE_DETAILS,
} from './utils/fakeData'

// 引用 Custom Hook
import { useHandlerLogs } from './hook/useHandlerLogs'

// 彈窗元件
import BetDetailModal from './components/modal/BetDetailModal'
import JcDetailModal from './components/modal/JcDetailModal'
import RevenueDetailModal from './components/modal/RevenueDetailModal'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function GameRevenueSettlement() {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('unpaid')
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  // 1. 使用 Custom Hook 管理經手人日誌狀態
  const handlerLogs = useHandlerLogs()

  // 2. 下注詳情彈窗狀態
  const [isBetModalOpen, setIsBetModalOpen] = useState(false)
  const [currentBetDetails, setCurrentBetDetails] = useState(MOCK_BET_DETAILS)

  // 3. 彩金貢獻值(JC)詳情彈窗狀態
  const [isJcModalOpen, setIsJcModalOpen] = useState(false)
  const [currentJcDetails, setCurrentJcDetails] = useState(MOCK_JC_DETAILS)

  // 4. 遊戲上繳金額詳情彈窗狀態
  const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false)
  const [currentRevenueDetails, setCurrentRevenueDetails] =
    useState(MOCK_REVENUE_DETAILS)

  // --- 搜尋欄位定義 (完整定義，不省略) ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '',
        name: 'agentLevelInfo',
        colProps: { xs: 24, md: 12, lg: 8 },
        render: () => (
          <div className="flex flex-col gap-1">
            <div className="mb-1 flex items-center gap-4">
              <span className="font-medium text-gray-600">代理級別</span>
              <Radio.Group defaultValue="total" size="small">
                <Radio value="total">總代交收</Radio>
                <Radio value="individual">個別交收</Radio>
              </Radio.Group>
            </div>
            <Select
              defaultValue="level1"
              style={{ width: '100%' }}
              options={[
                { label: '1級總代理', value: 'level1' },
                { label: '2級總代理', value: 'level2' },
                { label: '3級總代理', value: 'level3' },
              ]}
            />
          </div>
        ),
      },
      {
        label: '遊戲類別',
        name: 'category',
        colProps: { xs: 24, md: 12, lg: 6 },
        render: () => (
          <Select
            defaultValue="electronic"
            options={[
              { label: '電子', value: 'electronic' },
              { label: '真人', value: 'live' },
              { label: '體育', value: 'sports' },
            ]}
          />
        ),
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        colProps: { xs: 24, md: 12, lg: 6 },
        render: () => (
          <Select
            defaultValue="20"
            options={[
              { label: '20', value: '20' },
              { label: '50', value: '50' },
              { label: '100', value: '100' },
            ]}
          />
        ),
      },
    ],
    []
  )

  // --- 操作邏輯 (Handlers) ---
  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.info('執行搜尋')
  }

  const handleRowStatusChange = (key: string, value: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: value as any } : item
      )
    )
    message.success('狀態已更新')
  }

  // --- 渲染 ---
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲上繳管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: '20', category: 'electronic' }}
          onSearch={handleSearch}
        />

        {/* 列表內容區塊 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={['unpaid', 'paid'].map((key) => ({
              label: key === 'unpaid' ? '未繳費 (26)' : '已繳費 (0)',
              key,
              children: (
                <div className="mt-4">
                  {/* ✅ 改：用內建無限滾動 + sticky 的 Table Component */}
                  <GameManagementTable
                    dataSource={dataSource}
                    loading={false}
                    onOpenBet={(r) => {
                      console.log(r)
                      // 實務上這裡可用 r.key 打 API
                      setCurrentBetDetails(MOCK_BET_DETAILS)
                      setIsBetModalOpen(true)
                    }}
                    onOpenJc={(r) => {
                      console.log(r)
                      setCurrentJcDetails(MOCK_JC_DETAILS)
                      setIsJcModalOpen(true)
                    }}
                    onOpenRevenue={(r) => {
                      console.log(r)
                      setCurrentRevenueDetails(MOCK_REVENUE_DETAILS)
                      setIsRevenueModalOpen(true)
                    }}
                    onFetchLogs={handlerLogs.openLogs}
                    onStatusChange={handleRowStatusChange}
                  />
                </div>
              ),
            }))}
            type="card"
            className="custom-tabs"
          />
        </div>
      </div>

      {/* 彈窗元件 - 使用 Hook 狀態 */}
      <HandlerModal
        open={handlerLogs.isOpen}
        onCancel={handlerLogs.closeLogs}
        logs={handlerLogs.logs}
      />

      {/* 其他彈窗 */}
      <BetDetailModal
        open={isBetModalOpen}
        onCancel={() => setIsBetModalOpen(false)}
        data={currentBetDetails}
      />
      <JcDetailModal
        open={isJcModalOpen}
        onCancel={() => setIsJcModalOpen(false)}
        data={currentJcDetails}
      />
      <RevenueDetailModal
        open={isRevenueModalOpen}
        onCancel={() => setIsRevenueModalOpen(false)}
        data={currentRevenueDetails}
      />
    </ConfigProvider>
  )
}
