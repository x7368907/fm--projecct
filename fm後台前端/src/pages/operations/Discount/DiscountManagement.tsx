import { Breadcrumb, Select, ConfigProvider } from 'antd'

// Components & Modules
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'
import DiscountCreate from './form/DiscountCreate' // 假設放在 form 下
import DiscountTable from './components/DiscountTable'
import { useDiscount } from './hook/useDiscount'
const themeConfig = { token: { colorPrimary: '#13c2c2' } }
export default function Discount() {
  const {
    dataSource,
    viewMode,
    activeTab,
    editingRecord,
    isHandlerModalOpen,
    currentLogs,
    setActiveTab,
    setIsHandlerModalOpen,
    handleUpdateNote,
    fetchLogs,
    toCreateMode,
    toEditMode,
    backToList,
  } = useDiscount()

  // 定義搜尋欄位 (保留在主檔)
  const searchFields: SearchField[] = [
    {
      label: '優惠類別',
      name: 'category',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => (
        <Select
          placeholder="全部"
          options={[
            { value: 'all', label: '全部' },
            { value: 'privilege', label: '特權' },
            { value: 'discount', label: '優惠' },
            { value: 'redenv', label: '紅包' },
          ]}
        />
      ),
    },
    {
      label: '優惠名稱',
      name: 'name',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => (
        <Select
          placeholder="全部"
          options={[{ value: 'all', label: '全部' }]}
        />
      ),
    },
  ]

  // 1. 新增/編輯模式
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={themeConfig}>
        <DiscountCreate
          initialValues={editingRecord || undefined}
          onCancel={() => backToList(false)}
          onSave={() => backToList(true)}
        />
      </ConfigProvider>
    )
  }

  // 2. 列表模式
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-6">
        <Breadcrumb separator=">" style={{ marginBottom: '16px' }}>
          <Breadcrumb.Item>營運管理</Breadcrumb.Item>
          <Breadcrumb.Item>優惠管理</Breadcrumb.Item>
        </Breadcrumb>
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          onSearch={(vals) => console.log('Search:', vals)}
          onCreate={toCreateMode}
          initialValues={{ pageSize: 20 }}
        />

        {/* Tabs */}
        <div className="mb-4 flex gap-2">
          {[
            { key: 'upcoming', label: '即將開始', count: 18 },
            { key: 'ongoing', label: '進行中', count: 6 },
            { key: 'ended', label: '已結束', count: 0 },
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`cursor-pointer rounded border px-6 py-2 text-sm transition-all ${
                activeTab === tab.key
                  ? 'border-teal-500 bg-white font-bold text-teal-600' // 選中樣式
                  : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-500' // 未選中樣式
              }`}
            >
              {tab.label} <span className="ml-1 text-xs">({tab.count})</span>
            </div>
          ))}
        </div>

        <DiscountTable
          dataSource={dataSource}
          onEdit={toEditMode}
          onUpdateNote={handleUpdateNote}
          onViewLogs={fetchLogs}
        />

        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={() => setIsHandlerModalOpen(false)}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
