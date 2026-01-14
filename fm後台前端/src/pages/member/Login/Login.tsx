import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input } from 'antd'

// 引入拆分後的 Hooks 與 Components
import { useLoginData } from './hook/useLoginData'
import { useLoginLogs } from './hook/useLoginLogs'
import MemberLoginTable from './components/MemberLoginTable'
import MemberLoginCreate from './form/MemberLoginCreate'

// 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'
import HandlerModal from '../../AgentList/components/HandlerModal'

const { Option } = Select
const themeConfig = { token: { colorPrimary: '#13c2c2' } }

export default function MemberLogin() {
  // 1. 視圖模式
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<any>(null)

  // 2. Hooks 邏輯
  const { dataSource, handleSearch, ipState, deviceState } = useLoginData()

  const { isHandlerModalOpen, currentLogs, fetchLogs, closeLogs } =
    useLoginLogs()

  // 3. 搜尋欄位設定
  const searchFields: SearchField[] = [
    {
      label: '標籤',
      name: 'tag',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select placeholder="全部" allowClear>
          <Option value="new">新會員</Option>
          <Option value="black">黑名單</Option>
        </Select>
      ),
    },
    {
      label: '代理級別',
      name: 'agentLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select placeholder="全部" allowClear>
          <Option value="1">Level 1</Option>
        </Select>
      ),
    },
    {
      label: '會員帳號',
      name: 'account',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="輸入帳號" />,
    },
    {
      label: '會員姓名',
      name: 'name',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="輸入姓名" />,
    },
    {
      label: '顯示重複',
      name: 'showDuplicate',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select placeholder="全部" allowClear>
          <Option value="ip">IP 重複</Option>
          <Option value="device">裝置重複</Option>
        </Select>
      ),
    },
    {
      label: 'IP',
      name: 'ip',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="輸入 IP" />,
    },
    {
      label: '裝置',
      name: 'device',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="輸入裝置" />,
    },
    {
      label: '最後登入時間',
      name: 'lastLogin',
      colProps: { xs: 24, sm: 12, md: 8 },
      render: () => <QuickRangePicker />,
    },
  ]

  // 4. 切換到新增/編輯頁
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <MemberLoginCreate
        onCancel={() => {
          setViewMode('list')
          setEditingRecord(null)
        }}
        mode={viewMode}
        initialValues={editingRecord}
      />
    )
  }

  // 5. 列表頁渲染
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員登入管理</Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: '20' }}
          onSearch={handleSearch}
          onCreate={() => {
            setEditingRecord(null)
            setViewMode('create')
          }}
        />

        {/* 表格區塊 */}
        <MemberLoginTable
          dataSource={dataSource}
          ipState={ipState}
          deviceState={deviceState}
          onEdit={(record) => {
            setEditingRecord(record)
            setViewMode('edit')
          }}
          onShowLog={fetchLogs}
        />

        {/* 彈窗 */}
        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={closeLogs}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
