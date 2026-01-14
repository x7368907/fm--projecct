import { useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Button, Table, Input } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

// 1. 引入共用元件 (請依照您的專案路徑調整)
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import QuickRangePicker from '../../components/QuickRangePicker'

// 設定主題色 (Teal 色系)
const theme = { token: { colorPrimary: '#14b8a6' } }

// =============================================================================
// 資料定義與模擬資料
// =============================================================================

interface TransactionData {
  key: string
  agentLevel: string
  agentName: string
  memberName: string
  // 儲值
  manualDeposit: { amount: number; count: number }
  atmDeposit: { amount: number; count: number }
  creditDeposit: { amount: number; count: number }
  epayDeposit: { amount: number; count: number }
  usdtDeposit: { amount: number; count: number }
  cvsDeposit: { amount: number; count: number }
  depositSubtotal: number
  // 託售
  bankWithdraw: { amount: number; count: number }
  usdtWithdraw: { amount: number; count: number }
  withdrawSubtotal: number
  // 加扣點
  addPoints: { amount: number; count: number }
  deductPoints: { amount: number; count: number }
  pointsSubtotal: number
}

const MOCK_DATA: TransactionData[] = [
  {
    key: '1',
    agentLevel: '1/4 (8)',
    agentName: '魯夫',
    memberName: '(0筆)',
    manualDeposit: { amount: 0, count: 0 },
    atmDeposit: { amount: 2831594, count: 552 },
    creditDeposit: { amount: 0, count: 0 },
    epayDeposit: { amount: 0, count: 0 },
    usdtDeposit: { amount: 20800, count: 5 },
    cvsDeposit: { amount: 495391, count: 133 },
    depositSubtotal: 3347785,
    bankWithdraw: { amount: -1410000, count: 63 },
    usdtWithdraw: { amount: -48093, count: 33 },
    withdrawSubtotal: -1458093,
    addPoints: { amount: 208097, count: 23 },
    deductPoints: { amount: 0, count: 0 },
    pointsSubtotal: 208097,
  },
  {
    key: '2',
    agentLevel: '1/7 (51)',
    agentName: '悟空',
    memberName: '(0筆)',
    manualDeposit: { amount: 0, count: 0 },
    atmDeposit: { amount: 1038205, count: 383 },
    creditDeposit: { amount: 0, count: 0 },
    epayDeposit: { amount: 0, count: 0 },
    usdtDeposit: { amount: 76541, count: 17 },
    cvsDeposit: { amount: 446982, count: 115 },
    depositSubtotal: 446982,
    bankWithdraw: { amount: -960022, count: 51 },
    usdtWithdraw: { amount: -5900, count: 16 },
    withdrawSubtotal: -965922,
    addPoints: { amount: 138380, count: 17 },
    deductPoints: { amount: 0, count: 0 },
    pointsSubtotal: 138380,
  },
  {
    key: '3',
    agentLevel: '1/5 (4)',
    agentName: '漩渦鳴人',
    memberName: '(0筆)',
    manualDeposit: { amount: 0, count: 0 },
    atmDeposit: { amount: 2052904, count: 609 },
    creditDeposit: { amount: 0, count: 0 },
    epayDeposit: { amount: 0, count: 0 },
    usdtDeposit: { amount: 469000, count: 13 },
    cvsDeposit: { amount: 420805, count: 131 },
    depositSubtotal: 420805,
    bankWithdraw: { amount: -2400000, count: 148 },
    usdtWithdraw: { amount: -13906, count: 17 },
    withdrawSubtotal: -2413906,
    addPoints: { amount: 219456, count: 24 },
    deductPoints: { amount: 0, count: 0 },
    pointsSubtotal: 219456,
  },
]

// 輔助元件：金額與筆數顯示 (樣式與設計稿一致)
const MoneyCell = ({ amount, count }: { amount: number; count: number }) => (
  <div className="flex flex-col items-center justify-center py-1">
    <span
      className={`text-[13px] font-medium tracking-wide ${
        amount < 0 ? 'text-red-500' : 'text-gray-700'
      }`}
    >
      {amount.toLocaleString()}
    </span>
    {/* 筆數顯示藍色且較小 */}
    <span className="text-[11px] font-bold text-blue-600">({count}筆)</span>
  </div>
)

// =============================================================================
// 主元件：Transaction
// =============================================================================

export default function Transaction() {
  // 定義搜尋欄位配置
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '代理級別',
        name: 'agentLevel',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="請選擇"
            allowClear
            options={[
              { value: '1', label: '1級總代理' },
              { value: '2', label: '2級代理' },
            ]}
          />
        ),
      },
      {
        label: '會員姓名',
        name: 'memberName',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => <Input placeholder="輸入姓名" />,
      },
      {
        label: '日期時間',
        name: 'dateRange',
        // 日期欄位寬度較大，RWD設大一點
        colProps: { xs: 24, lg: 12, xl: 10 },
        render: () => <QuickRangePicker />,
      },
    ],
    []
  )

  // 搜尋處理
  const handleSearch = (values: any) => {
    console.log('Search Values:', values)
    // 這裡實作 API 呼叫
  }

  // 下載按鈕 (將傳入 SearchPanel 的 extra 插槽)
  const downloadBtn = (
    <Button
      icon={<DownloadOutlined />}
      className="border-green-500 text-green-500 shadow-sm hover:!border-green-600 hover:bg-green-50 hover:!text-green-600"
    >
      下載
    </Button>
  )

  // 定義表格欄位 (Nested Headers)
  const columns: ColumnsType<TransactionData> = [
    {
      title: '代理級別',
      dataIndex: 'agentLevel',
      key: 'agentLevel',
      width: 100,
      fixed: 'left',
      align: 'center',
      className: 'bg-gray-50 text-gray-600 font-medium',
    },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      key: 'agentName',
      width: 100,
      fixed: 'left',
      align: 'center',
      className: 'bg-gray-50 text-gray-800',
    },
    {
      title: '會員姓名',
      dataIndex: 'memberName',
      key: 'memberName',
      width: 100,
      fixed: 'left',
      align: 'center',
      className: 'bg-gray-50 text-gray-500 text-xs',
    },
    // --- 儲值群組 ---
    {
      title: '儲值',
      className:
        'bg-gray-100 text-center text-gray-700 font-bold border-b-gray-300',
      children: [
        {
          title: '人工上分',
          key: 'manualDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.manualDeposit} />,
        },
        {
          title: 'ATM',
          key: 'atmDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.atmDeposit} />,
        },
        {
          title: '信用卡',
          key: 'creditDeposit',
          width: 90,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.creditDeposit} />,
        },
        {
          title: '電子支付',
          key: 'epayDeposit',
          width: 90,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.epayDeposit} />,
        },
        {
          title: 'USDT',
          key: 'usdtDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.usdtDeposit} />,
        },
        {
          title: '超商(CSV)',
          key: 'cvsDeposit',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.cvsDeposit} />,
        },
        {
          title: '小計',
          dataIndex: 'depositSubtotal',
          key: 'depositSubtotal',
          width: 120,
          align: 'center',
          className: 'bg-gray-50', // 小計欄位給一點背景色區隔
          render: (v) => (
            <span className="text-[13px] font-bold text-gray-800">
              {v.toLocaleString()}
            </span>
          ),
        },
      ],
    },
    // --- 託售群組 ---
    {
      title: '託售',
      className:
        'bg-gray-100 text-center text-gray-700 font-bold border-b-gray-300',
      children: [
        {
          title: '銀行卡',
          key: 'bankWithdraw',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.bankWithdraw} />,
        },
        {
          title: 'USDT',
          key: 'usdtWithdraw',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.usdtWithdraw} />,
        },
        {
          title: '小計',
          dataIndex: 'withdrawSubtotal',
          key: 'withdrawSubtotal',
          width: 120,
          align: 'center',
          className: 'bg-gray-50',
          render: (v) => (
            <span className="text-[13px] font-bold text-gray-800">
              {v.toLocaleString()}
            </span>
          ),
        },
      ],
    },
    // --- 加扣點群組 ---
    {
      title: '加扣點',
      className:
        'bg-gray-100 text-center text-gray-700 font-bold border-b-gray-300',
      children: [
        {
          title: '加點',
          key: 'addPoints',
          width: 110,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.addPoints} />,
        },
        {
          title: '扣點',
          key: 'deductPoints',
          width: 90,
          align: 'center',
          render: (_, r) => <MoneyCell {...r.deductPoints} />,
        },
        {
          title: '小計',
          dataIndex: 'pointsSubtotal',
          key: 'pointsSubtotal',
          width: 110,
          align: 'center',
          className: 'bg-gray-50',
          render: (v) => (
            <span className="text-[13px] font-bold text-gray-800">
              {v.toLocaleString()}
            </span>
          ),
        },
      ],
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <div className="flex min-h-screen flex-col bg-gray-50 p-4">
        {/* 麵包屑導航 */}
        <Breadcrumb separator=">" className="mb-4 text-sm">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            交易管理查詢
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊：使用共用 SearchPanel */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ agentLevel: '1' }}
          onSearch={handleSearch}
          extra={downloadBtn} // 傳入下載按鈕
        />

        {/* 表格區塊 */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Table
            columns={columns}
            dataSource={MOCK_DATA}
            rowKey="key"
            bordered
            size="middle"
            scroll={{ x: 1800 }}
            pagination={{
              total: 26,
              pageSize: 20,
              showSizeChanger: false,
              showQuickJumper: true,
              position: ['bottomCenter'],
              showTotal: (total) => `總計 ${total} 筆資料`,
            }}
            // 讓表頭文字不要換行，保持美觀
            className="[&_.ant-table-thead_th]:whitespace-nowrap"
          />
        </div>
      </div>
    </ConfigProvider>
  )
}
