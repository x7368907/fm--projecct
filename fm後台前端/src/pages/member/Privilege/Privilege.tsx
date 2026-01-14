import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Radio } from 'antd'

// 引入拆分後的 Hooks 與 Components
import { usePrivilegeData } from './hook/usePrivilegeData'
import { usePrivilegeLogs } from './hook/usePrivilegeLogs'
import PrivilegeTable from './components/PrivilegeTable'
import EditPrivilege from './form/EditPrivilege' // ★ 記得確認路徑
import type { PrivilegeDataType } from './types'

// 引入外部共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

const themeConfig = { token: { colorPrimary: '#14b8a6' } }

export default function Privilege() {
  // 1. 頁面狀態
  const [viewMode, setViewMode] = useState<'list' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<PrivilegeDataType | null>(
    null
  )

  // 2. Hooks 邏輯
  const { dataSource, handleSearch } = usePrivilegeData()
  const { isHandlerModalOpen, currentLogs, fetchLogs, closeLogs } =
    usePrivilegeLogs()

  // 3. 定義搜尋欄位
  const searchFields: SearchField[] = [
    {
      label: 'VIP等級',
      name: 'vipLevel',
      colProps: { xs: 24, sm: 12, md: 3 },
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
      label: '會員帳號',
      name: 'account',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '會員姓名',
      name: 'name',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '帳號狀態',
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 3 },
      render: () => (
        <Select
          placeholder="全部"
          options={[
            { label: '全部', value: 'all' },
            { label: '啟用', value: 'enable' },
            { label: '停用', value: 'disable' },
          ]}
        />
      ),
    },
    {
      label: '檢視返水欄位',
      name: 'dateRange',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => (
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="yesterday">時</Radio.Button>
          <Radio.Button value="day">日</Radio.Button>
          <Radio.Button value="week">週</Radio.Button>
        </Radio.Group>
      ),
    },
  ]

  // 4. 編輯模式渲染
  if (viewMode === 'edit') {
    return (
      <ConfigProvider theme={themeConfig}>
        <EditPrivilege
          record={editingRecord}
          onCancel={() => {
            setViewMode('list')
            setEditingRecord(null)
          }}
        />
      </ConfigProvider>
    )
  }

  // 5. 列表模式渲染
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen w-full bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員特權管理</Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{
            vipLevel: 'all',
            status: 'all',
            pageSize: '20',
            dateRange: 'yesterday',
          }}
          onSearch={handleSearch}
        />

        {/* 表格區塊 */}
        <div className="overflow-hidden rounded-lg bg-white p-0 shadow-sm">
          <PrivilegeTable
            dataSource={dataSource}
            onEdit={(record) => {
              setEditingRecord(record)
              setViewMode('edit')
            }}
            onShowLog={fetchLogs}
          />
        </div>

        {/* 經手人彈窗 */}
        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={closeLogs}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
