import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select, Tabs, message } from 'antd'

// 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'

// 引入剛拆分出去的表格元件
import PaymentTable from './components/PaymentTable'

// 引入表單容器
import PaymentCreate from './form/PaymentCreate'

// 引入資料與型別
import { MOCK_DEPOSIT_DATA, MOCK_WITHDRAW_DATA } from './utils/fakeData'
import type { DataType } from './types'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function PaymentFlow() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editing, setEditing] = useState<DataType | null>(null)
  const [activeTab, setActiveTab] = useState('deposit')

  // --- 1. 定義操作邏輯 (Handlers) ---
  const handleCreate = () => {
    setEditing(null)
    setView('create')
  }

  const handleEdit = (record: DataType) => {
    setEditing(record)
    setView('edit')
  }

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }

  const handleSaveRemark = (key: string, newRemark: string) => {
    console.log(`更新 Key: ${key} 的備註為: ${newRemark}`)
    message.success('備註已更新')
  }

  const handleLogs = (record: DataType) => {
    console.log('查看日誌:', record)
    message.info('開啟經手人紀錄')
  }

  // --- 2. 定義搜尋欄位 ---
  const searchFields: SearchField[] = [
    {
      label: '金流類型',
      name: 'paymentType',
      colProps: { xs: 24, sm: 12, md: 8, lg: 5 },
      render: () => (
        <Select
          placeholder="請選擇"
          allowClear
          options={[
            { label: 'ATM', value: 'ATM' },
            { label: 'Super-ATM', value: 'SuperATM' },
            { label: '信用卡', value: 'Credit' },
            { label: '電子支付', value: 'EPayment' },
            { label: '超商', value: 'CVS' },
            { label: 'USDT', value: 'USDT' },
          ]}
        />
      ),
    },
  ]

  // --- 3. 定義 Tabs 內容 (直接呼叫 PaymentTable) ---
  const tabItems = [
    {
      key: 'deposit',
      label: `儲值 (${MOCK_DEPOSIT_DATA.length})`,
      children: (
        <PaymentTable
          dataSource={MOCK_DEPOSIT_DATA}
          onEdit={handleEdit}
          onLogs={handleLogs}
          onSaveRemark={handleSaveRemark}
        />
      ),
    },
    {
      key: 'withdraw',
      label: `託售 (${MOCK_WITHDRAW_DATA.length})`,
      children: (
        <PaymentTable
          dataSource={MOCK_WITHDRAW_DATA}
          onEdit={handleEdit}
          onLogs={handleLogs}
          onSaveRemark={handleSaveRemark}
        />
      ),
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className={
              view !== 'list'
                ? 'cursor-pointer transition-colors hover:text-teal-600'
                : ''
            }
            onClick={() => setView('list')}
          >
            金流串接管理
          </Breadcrumb.Item>
          {view !== 'list' && (
            <Breadcrumb.Item>
              {view === 'edit' ? '編輯金流' : '新增金流'}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        {view === 'list' ? (
          <>
            <SearchPanel
              fields={searchFields}
              initialValues={{}}
              onSearch={handleSearch}
              onCreate={handleCreate}
            />
            {/* 用 div 包住 Tabs 是為了給予邊框和背景，
                但內部的 Table 樣式已經在 PaymentTable 處理好了 */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                type="card"
                className="custom-tabs"
              />
            </div>
          </>
        ) : (
          <PaymentCreate
            initialValues={view === 'edit' ? editing : null}
            onCancel={() => setView('list')}
          />
        )}
      </div>
    </ConfigProvider>
  )
}
