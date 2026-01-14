import { useState, useMemo } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Select,
  Button,
  Tabs,
  Table,
  message,
  Radio,
} from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

// 1. 引用共用元件 (假設路徑正確)
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

// 2. 引用拆分出去的彈窗元件
// import BetDetailModal, {
//   type BetDetailType,
// } from './GameManagement/components/modal/BetDetailModal'
// import JcDetailModal, {
//   type JcDetailType,
// } from './GameManagement/components/modal/JcDetailModal'
// import RevenueDetailModal, {
//   type RevenueDetailType,
// } from './GameManagement/components/modal/RevenueDetailModal'

// 設定主題色
const theme = { token: { colorPrimary: '#14b8a6' } }

// =============================================================================
// 資料定義：主列表
// =============================================================================

interface GameSettlementType {
  key: string
  agentLevel: string
  agentName: string
  agentDesc: string
  category: string
  provider: string
  jpSettlement: string
  method: string
  date: string
  betCount: number
  betAmount: number
  validBet: number
  jc: number
  jp: number
  winAmount: number
  lossAmount: number
  jcJpTotal: number
  revenueAmount: number
  status: 'unpaid' | 'auditing' | 'paid'
}

// 模擬主列表資料
const MOCK_DATA: GameSettlementType[] = [
  {
    key: '1',
    agentLevel: '1 / 4 (8)',
    agentName: 'FMCA',
    agentDesc: '(金流/成數代理-主站)',
    category: '電子',
    provider: 'ATG',
    jpSettlement: '停用',
    method: '週結',
    date: '2025/07/10',
    betCount: 1,
    betAmount: 1000,
    validBet: 1000,
    jc: 0,
    jp: 0,
    winAmount: 0,
    lossAmount: 1000,
    jcJpTotal: 0,
    revenueAmount: 60,
    status: 'unpaid',
  },
  {
    key: '2',
    agentLevel: '1 / 7 (51)',
    agentName: 'XOUT',
    agentDesc: '(金流/成數代理-外單位)',
    category: '電子',
    provider: 'QT',
    jpSettlement: '停用',
    method: '月結',
    date: '2025/07/31',
    betCount: 1,
    betAmount: 1000,
    validBet: 1000,
    jc: 0,
    jp: 0,
    winAmount: 500,
    lossAmount: 500,
    jcJpTotal: 0,
    revenueAmount: 30,
    status: 'unpaid',
  },
  {
    key: '3',
    agentLevel: '1 / 5 (4)',
    agentName: 'FMCA02',
    agentDesc: '(金流/返水代理-主站)',
    category: '電子',
    provider: 'FM',
    jpSettlement: '停用',
    method: '週結',
    date: '2025/07/10',
    betCount: 1,
    betAmount: 1000,
    validBet: 1000,
    jc: 0,
    jp: 0,
    winAmount: 750,
    lossAmount: 250,
    jcJpTotal: 0,
    revenueAmount: 15,
    status: 'unpaid',
  },
  {
    key: '4',
    agentLevel: '1 / 4 (13)',
    agentName: 'XFW',
    agentDesc: '(金流/成數+返水代理-外單位)',
    category: '電子',
    provider: 'RSG',
    jpSettlement: '啟用',
    method: '月結',
    date: '2025/07/31',
    betCount: 2,
    betAmount: 1000,
    validBet: 1000,
    jc: 5,
    jp: 0,
    winAmount: 800,
    lossAmount: 200,
    jcJpTotal: 5,
    revenueAmount: 17,
    status: 'unpaid',
  },
  {
    key: '5',
    agentLevel: '1 / 5 (1)',
    agentName: 'W02',
    agentDesc: '(透支-(信用/成數代理-外單位))',
    category: '電子',
    provider: 'BT',
    jpSettlement: '停用',
    method: '月結',
    date: '2025/07/31',
    betCount: 2,
    betAmount: 1000,
    validBet: 1000,
    jc: 0,
    jp: 0,
    winAmount: 0,
    lossAmount: 0,
    jcJpTotal: 0,
    revenueAmount: 0,
    status: 'auditing',
  },
]

// 模擬彈窗資料：下注詳情
// const MOCK_BET_DETAILS: BetDetailType[] = [
//   {
//     key: 'd1',
//     playerName: '馬佩琳',
//     validBet: 1000,
//     winAmount: 0,
//     lossAmount: 1000,
//   },
// ]

// 模擬彈窗資料：彩金詳情
// const MOCK_JC_DETAILS: JcDetailType[] = [
//   {
//     key: 'j1',
//     provider: 'RSG',
//     validBet: 1000,
//     jcRate: 0.5,
//     jcAmount: 5,
//   },
// ]

// 模擬彈窗資料：遊戲上繳詳情
// const MOCK_REVENUE_DETAILS: RevenueDetailType[] = [
//   {
//     key: 'r1',
//     provider: 'ATG',
//     validBet: 1000,
//     rate: 0.06,
//     jcJp: 0,
//     amount: 60,
//   },
// ]

// =============================================================================
// 主元件：GameRevenueSettlement
// =============================================================================

export default function GameRevenueSettlement() {
  // --- 狀態管理 ---
  const [activeTab, setActiveTab] = useState('unpaid')
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  // 1. 經手人彈窗狀態
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // 2. 下注詳情彈窗狀態
  // const [isBetModalOpen, setIsBetModalOpen] = useState(false)
  // const [currentBetDetails, setCurrentBetDetails] = useState(MOCK_BET_DETAILS)

  // 3. 彩金貢獻值(JC)詳情彈窗狀態
  // const [isJcModalOpen, setIsJcModalOpen] = useState(false)
  // const [currentJcDetails, setCurrentJcDetails] = useState(MOCK_JC_DETAILS)

  // 4. 遊戲上繳金額詳情彈窗狀態
  // const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false)
  // const [currentRevenueDetails, setCurrentRevenueDetails] =
  //   useState(MOCK_REVENUE_DETAILS)

  // --- 搜尋欄位定義 ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '',
        name: 'agentLevelInfo',
        colProps: { xs: 24, md: 12, lg: 8 },
        render: () => (
          <div className="flex flex-col gap-1">
            <div className="mb-1 flex items-center gap-4">
              <span className="font-medium text-gray-600">代理級別</span>
              <Radio.Group defaultValue="total" size="small">
                <Radio value="total">總代交收</Radio>
                <Radio value="individual">個別交收</Radio>
              </Radio.Group>
            </div>
            <Select
              defaultValue="level1"
              style={{ width: '100%' }}
              options={[
                { label: '1級總代理', value: 'level1' },
                { label: '2級總代理', value: 'level2' },
                { label: '3級總代理', value: 'level3' },
              ]}
            />
          </div>
        ),
      },
      {
        label: '遊戲類別',
        name: 'category',
        colProps: { xs: 24, md: 12, lg: 6 },
        render: () => (
          <Select
            defaultValue="electronic"
            options={[
              { label: '電子', value: 'electronic' },
              { label: '真人', value: 'live' },
              { label: '體育', value: 'sports' },
            ]}
          />
        ),
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        colProps: { xs: 24, md: 12, lg: 6 },
        render: () => (
          <Select
            defaultValue="20"
            options={[
              { label: '20', value: '20' },
              { label: '50', value: '50' },
              { label: '100', value: '100' },
            ]}
          />
        ),
      },
    ],
    []
  )

  // --- 操作邏輯 (Handlers) ---

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.info(`執行搜尋`)
  }

  // 處理表格內的狀態下拉選單變更
  const handleRowStatusChange = (key: string, value: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: value as any } : item
      )
    )
    message.success('狀態已更新')
  }

  // 開啟經手人日誌
  const fetchLogs = (record: GameSettlementType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-07-31 10:00:00',
        handler: 'admin',
        status: '修改',
        details: `變更狀態為: ${record.status}`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  // 開啟下注詳情
  // const openBetDetail = (record: GameSettlementType) => {
  //   console.log('Open bet details for:', record.agentName)
  //   // 實務上這裡可以透過 record.key 去 fetch API
  //   setCurrentBetDetails(MOCK_BET_DETAILS)
  //   setIsBetModalOpen(true)
  // }

  // 開啟彩金貢獻值詳情
  // const openJcDetail = (record: GameSettlementType) => {
  //   console.log('Open JC details for:', record.agentName)
  //   setCurrentJcDetails(MOCK_JC_DETAILS)
  //   setIsJcModalOpen(true)
  // }

  // 開啟遊戲上繳金額詳情
  // const openRevenueDetail = (record: GameSettlementType) => {
  //   console.log('Open Revenue details for:', record.agentName)
  //   setCurrentRevenueDetails(MOCK_REVENUE_DETAILS)
  //   setIsRevenueModalOpen(true)
  // }

  // --- 主表格欄位定義 ---
  const columns: ColumnsType<GameSettlementType> = [
    {
      title: '代理級別',
      dataIndex: 'agentLevel',
      key: 'agentLevel',
      width: 100,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '代理名稱',
      key: 'agentName',
      width: 220,
      fixed: 'left',
      render: (_, r) => (
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-gray-800">{r.agentName}</span>
          <span className="text-[11px] text-gray-500">{r.agentDesc}</span>
        </div>
      ),
    },
    {
      title: '遊戲類別',
      dataIndex: 'category',
      key: 'category',
      width: 90,
      align: 'center',
    },
    {
      title: '遊戲商名稱',
      dataIndex: 'provider',
      key: 'provider',
      width: 110,
      align: 'center',
    },
    {
      title: '彩金結算',
      dataIndex: 'jpSettlement',
      key: 'jpSettlement',
      width: 90,
      align: 'center',
    },
    {
      title: '結算方式',
      dataIndex: 'method',
      key: 'method',
      width: 90,
      align: 'center',
    },
    {
      title: '結算日',
      dataIndex: 'date',
      key: 'date',
      width: 110,
      align: 'center',
    },
    {
      title: '下注筆數',
      dataIndex: 'betCount',
      key: 'betCount',
      width: 90,
      align: 'center',
      render: (v, record) => (
        <a
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => console.log(record)}
        >
          {v}
        </a>
      ),
    },
    {
      title: '投注金額',
      dataIndex: 'betAmount',
      key: 'betAmount',
      width: 100,
      align: 'right',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '有效投注金額',
      dataIndex: 'validBet',
      key: 'validBet',
      width: 120,
      align: 'right',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '彩金貢獻值(JC)',
      dataIndex: 'jc',
      key: 'jc',
      width: 120,
      align: 'center',
      render: (v, record) =>
        v > 0 ? (
          <a
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => console.log(record)}
          >
            {v}
          </a>
        ) : (
          '0'
        ),
    },
    {
      title: '彩金(JP)',
      dataIndex: 'jp',
      key: 'jp',
      width: 90,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '中獎金額',
      dataIndex: 'winAmount',
      key: 'winAmount',
      width: 100,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '虧損金額',
      dataIndex: 'lossAmount',
      key: 'lossAmount',
      width: 100,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: 'JC+JP',
      dataIndex: 'jcJpTotal',
      key: 'jcJpTotal',
      width: 80,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '遊戲上繳金額',
      dataIndex: 'revenueAmount',
      key: 'revenueAmount',
      width: 120,
      align: 'center',
      render: (v, record) => (
        <a
          className="cursor-pointer font-bold text-blue-600 hover:underline"
          onClick={() => console.log(record)}
        >
          {v.toLocaleString()}
        </a>
      ),
    },
    {
      title: '繳費狀態',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      align: 'center',
      fixed: 'right',
      render: (val, record) => (
        <Select
          value={val}
          size="small"
          style={{ width: 90 }}
          onChange={(v) => handleRowStatusChange(record.key, v)}
          options={[
            { label: '未繳費', value: 'unpaid' },
            { label: '待審核', value: 'auditing' },
            { label: '已繳費', value: 'paid' },
          ]}
        />
      ),
    },
    {
      title: '經手人',
      key: 'handler',
      width: 80,
      align: 'center',
      fixed: 'right',
      render: (_, r) => (
        <Button
          type="text"
          icon={<FileTextOutlined className="text-lg text-gray-600" />}
          onClick={() => fetchLogs(r)}
        />
      ),
    },
  ]

  // 定義 Tabs
  const tabItems = [
    { key: 'unpaid', label: '未繳費 (26)' },
    { key: 'paid', label: '已繳費 (0)' },
  ]

  // ===========================================================================
  // 渲染邏輯
  // ===========================================================================

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲上繳管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: '20', category: 'electronic' }}
          onSearch={handleSearch}
        />

        {/* 列表內容區塊 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems.map((tab) => ({
              label: tab.label,
              key: tab.key,
              children: (
                <div className="mt-4">
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="key"
                    pagination={{
                      total: dataSource.length,
                      pageSize: 20,
                      position: ['bottomCenter'],
                      showTotal: (total) => `共 ${total} 筆`,
                    }}
                    size="middle"
                    scroll={{ x: 1800 }}
                    rowClassName="hover:bg-gray-50 text-xs"
                    bordered
                  />
                </div>
              ),
            }))}
            type="card"
            className="custom-tabs"
          />
        </div>
      </div>

      {/* 1. 經手人彈窗 */}
      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={() => setIsHandlerModalOpen(false)}
        logs={currentLogs}
      />

      {/* 2. 下注詳情彈窗 */}
      {/* <BetDetailModal
        open={isBetModalOpen}
        onCancel={() => setIsBetModalOpen(false)}
        data={currentBetDetails}
      /> */}

      {/* 3. 彩金貢獻值(JC)彈窗 */}
      {/* <JcDetailModal
        open={isJcModalOpen}
        onCancel={() => setIsJcModalOpen(false)}
        data={currentJcDetails}
      /> */}

      {/* 4. 遊戲上繳金額彈窗 */}
      {/* <RevenueDetailModal
        open={isRevenueModalOpen}
        onCancel={() => setIsRevenueModalOpen(false)}
        data={currentRevenueDetails}
      /> */}
    </ConfigProvider>
  )
}
