import { Breadcrumb, Select, Radio, ConfigProvider } from 'antd'

// Modules
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'
import PrivilegeCreate from './form/PrivilegeCreate' // 假設 Create 放在 components 下
import PrivilegeTable from './components/PrivilegeTable'
import { usePrivilege } from './hook/usePrivilege'
const themeConfig = { token: { colorPrimary: '#13c2c2' } }
export default function Privilege() {
  const {
    dataSource,
    viewMode,
    editingRecord,
    isHandlerModalOpen,
    currentLogs,
    setIsHandlerModalOpen,
    handleSearch,
    fetchLogs,
    toCreateMode,
    toEditMode,
    backToList,
  } = usePrivilege()

  // 搜尋欄位設定 (View 設定放在 Component 內)
  const searchFields: SearchField[] = [
    {
      label: 'VIP等級',
      name: 'vipLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="全部"
          options={[
            { label: '全部', value: 'all' },
            { label: 'VIP1', value: 'vip1' },
          ]}
        />
      ),
    },
    {
      label: '檢視返水欄位',
      name: 'viewType',
      colProps: { xs: 24, sm: 12, md: 8 },
      render: () => (
        <Radio.Group buttonStyle="solid" defaultValue="h">
          <Radio.Button value="h">時</Radio.Button>
          <Radio.Button value="d">日</Radio.Button>
          <Radio.Button value="w">週</Radio.Button>
        </Radio.Group>
      ),
    },
  ]

  // 1. 新增/編輯模式
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={themeConfig}>
        <PrivilegeCreate
          mode={viewMode}
          initialRecord={editingRecord}
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
          <Breadcrumb.Item>特權管理</Breadcrumb.Item>
        </Breadcrumb>
        <SearchPanel
          title="條件搜尋"
          onCreate={toCreateMode}
          fields={searchFields}
          onSearch={handleSearch}
          initialValues={{ vipLevel: 'all', viewType: 'h' }}
        />

        <PrivilegeTable
          dataSource={dataSource}
          onEdit={toEditMode}
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
