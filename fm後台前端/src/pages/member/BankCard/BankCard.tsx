import { Breadcrumb, ConfigProvider, Card, Select, Input } from 'antd'

// 引入拆分後的 Hooks 與 Components
import { useBankCardData } from './hook/useBankCardData'
import { useBankCardLogs } from './hook/useHandlerLogs'
import StatusTabs from './components/StatusTabs'
import BankCardTable from './components/BankCardTable'

// 引入外部共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'

const themeConfig = { token: { colorPrimary: '#14b8a6' } }

export default function MemberBankCard() {
  // 1. 使用 Hooks 獲取邏輯與資料
  const { filteredData, activeTab, setActiveTab, handleUpdateNote, counts } =
    useBankCardData()

  const { isHandlerModalOpen, currentLogs, fetchLogs, closeLogs } =
    useBankCardLogs()

  // 2. 定義搜尋欄位
  const searchFields: SearchField[] = [
    {
      label: '標籤',
      name: 'level',
      colProps: { xs: 24, sm: 12, md: 3 },
      render: () => (
        <Select
          placeholder="請選擇"
          options={[
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
      label: '會員帳號',
      name: 'account',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input />,
    },
    {
      label: '會員姓名',
      name: 'realName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input />,
    },
    {
      label: '帳號狀態',
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 3 },
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
      label: '金流類型',
      name: 'type',
      colProps: { xs: 24, sm: 12, md: 3 },
      render: () => (
        <Select
          placeholder="請選擇"
          options={[
            { label: '實名認證', value: 'identity_verification' },
            { label: '銀行卡', value: 'bank_card' },
            { label: '信用卡', value: 'credit_card' },
            { label: '電子支付', value: 'electronic_payment' },
            { label: '超商', value: 'convenience_store' },
            { label: 'USDT', value: 'usdt' },
          ]}
        />
      ),
    },
  ]

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }

  // 3. 渲染主畫面
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員銀行卡</Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{
            pageSize: '20',
          }}
          onSearch={handleSearch}
        />

        {/* 狀態切換 */}
        <StatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        {/* 表格區塊 */}
        <Card className="shadow-sm">
          <BankCardTable
            data={filteredData}
            onUpdateNote={handleUpdateNote}
            onFetchLogs={fetchLogs}
          />
        </Card>

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
