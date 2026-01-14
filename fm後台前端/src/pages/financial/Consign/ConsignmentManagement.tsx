import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Tabs, message } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'
import HandlerModal from '../../AgentList/components/HandlerModal'

// 2. 引入模組化後的檔案
import { MOCK_DATA } from './utils/fakeData'
import ConsignTable from './components/ConsignTable' // 表格顯示元件
import { useHandlerModal } from './hook/useHandlerModal' // 彈窗邏輯 Hook

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function Consign() {
  // --- 狀態管理 ---
  const [activeStatusTab, setActiveStatusTab] = useState('pending')
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  // --- 使用 Hook 處理經手人彈窗邏輯 ---
  const { isOpen, logs, openLogs, closeLogs } = useHandlerModal()

  // --- 處理函式 ---
  const handleSearch = (values: any) => {
    console.log('Search Params:', values)
    message.success('搜尋條件已送出')
    // 實際專案這裡會呼叫 API 更新 dataSource
  }

  // 更新備註 (雖然 Table 拆出去了，但資料源頭還是在這裡，所以 function 傳進去)
  const handleSaveStatusNote = (key: string, newNote: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, statusNote: newNote } : item
      )
    )
    message.success('備註狀況已更新')
  }

  // --- ★★★ 完整的搜尋欄位設定 ★★★ ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '標籤',
        name: 'tag',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            allowClear
            options={[
              { label: 'IP黑名單', value: 'ip_black' },
              { label: '金流黑名單', value: 'money_black' },
              { label: '新會員', value: 'new' },
            ]}
          />
        ),
      },
      {
        label: '代理名稱',
        name: 'agentName',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => <Input placeholder="請輸入" allowClear />,
      },
      {
        label: '會員姓名',
        name: 'memberName',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => <Input placeholder="請輸入" allowClear />,
      },
      {
        label: '金流群組',
        name: 'group',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            allowClear
            options={[
              { label: '常規會員', value: 'normal' },
              { label: 'VIP會員', value: 'vip' },
            ]}
          />
        ),
      },
      {
        label: '金流類型',
        name: 'paymentType',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            allowClear
            options={[
              { label: '銀行卡', value: 'bank' },
              { label: 'USDT', value: 'usdt' },
            ]}
          />
        ),
      },
      {
        label: '交易類別',
        name: 'transactionCategory',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            allowClear
            options={[
              { label: '台新銀行', value: 'taishin' },
              { label: '中國信託', value: 'ctbc' },
              { label: 'USDT-TRC20', value: 'trc20' },
            ]}
          />
        ),
      },
      {
        label: '申請時間',
        name: 'dateRange',
        colProps: { xs: 24, md: 16, lg: 6 }, // 時間欄位給寬一點
        render: () => <QuickRangePicker />,
      },
    ],
    []
  )

  // 統計資訊區塊 (Tab 右側)
  const statsContent = (
    <div className="flex flex-col items-end gap-1 pb-1 text-xs text-gray-600 lg:flex-row lg:items-center lg:gap-4 lg:text-sm">
      <div className="flex gap-2">
        <span>今日託售總計:</span>
        <span className="font-bold text-gray-800">210,700</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-gray-300 lg:block"></div>
      <div className="flex gap-2 text-sm lg:text-base">
        <span>待審核金額:</span>
        <span className="font-bold text-red-500">201,700</span>
      </div>
    </div>
  )

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑導航 */}
        <Breadcrumb separator=">" className="mb-4 text-gray-500">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            託售申請管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋面板 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
        />

        {/* 資料列表區塊 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Tabs
            activeKey={activeStatusTab}
            onChange={setActiveStatusTab}
            type="card"
            tabBarExtraContent={statsContent}
            items={[
              { key: 'pending', label: '待審核 (26)' },
              { key: 'dispensing', label: '派發 (0)' },
              { key: 'rejected', label: '拒絕 (0)' },
            ].map((item) => ({
              label: item.label,
              key: item.key,
              children: (
                // 引入封裝好的 Table 元件
                <ConsignTable
                  dataSource={dataSource}
                  onSaveNote={handleSaveStatusNote}
                  onShowLogs={openLogs}
                />
              ),
            }))}
          />
        </div>

        {/* 經手人彈窗 (狀態由 Hook 控制) */}
        <HandlerModal open={isOpen} onCancel={closeLogs} logs={logs} />
      </div>
    </ConfigProvider>
  )
}
