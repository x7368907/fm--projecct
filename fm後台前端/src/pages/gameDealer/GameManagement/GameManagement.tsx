import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, message } from 'antd'

// 共用元件引用
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

// 內部模組引用
import GameCreate from './form/GameCreate'
import GameTable from './components/GameTable'
import ProviderList from './components/ProviderList'
import { useHandlerLogs } from './hook/useHandlerLogs'
import { MOCK_DATA } from './utils/fakeData'
import type { GameDataType } from './types'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function GameManagement() {
  // 頁面狀態
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')
  const [editingRecord, setEditingRecord] = useState<any>(null)

  // 資料狀態
  const [dataSource, setDataSource] = useState(MOCK_DATA)
  const [selectedProvider, setSelectedProvider] = useState<string>('ATG')

  // Hook: 經手人日誌
  const { isOpen, logs, openLogs, closeLogs } = useHandlerLogs()

  // --- 操作邏輯 (Actions) ---

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.success('執行搜尋更新列表')
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('form')
  }

  const handleEdit = (record: GameDataType) => {
    // 轉換資料格式給 Form 使用
    const formValues = {
      ...record,
      gameType: record.type === '電子' ? 'electronic' : 'live',
      gameLogo: `${record.gameCode}_logo`,
    }
    setEditingRecord(formValues)
    setViewMode('form')
  }

  const handleStatusChange = (checked: boolean, key: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      )
    )
    message.success(`狀態已${checked ? '開啟' : '關閉'}`)
  }

  const handleSaveRemark = (key: string, newRemark: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, remark: newRemark } : item
      )
    )
    message.success('備註已更新')
  }

  // --- 設定 (Config) ---

  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '遊戲類型',
        name: 'gameType',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="請選擇"
            options={[{ label: '電子', value: 'electronic' }]}
          />
        ),
      },
      {
        label: '遊戲名稱',
        name: 'gameName',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="全部"
            options={[{ label: '全部', value: 'all' }]}
          />
        ),
      },
      {
        label: '遊戲狀態',
        name: 'status',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="全部"
            options={[
              { label: '全部', value: 'all' },
              { label: '開啟', value: 'on' },
              { label: '關閉', value: 'off' },
            ]}
          />
        ),
      },
    ],
    []
  )

  // --- 渲染 (Render) ---

  if (viewMode === 'form') {
    return (
      <ConfigProvider theme={theme}>
        <GameCreate
          initialValues={editingRecord}
          onCancel={() => setViewMode('list')}
          onSave={(values) => {
            console.log(editingRecord ? 'Update' : 'Create', values)
            message.success(editingRecord ? '遊戲更新成功' : '遊戲新增成功')
            setViewMode('list')
          }}
        />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 廠商列表元件 */}
        <ProviderList
          selected={selectedProvider}
          onSelect={setSelectedProvider}
        />

        {/* 表格區塊 */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <GameTable
            dataSource={dataSource}
            onStatusChange={handleStatusChange}
            onSaveRemark={handleSaveRemark}
            onEdit={handleEdit}
            onLogs={(record) => openLogs(record.gameName, record.rtp)}
          />
        </div>
      </div>

      {/* 經手人彈窗 */}
      <HandlerModal open={isOpen} onCancel={closeLogs} logs={logs} />
    </ConfigProvider>
  )
}
