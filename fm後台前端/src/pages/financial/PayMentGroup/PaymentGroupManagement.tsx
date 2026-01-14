import { useState, useMemo } from 'react'
import { ConfigProvider, message, Select, Breadcrumb } from 'antd'

// 引入元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'
import GroupList from './components/GroupTable'
import PaymentGroupCreate from './form/PaymentGroupCreate'
import PaymentGroupEdit from './form/PaymentGroupEdit'

// 引入邏輯與資料
import { MOCK_DATA } from './utils/fakeData'
import { useHandlerLogs } from './hook/useHandlerLogs'
import type { GroupDataType } from './types'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function PaymentGroup() {
  // === 1. 全域狀態管理 ===
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<GroupDataType | null>(null)

  // 資料來源提升到這裡管理，以便搜尋或修改時可以統一處理
  const [dataSource, setDataSource] = useState<GroupDataType[]>(MOCK_DATA)

  // 經手人日誌 Hook
  const { isOpen, logs, fetchLogs, closeLogs } = useHandlerLogs()

  // === 2. 搜尋設定 ===
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '金流類型',
        name: 'paymentType',
        colProps: { xs: 24, md: 12, lg: 6 },
        render: () => (
          <Select
            placeholder="全部"
            allowClear
            options={[
              { label: '全部', value: 'all' },
              { label: 'ATM', value: 'ATM' },
              { label: '超商', value: 'CVS' },
            ]}
          />
        ),
      },
    ],
    []
  )

  // === 3. 操作邏輯 (Handlers) ===
  const toList = () => {
    setEditingRecord(null)
    setViewMode('list')
  }

  const handleCreate = () => setViewMode('create')

  const handleEdit = (record: GroupDataType) => {
    setEditingRecord(record)
    setViewMode('edit')
  }

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.info(`執行搜尋: ${JSON.stringify(values)}`)
    // 這裡可以實作真實的 API 搜尋或前端過濾
  }

  // 修改資料：狀態切換
  const handleStatusChange = (checked: boolean, key: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      )
    )
    message.success(`狀態已${checked ? '開啟' : '關閉'}`)
  }

  // 修改資料：儲存備註
  const handleSaveRemark = (key: string, newRemark: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, remark: newRemark } : item
      )
    )
    message.success('備註已更新')
  }

  // 修改資料：停用
  const handleDisable = (record: GroupDataType) => {
    message.error(`停用: ${record.name}`)
  }

  // === 4. 渲染內容 ===
  const renderContent = () => {
    if (viewMode === 'create') {
      return (
        <PaymentGroupCreate
          onCancel={toList}
          onSave={() => {
            message.success('新增成功')
            toList()
          }}
        />
      )
    }

    if (viewMode === 'edit' && editingRecord) {
      return (
        <PaymentGroupEdit
          initialValues={editingRecord}
          onCancel={toList}
          onSave={(values) => {
            console.log('Update:', values)
            message.success('更新成功')
            toList()
          }}
        />
      )
    }

    // 列表模式：顯示 Breadcrumb -> SearchPanel -> GroupList
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            金流群組管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 (放在 index) */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ paymentType: 'all' }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 表格區塊 (只傳入資料與操作函式) */}
        <GroupList
          dataSource={dataSource}
          onEdit={handleEdit}
          onLogs={fetchLogs}
          onStatusChange={handleStatusChange}
          onSaveRemark={handleSaveRemark}
          onDisable={handleDisable}
        />
      </div>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      {renderContent()}
      {/* 經手人彈窗 (全域層級) */}
      <HandlerModal open={isOpen} onCancel={closeLogs} logs={logs} />
    </ConfigProvider>
  )
}
