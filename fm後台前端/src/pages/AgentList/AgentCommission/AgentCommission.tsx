import React, { useState, useEffect } from 'react'
import { Breadcrumb, ConfigProvider, Select, message } from 'antd'
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import CommissionTable from './components/CommissionTable'
import CreateCommission from './form/CreateCommission'
import HandlerModal from '../components/HandlerModal'
import { useCommissionLogs } from './hooks/useCommissionLogs'
import { commission } from '../../../api/commission'
import type { CommissionData } from './types'

const themeConfig = {
  token: { colorPrimary: '#14b8a6' },
}

const AgentCommission: React.FC = () => {
  const [page, setPage] = useState<'list' | 'form'>('list')
  const [editingRecord, setEditingRecord] = useState<CommissionData | null>(
    null
  )

  // 列表資料與 Loading 狀態
  const [dataSource, setDataSource] = useState<CommissionData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { logs, open, setOpen, fetchLogs } = useCommissionLogs()

  // 定義搜尋欄位
  const searchFields: SearchField[] = [
    {
      label: '分潤比例(%)',
      name: 'profitRate',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          options={[
            { label: '全部', value: 'all' },
            { label: '100', value: '100' },
            { label: '95', value: '95' },
            { label: '90', value: '90' },
            { label: '85', value: '85' },
            { label: '80', value: '80' },
          ]}
        />
      ),
    },
    {
      label: '結算方式',
      name: 'settlement',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          options={[
            { label: '全部', value: 'all' },
            { label: '週結', value: '週結' },
            { label: '月結', value: '月結' },
          ]}
        />
      ),
    },
  ]

  const initialValues = {
    profitRate: 'all',
    settlement: 'all',
  }

  // 搜尋與 API 呼叫邏輯
  const handleSearch = async (values: typeof initialValues) => {
    setLoading(true)
    try {
      // 對應後端 FastAPI 的 Query 參數：ratio, settlement
      const apiParams = {
        ratio:
          values.profitRate === 'all' ? undefined : Number(values.profitRate),
        settlement: values.settlement === 'all' ? undefined : values.settlement,
      }

      // 呼叫 API
      const result: any = await commission(apiParams)

      // ★ 修正處：配合後端 return {"data": query.all()}
      // 我們從 result.data 取出真正的陣列
      const list = result?.data || []

      // 確保是陣列才設定，否則給空陣列
      setDataSource(Array.isArray(list) ? list : [])
    } catch (error) {
      console.error(error)
      message.error('搜尋失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  // 初始化載入資料
  useEffect(() => {
    handleSearch(initialValues)
  }, [])

  const handleCreate = () => {
    setEditingRecord(null)
    setPage('form')
  }

  const handleEdit = (record: CommissionData) => {
    setEditingRecord(record)
    setPage('form')
  }

  const handleFormSuccess = () => {
    setPage('list')
    handleSearch(initialValues) // 新增/編輯成功後刷新列表
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>代理管理</Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={page === 'form' ? () => setPage('list') : undefined}
            className={
              page === 'form'
                ? 'cursor-pointer transition-colors hover:text-teal-600'
                : ''
            }
          >
            分潤管理
          </Breadcrumb.Item>
          {page === 'form' && (
            <Breadcrumb.Item>
              {editingRecord ? '編輯分潤' : '新增分潤'}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        {page === 'list' ? (
          <>
            <SearchPanel
              fields={searchFields}
              initialValues={initialValues}
              onCreate={handleCreate}
              onSearch={handleSearch}
            />

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <CommissionTable
                dataSource={dataSource}
                loading={loading}
                onEdit={handleEdit}
                onLogs={fetchLogs}
              />
            </div>

            <HandlerModal
              open={open}
              logs={logs}
              onCancel={() => setOpen(false)}
            />
          </>
        ) : (
          <CreateCommission
            initialValues={editingRecord}
            onCancel={() => setPage('list')}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </ConfigProvider>
  )
}

export default AgentCommission
