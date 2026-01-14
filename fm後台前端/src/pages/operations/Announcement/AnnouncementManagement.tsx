import { Breadcrumb, Select, DatePicker, ConfigProvider } from 'antd'

// 1. 引入共用組件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'

// 2. 引入子頁面與組件
import AnnounceCreate from './form/AnnounceCreate'
import AnnounceTable from './components/AnnounceTable'

// 3. 引入邏輯與資料
import { useAnnounce } from './hook/useAnnounce'

const { RangePicker } = DatePicker
const themeConfig = { token: { colorPrimary: '#13c2c2' } }
export default function Announce() {
  const {
    loading,
    viewMode,
    activeTab,
    currentLang,
    editingRecord,
    currentData,
    dataCounts,
    setActiveTab,
    setCurrentLang,
    handleSearch,
    toCreateMode,
    toEditMode,
    backToList,
  } = useAnnounce()

  // ★★★ 定義搜尋欄位 (放在 Component 內部) ★★★
  const searchFields: SearchField[] = [
    {
      label: '公告類型',
      name: 'announceType',
      colProps: { xs: 24, sm: 8, md: 4 },
      render: () => (
        <Select
          placeholder="全部"
          allowClear
          options={[{ label: '全部', value: 'all' }]}
        />
      ),
    },
    {
      label: '公告時間',
      name: 'announceDate',
      colProps: { xs: 24, sm: 8, md: 4 },
      render: () => <DatePicker style={{ width: '100%' }} />,
    },
    {
      label: '開始 / 結束時間',
      name: 'dateRange',
      colProps: { xs: 24, sm: 16, md: 8 },
      render: () => <RangePicker style={{ width: '100%' }} />,
    },
    {
      label: '公告狀態',
      name: 'status',
      colProps: { xs: 24, sm: 8, md: 4 },
      render: () => (
        <Select
          placeholder="全部"
          allowClear
          options={[{ label: '進行中', value: 'active' }]}
        />
      ),
    },
    {
      label: '廠停用',
      name: 'isDisable',
      colProps: { xs: 24, sm: 8, md: 3 },
      render: () => (
        <Select
          placeholder="全部"
          allowClear
          options={[{ label: '啟用', value: 'false' }]}
        />
      ),
    },
  ]

  // -------------------------------------------------------------------
  // 渲染邏輯
  // -------------------------------------------------------------------

  // 1. 新增/編輯模式
  if (viewMode === 'create') {
    return (
      <ConfigProvider theme={themeConfig}>
        <AnnounceCreate
          initialValues={editingRecord || undefined}
          defaultTab={activeTab}
          onCancel={backToList}
          onSave={() => {
            console.log('儲存成功')
            backToList()
          }}
        />
      </ConfigProvider>
    )
  }

  // 2. 列表模式
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-6">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>營運管理</Breadcrumb.Item>
          <Breadcrumb.Item>公告設定</Breadcrumb.Item>
        </Breadcrumb>
        <SearchPanel
          title="條件搜尋"
          onCreate={toCreateMode} // 自動渲染新增按鈕
          fields={searchFields}
          onSearch={handleSearch}
          initialValues={{ status: 'all', isDisable: 'false' }}
        />

        {/* 頁籤切換區 */}
        <div className="mb-4 flex gap-2">
          {(['activity', 'system', 'game'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded border px-6 py-2 text-sm transition-all ${
                activeTab === tab
                  ? 'border-teal-500 bg-white font-bold text-teal-600' // 選中樣式
                  : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-500' // 未選中樣式
              }`}
            >
              {tab === 'activity' ? '活動' : tab === 'system' ? '系統' : '遊戲'}{' '}
              ({dataCounts[tab]})
            </button>
          ))}
        </div>

        <AnnounceTable
          loading={loading}
          dataSource={currentData}
          activeTab={activeTab}
          currentLang={currentLang}
          onLangChange={setCurrentLang}
          onEdit={toEditMode}
        />
      </div>
    </ConfigProvider>
  )
}
