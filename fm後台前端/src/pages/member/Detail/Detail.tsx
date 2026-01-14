import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Card } from 'antd'

import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'
import HandlerModal from '../../AgentList/components/HandlerModal'

import MemberTable from './components/DetailTable'
import MemberCreate from './form/MemberCreate'
import { useMemberLogs } from './hook/useHandlerLogs'
import type { DataType } from './types'

const themeConfig = { token: { colorPrimary: '#13c2c2' } }

export default function MemberDetail() {
  // --- 狀態管理 ---
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null)

  // --- Hook 邏輯 (經手人) ---
  const { currentLogs, isHandlerModalOpen, fetchLogs, closeHandlerModal } =
    useMemberLogs()

  // --- 搜尋欄位設定 ---
  const searchFields: SearchField[] = [
    {
      label: '標籤',
      name: 'tag',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="全部"
          options={[
            { label: '全部', value: 'all' },
            { label: 'IP黑名單', value: 'ip_blacklist' },
            { label: '裝置黑名單', value: 'device_blacklist' },
            { label: '金流黑名單', value: 'payment_blacklist' },
            { label: '新會員(註冊未滿30天)', value: 'new_member' },
            { label: '一般會員', value: 'normal_member' },
          ]}
        />
      ),
    },
    {
      label: '代理級別',
      name: 'agentLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Select placeholder="1級總代理" />,
    },
    {
      label: '代理名稱',
      name: 'agentName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: 'VIP等級',
      name: 'vipLevel',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          options={[
            { label: 'VIP0-遊客', value: 'vip0' },
            { label: 'VIP1-一般會員', value: 'vip1' },
            { label: 'VIP2-BOK會員', value: 'vip2' },
            { label: 'VIP3-青銅會員', value: 'vip3' },
            { label: 'VIP4-白銀會員', value: 'vip4' },
            { label: 'VIP5-黃金會員', value: 'vip5' },
            { label: 'VIP6-鑽石會員', value: 'vip6' },
            { label: 'VIP7-特邀會員', value: 'vip7' },
            { label: 'VIP10-無返水線', value: 'vip10' },
          ]}
        />
      ),
    },
    {
      label: '帳號狀態',
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          options={[
            { label: '啟用', value: 'active' },
            { label: '停用', value: 'disabled' },
            { label: '啟用(凍結錢包)', value: 'active_frozen_wallet' },
            { label: '啟用(停用儲值)', value: 'active_disable_deposit' },
            { label: '啟用(停用託售)', value: 'active_disable_withdraw' },
            { label: '終身停權', value: 'banned_forever' },
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
      label: '註冊時間',
      name: 'registerDate',
      colProps: { xs: 24, md: 6 },
      render: () => <QuickRangePicker />,
    },
    {
      label: '最後登入時間',
      name: 'loginDate',
      colProps: { xs: 24, md: 6 },
      render: () => <QuickRangePicker />,
    },
  ]

  // --- 事件處理 ---
  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
    // TODO: 呼叫 API
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('create')
  }

  const handleEdit = (record: DataType) => {
    setEditingRecord(record)
    setViewMode('edit')
  }

  const handleFormCancel = () => {
    setViewMode('list')
    setEditingRecord(null)
  }

  // --- 1. 渲染：新增/編輯模式 ---
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={themeConfig}>
        <MemberCreate
          mode={viewMode}
          initialValues={editingRecord}
          onCancel={handleFormCancel}
        />
      </ConfigProvider>
    )
  }

  // --- 2. 渲染：列表模式 ---
  return (
    <ConfigProvider theme={themeConfig}>
      <div
        style={{ minHeight: '100vh', background: '#f5f5f5', padding: '16px' }}
      >
        <Breadcrumb separator=">" style={{ marginBottom: '16px' }}>
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員資料</Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: '20' }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 表格區塊 */}
        <Card
          title="會員"
          bordered={true}
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
        >
          <MemberTable onEdit={handleEdit} onLogs={fetchLogs} />
        </Card>

        {/* 經手人彈窗 */}
        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={closeHandlerModal}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
