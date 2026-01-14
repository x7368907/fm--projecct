// src/pages/Discount/index.tsx
import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Tabs, Select, Input, message } from 'antd'

// 共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal' // 這裡只引入 UI
import QuickRangePicker from '../../../components/QuickRangePicker'

// 模組化元件
import { MOCK_DATA } from './utils/fakeData'
import DepositTable from './components/StoredTable'
import StatsHeader from './components/StatsHeader'
import { useHandlerModal } from './hook/useHandlerModal' // ★ 引入 Hook

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function Discount() {
  // --- 狀態 ---
  const [activeStatusTab, setActiveStatusTab] = useState('pending')
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  // --- ★ 使用 Hook (邏輯解耦) ---
  const {
    isOpen: isModalOpen,
    logs: modalLogs,
    openModal,
    closeModal,
  } = useHandlerModal()

  // --- 搜尋欄位設定 (保留在 index) ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '樓層',
        name: 'level',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => <Select placeholder="全部" options={[]} />,
      },
      {
        label: '會員姓名',
        name: 'memberName',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '金流群組',
        name: 'group',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="全部"
            options={[{ label: '常規會員', value: 'normal' }]}
          />
        ),
      },
      {
        label: '金流類型',
        name: 'paymentType',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="全部"
            options={[
              { label: '超商', value: 'cvs' },
              { label: 'ATM', value: 'atm' },
            ]}
          />
        ),
      },
      {
        label: '交易類別',
        name: 'transactionCategory',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="全部"
            options={[{ label: '7-11', value: '711' }]}
          />
        ),
      },
      {
        label: '申請時間',
        name: 'dateRange',
        colProps: { xs: 24, md: 16, lg: 8 },
        render: () => <QuickRangePicker />,
      },
    ],
    []
  )

  // --- Handlers ---
  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.info('執行搜尋')
  }

  const handleSaveStatusNote = (key: string, newNote: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, statusNote: newNote } : item
      )
    )
    message.success('儲值狀況已更新')
  }

  // Tabs
  const tabItems = [
    { key: 'pending', label: '待審核 (26)' },
    { key: 'distributed', label: '派發 (0)' },
    { key: 'rejected', label: '拒絕 (0)' },
  ]

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4 text-gray-500">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            儲值申請管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
        />

        {/* 內容區塊 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Tabs
            activeKey={activeStatusTab}
            onChange={setActiveStatusTab}
            type="card"
            tabBarExtraContent={<StatsHeader dataSource={dataSource} />}
            items={tabItems.map((item) => ({
              label: item.label,
              key: item.key,
              children: (
                <DepositTable
                  dataSource={dataSource}
                  onSaveNote={handleSaveStatusNote}
                  onShowLogs={openModal} // ★ 直接傳入 Hook 提供的 openModal
                />
              ),
            }))}
          />
        </div>

        {/* 彈窗元件 (狀態由 Hook 控制) */}
        <HandlerModal
          open={isModalOpen}
          onCancel={closeModal}
          logs={modalLogs}
        />
      </div>
    </ConfigProvider>
  )
}
