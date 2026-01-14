import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select } from 'antd' // 記得引入 Select

// 引入上面的共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'

import CommissionTable from './components/CommissionTable'
import CreateCommission from './form/CreateCommission'
import HandlerModal from '../../AgentList/components/HandlerModal'
import { useCommissionLogs } from './hooks/useCommissionLogs'
import type { CommissionData } from './types'

const themeConfig = {
  token: { colorPrimary: '#14b8a6' },
}

export default function AgentCommission() {
  const [page, setPage] = useState<'list' | 'form'>('list')
  const [editingRecord, setEditingRecord] = useState<CommissionData | null>(
    null
  )

  const { logs, open, setOpen, fetchLogs } = useCommissionLogs()

  // ★ 1. 把你原本的欄位定義在這裡 (完全照搬你的選項)
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
            { label: '週結', value: 'week' },
            { label: '月結', value: 'month' },
          ]}
        />
      ),
    },
  ]

  // ★ 2. 設定初始值
  const initialValues = {
    profitRate: 'all',
    settlement: 'all',
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setPage('form')
  }

  const handleEdit = (record: CommissionData) => {
    setEditingRecord(record)
    setPage('form')
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
            {/* ★ 使用共用元件 */}
            <SearchPanel
              fields={searchFields}
              initialValues={initialValues} // 傳入預設值
              onCreate={handleCreate} // 傳入此屬性才會顯示新增按鈕
              onSearch={fetchLogs}
            />

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <CommissionTable onEdit={handleEdit} onLogs={fetchLogs} />
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
            onSuccess={() => setPage('list')}
          />
        )}
      </div>
    </ConfigProvider>
  )
}
