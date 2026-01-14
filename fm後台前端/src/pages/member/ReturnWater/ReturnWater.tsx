import { useState } from 'react'
import { Breadcrumb, ConfigProvider, Select, Input, Card } from 'antd'

// 引入拆分後的 Hooks 與 Components
import { useRebateModal } from './hook/useRebateModal'
import { useRebateLogs } from './hook/useRebateLogs'
import RebateTable from './components/RebateTable'
import RebateStats from './components/RebateStats'
import { MOCK_DATA } from './utils/fakeData'

// 引入外部共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'
import HandlerModal from '../../AgentList/components/HandlerModal'

const { Option } = Select
const themeConfig = { token: { colorPrimary: '#14b8a6' } }

export default function MemberRebateApplication() {
  // 1. 本地狀態
  const [activeProvider, setActiveProvider] = useState('全部')
  const [activeTimeProvider, setTimeProvider] = useState('時')

  // 2. Hooks 邏輯
  const { openBatchModal, BatchModal } = useRebateModal()
  const { isLogModalOpen, currentLogs, showLogs, closeLogs } = useRebateLogs()

  // 3. 搜尋欄位設定
  const searchFields: SearchField[] = [
    {
      label: '代理級別',
      name: 'agentLevel',
      colProps: { xs: 24, sm: 12, md: 3 },
      render: () => (
        <Select placeholder="1級總代理">
          <Option value="all">1級總代理</Option>
          <Option value="2">2級代理</Option>
        </Select>
      ),
    },
    {
      label: '遊戲館',
      name: 'provider',
      colProps: { xs: 24, sm: 12, md: 3 },
      render: () => (
        <Select placeholder="電子">
          <Option value="all">電子</Option>
          <Option value="live">真人</Option>
        </Select>
      ),
    },
    {
      label: '會員姓名',
      name: 'memberName',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '審核狀態',
      name: 'auditStatus',
      colProps: { xs: 24, sm: 12, md: 3 },
      render: () => (
        <Select placeholder="待審核">
          <Option value="pending">待審核</Option>
          <Option value="approved">已通過</Option>
        </Select>
      ),
    },
    {
      label: '結算返水時間',
      name: 'dateRange',
      colProps: { xs: 24, sm: 12, md: 7 },
      render: () => <QuickRangePicker />,
    },
  ]

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }

  // 4. 渲染
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員返水申請</Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{
            agentLevel: 'all',
            provider: 'all',
            auditStatus: 'pending',
          }}
          onSearch={handleSearch}
        />

        {/* 統計與操作按鈕 */}
        <RebateStats
          activeProvider={activeProvider}
          setActiveProvider={setActiveProvider}
          activeTimeProvider={activeTimeProvider}
          setTimeProvider={setTimeProvider}
          onBatchIssue={() => openBatchModal('issue')}
          onBatchReject={() => openBatchModal('reject')}
          totalAmount={99999999}
        />

        {/* 表格區塊 */}
        <Card bordered={false} className="shadow-sm" bodyStyle={{ padding: 0 }}>
          <RebateTable dataSource={MOCK_DATA} onShowLog={showLogs} />
        </Card>

        {/* 彈窗 */}
        <HandlerModal
          open={isLogModalOpen}
          onCancel={closeLogs}
          logs={currentLogs}
        />
        <BatchModal />
      </div>
    </ConfigProvider>
  )
}
