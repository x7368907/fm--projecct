import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, message } from 'antd'

// 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

// ★ 引入剛剛寫好的 Hook
import { useHandlerLogs } from './hook/useHandlerLogs'

// 引入拆分後的模組
import { MOCK_DATA } from './utils/fakeData'
import type { RedLimitDataType } from './types'
import RedLimitCreate from './form/RedLimitCreate'
import ProviderTabs from './components/ProviderTabs'
import RedLimitTable from './components/RedLimitTable'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function GameRedLimitSetting() {
  // ===========================================================================
  // 1. Hook: 經手人彈窗邏輯 (取代原本的一堆 state 和 fetchLogs)
  // ===========================================================================
  const { isOpen, logs, openLogs, closeLogs } = useHandlerLogs()

  // 2. 頁面狀態管理
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')
  const [editingValues, setEditingValues] = useState<any>(null)
  const [dataSource, setDataSource] = useState(MOCK_DATA)
  const [selectedProvider, setSelectedProvider] = useState<string>('DG')

  // --- 邏輯處理 (Handlers) ---

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    // 模擬搜尋更新 dataSource...
    console.log(setDataSource)
    message.success('列表已更新')
  }

  const handleCreate = () => {
    setEditingValues(null)
    setViewMode('form')
  }

  // List -> Form
  const handleEdit = (record: RedLimitDataType) => {
    const targetType = record.type === '體育' ? 'sport' : 'live'
    const targetProvider = record.type === '體育' ? 'Super' : 'DG'

    const formValues = {
      type: targetType,
      provider: targetProvider,
      [record.gameName]: 'limit_a',
      maxLossLimit: record.maxLoss === 0 ? undefined : record.maxLoss,
      maxWinLimit: record.maxWin === 0 ? undefined : record.maxWin,
      _originKey: record.key,
    }

    setEditingValues(formValues)
    setViewMode('form')
  }

  const handleBackToList = () => {
    setViewMode('list')
    setEditingValues(null)
  }

  const handleSaveForm = (values: any) => {
    console.log('Save Data:', values)
    message.success(editingValues ? '設定已更新' : '新增成功')
    handleBackToList()
  }

  const handleDelete = (record: RedLimitDataType) => {
    message.info(`刪除演示: ${record.gameName}`)
  }

  // --- 搜尋欄位設定 ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '遊戲類型',
        name: 'gameType',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="請選擇"
            defaultValue="live"
            options={[
              { label: '真人', value: 'live' },
              { label: '電子', value: 'electronic' },
              { label: '體育', value: 'sport' },
            ]}
          />
        ),
      },
    ],
    []
  )

  // ===========================================================================
  // 渲染
  // ===========================================================================

  if (viewMode === 'form') {
    return (
      <ConfigProvider theme={theme}>
        <RedLimitCreate
          initialValues={editingValues}
          onCancel={handleBackToList}
          onSave={handleSaveForm}
        />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲限紅設定
          </Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ gameType: 'live', pageSize: 20 }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        <ProviderTabs
          selectedProvider={selectedProvider}
          onSelect={setSelectedProvider}
        />

        {/* 表格：將 onLog 對接到 Hook 的 openLogs */}
        <RedLimitTable
          dataSource={dataSource}
          onEdit={handleEdit}
          onLog={(record) => openLogs(record.gameName)}
          onDelete={handleDelete}
        />
      </div>

      {/* 彈窗：完全使用 Hook 的狀態 */}
      <HandlerModal open={isOpen} onCancel={closeLogs} logs={logs} />
    </ConfigProvider>
  )
}
