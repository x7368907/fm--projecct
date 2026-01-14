import { Breadcrumb, Card, Input, Select, ConfigProvider } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

// Hooks & Components
import { usePointsDetail } from './hooks/usePointsDetail'
import { useHandlerLogs } from './hooks/useHandlerLogs'
import { getColumns } from './columns'
import SummaryBar from './components/SummaryBar'
import PointsTable from './components/PointsTable'
import HandlerModal from '../components/HandlerModal'
import ProfitDetailModal from './form/ProfitDetailModal'
import BetDetailModal from './form/BetDetailModal'

const theme = { token: { colorPrimary: '#14b8a6' } }
export default function PointsDetail() {
  const logic = usePointsDetail()
  const logsLogic = useHandlerLogs()

  // Columns 設定
  const columns = getColumns({
    onOpenDetail: logic.handleOpenDetail,
    onOpenProfit: logic.handleOpenProfit,
    onUpdateNote: logic.handleUpdateNote,
    onFetchLogs: (record) => logsLogic.fetchLogs(record.key),
  })

  // 2. 定義搜尋欄位 (上層5個，下層4個)
  const searchFields: SearchField[] = [
    // --- 第一列 (總和 24) ---
    // 邏輯：下拉選單短一點(3-4)，輸入框長一點(5-6)
    {
      label: '代理級別',
      name: 'level',
      colProps: { xs: 24, sm: 12, md: 4 }, // 改小：級別選項通常很短，給 3 就好
      render: () => (
        <Select placeholder="1級總代理" allowClear>
          <Select.Option value="lvl1">1級總代理</Select.Option>
        </Select>
      ),
    },
    {
      label: '代理名稱',
      name: 'agentName',
      colProps: { xs: 24, sm: 12, md: 4 }, // 加大：輸入框需要空間
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '代理帳號',
      name: 'agentAccount',
      colProps: { xs: 24, sm: 12, md: 4 }, // 加大
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '代理姓名',
      name: 'realName',
      colProps: { xs: 24, sm: 12, md: 4 }, // 加大
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '帳號狀態',
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 6 }, // 改小：狀態通常只有2-3個字，給 3
      render: () => (
        <Select placeholder="全部" allowClear>
          <Select.Option value="all">全部</Select.Option>
          <Select.Option value="active">啟用</Select.Option>
        </Select>
      ),
    },

    // --- 第二列 (總和 24) ---
    // 邏輯：日期要給最大空間，剩下的給分潤設定
    {
      label: '分潤制度',
      name: 'profitType',
      colProps: { xs: 24, sm: 12, md: 4 }, // 微調：給 4
      render: () => (
        <Select placeholder="全部" allowClear>
          <Select.Option value="all">全部</Select.Option>
        </Select>
      ),
    },
    {
      label: '代理分潤結算',
      name: 'settlement',
      colProps: { xs: 24, sm: 12, md: 4 }, // 微調：給 4
      render: () => (
        <Select placeholder="全部" allowClear>
          <Select.Option value="all">全部</Select.Option>
        </Select>
      ),
    },
    {
      label: '結算起訖日',
      name: 'dateRange',
      colProps: { xs: 24, sm: 24, md: 8 }, // 加大：日期非常佔空間，給它一半(12)避免斷行
      render: () => <QuickRangePicker />,
    },
  ]
  // 設定表單預設值
  const initialValues = {
    level: 'lvl1',
    status: 'all',
    profitType: 'all',
    settlement: 'all',
    pageSize: '20',
  }

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
    // logic.fetchData(values)
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>代理管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-black">
            代理分潤管理
          </Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          fields={searchFields}
          initialValues={initialValues}
          onSearch={handleSearch}
        />

        <Card className="shadow-sm" bodyStyle={{ padding: 0 }}>
          <SummaryBar
            activeTab={logic.activeTab}
            onTabChange={logic.setActiveTab}
            totalAmount={2954100}
            counts={{
              pending: logic.pendingCount,
              approved: logic.approvedCount,
              rejected: logic.rejectedCount,
            }}
          />
          <PointsTable dataSource={logic.filteredData} columns={columns} />
        </Card>

        {/* Modals */}
        <HandlerModal
          open={logsLogic.isHandlerModalOpen}
          onCancel={() => logsLogic.setIsHandlerModalOpen(false)}
          logs={logsLogic.currentLogs}
        />
        <BetDetailModal
          open={logic.isDetailModalOpen}
          onCancel={() => logic.setIsDetailModalOpen(false)}
          type={logic.detailModalType}
        />
        <ProfitDetailModal
          open={logic.isProfitModalOpen}
          onCancel={() => logic.setIsProfitModalOpen(false)}
          profitMode={logic.currentProfitMode}
        />
      </div>
    </ConfigProvider>
  )
}
