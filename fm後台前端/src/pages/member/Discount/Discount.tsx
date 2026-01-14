import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Card } from 'antd'

import { useDiscountData } from './hook/useDiscountData'
import { useDiscountLogs } from './hook/useDiscountLogs'
import DiscountTable from './components/DiscountTable'
import StatusTabs from './components/StatusTabs'
import BonusCreate from './form/BonusCreate'

import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'
import HandlerModal from '../../AgentList/components/HandlerModal'

const { Option } = Select
const themeConfig = { token: { colorPrimary: '#14b8a6' } }

export default function MemberDiscount() {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list')

  // Hooks
  const {
    filteredData,
    statusFilter,
    setStatusFilter,
    counts,
    handleUpdateRemark,
    handleStatusChange,
  } = useDiscountData()

  const { isHandlerModalOpen, currentLogs, fetchLogs, closeLogs } =
    useDiscountLogs()

  // 搜尋欄位設定
  const searchFields: SearchField[] = [
    {
      label: '代理級別',
      name: 'agentLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select placeholder="1級總代理">
          <Option value="1">1級總代理</Option>
        </Select>
      ),
    },
    {
      label: '代理名稱',
      name: 'agentName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '會員帳號',
      name: 'memberAccount',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '會員姓名',
      name: 'memberName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '帳號狀態',
      name: 'accountStatus',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select placeholder="全部">
          <Option value="all">全部</Option>
          <Option value="active">啟用</Option>
          <Option value="suspended">停用</Option>
        </Select>
      ),
    },
    {
      label: '優惠類別',
      name: 'discountType',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          options={[
            { label: '全部', value: 'all' },
            { label: '優惠', value: 'discount' },
            { label: '特權', value: 'privilege' },
            { label: '紅包', value: 'redpack' },
          ]}
        />
      ),
    },
    {
      label: '優惠名稱',
      name: 'discountName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          options={[
            { label: '全部', value: 'all' },
            { label: 'VIP2儲值回饋', value: 'vip2_deposit_bonus' },
            { label: '每月續儲贈10%', value: 'monthly_reload_10' },
            { label: '代理紅包', value: 'agent_redpack' },
            { label: '體驗金388', value: 'trial_bonus_388' },
            { label: '介紹金388', value: 'referral_bonus_388' },
          ]}
        />
      ),
    },
    {
      label: '申請時間',
      name: 'applyTime',
      colProps: { xs: 24, md: 6 },
      render: () => <QuickRangePicker />,
    },
  ]

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }

  // 1. 新增頁面
  if (viewMode === 'create') {
    return (
      <ConfigProvider theme={themeConfig}>
        <BonusCreate onCancel={() => setViewMode('list')} />
      </ConfigProvider>
    )
  }

  // 2. 列表頁面
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員優惠申請</Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: '20', status: 'pending' }}
          onSearch={handleSearch}
          onCreate={() => setViewMode('create')}
        />

        {/* 狀態按鈕 */}
        <StatusTabs
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          counts={counts}
        />

        {/* 表格區塊 */}
        <Card
          bordered={false}
          className="rounded-tl-none shadow-sm"
          bodyStyle={{ padding: 0 }}
        >
          <DiscountTable
            dataSource={filteredData}
            onUpdateRemark={handleUpdateRemark}
            onStatusChange={handleStatusChange}
            onFetchLogs={fetchLogs}
          />
        </Card>

        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={closeLogs}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
