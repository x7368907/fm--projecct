import { useState, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, message } from 'antd'

// 1. 共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

import type { GameSettingData } from './types'
import { MOCK_DATA } from './utils/fakeData'
import GameSettingTable from './components/GameSettingTable'
import GameSettingForm from './form/GameSettingCreate'

// ★ 3. 引入剛剛建立的 Hook
import { useHandlerLogs } from './hook/useHandlerLogs'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function GameSettingManagement() {
  // --- 狀態管理 ---
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<GameSettingData | null>(
    null
  )
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  // ★ 使用 Custom Hook 管理經手人日誌
  const {
    isOpen: isLogOpen,
    logs: currentLogs,
    openLogs,
    closeLogs,
  } = useHandlerLogs()

  // --- 搜尋設定 ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '站別',
        name: 'station',
        colProps: { xs: 24, md: 8, lg: 5 },
        render: () => (
          <Select
            placeholder="請選擇"
            options={[{ label: 'FM', value: 'FM' }]}
            defaultValue="FM"
          />
        ),
      },
      {
        label: '遊戲類別',
        name: 'category',
        colProps: { xs: 24, md: 8, lg: 5 },
        render: () => (
          <Select
            placeholder="請選擇"
            options={[
              { label: '電子', value: 'electronic' },
              { label: '真人', value: 'live' },
            ]}
            defaultValue="electronic"
          />
        ),
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        colProps: { xs: 24, md: 8, lg: 5 },
        render: () => (
          <Select
            options={[
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 },
            ]}
            defaultValue={20}
          />
        ),
      },
    ],
    []
  )

  // --- Handlers ---

  const handleSearch = (values: any) => {
    message.info(`搜尋條件: ${JSON.stringify(values)}`)
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('create')
  }

  const handleBackToList = () => {
    setViewMode('list')
    setEditingRecord(null)
  }

  const handleFormSave = (values: any) => {
    if (viewMode === 'create') {
      const newRecord: GameSettingData = {
        key: Date.now().toString(),
        station: values.station,
        category: values.category,
        vendorName: values.vendorName,
        jackpotSettlement: values.jackpotSettlement,
        contribution: Number(values.contribution),
        gameCap: Number(values.gameCap),
        negativeProfit: values.negativeProfit,
        settlementType: values.settlementType,
        settlementTime: '(預設時間)',
        remark: '',
      }
      setDataSource((prev) => [newRecord, ...prev])
      message.success('新增成功')
    } else if (viewMode === 'edit' && editingRecord) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
      )
      message.success('更新成功')
    }
    handleBackToList()
  }

  const handleSaveRemark = (key: string, newRemark: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, remark: newRemark } : item
      )
    )
    message.success('備註已更新')
  }

  // ★ 讀取日誌：直接呼叫 Hook 的方法
  const handleLog = (record: GameSettingData) => {
    openLogs(record)
  }

  const handleEdit = (record: GameSettingData) => {
    setEditingRecord(record)
    setViewMode('edit')
  }

  const handleDelete = (record: GameSettingData) => {
    message.error(`刪除: ${record.vendorName}`)
  }

  // --- Render ---

  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={theme}>
        <GameSettingForm
          initialValues={editingRecord}
          onCancel={handleBackToList}
          onSave={handleFormSave}
        />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲上繳設定
          </Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{
            station: 'FM',
            category: 'electronic',
            pageSize: 20,
          }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <GameSettingTable
            dataSource={dataSource}
            onEdit={handleEdit}
            onLog={handleLog} // ★ 傳遞處理函式
            onDelete={handleDelete}
            onSaveRemark={handleSaveRemark}
          />
        </div>
      </div>

      {/* ★ 使用 Hook 回傳的狀態 */}
      <HandlerModal open={isLogOpen} onCancel={closeLogs} logs={currentLogs} />
    </ConfigProvider>
  )
}
