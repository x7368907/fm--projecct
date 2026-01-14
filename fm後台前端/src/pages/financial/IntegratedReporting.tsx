import { useState } from 'react'
import {
  Table,
  Input,
  Select,
  Radio,
  Tabs,
  Breadcrumb,
  Space,
  Form,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 共用元件
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import QuickRangePicker from '../../components/QuickRangePicker'
import DetailModal, { type DetailDataType } from '../../components/DetailModal'

// ----------- 資料型別與模擬數據 -----------
interface DataType {
  key: string
  agentLevel: string
  agentName: string
  memberCount: number
  betCount: number
  betAmount: number
  validBetAmount: number
  winAmount: number
  lossAmount: number
  deposit: number
  withdraw: number
  rebate: number
  discount: number
  cost: number
  commission: number
  gameFee: number
  netProfit: number
}

const mockData: DataType[] = [
  {
    key: '1',
    agentLevel: '1 / 4 (8)',
    agentName: 'FMCA (金流/成數代理-主站)',
    memberCount: 2525,
    betCount: 449,
    betAmount: 15852149658,
    validBetAmount: 15852149658,
    winAmount: 7489722,
    lossAmount: 10617856,
    deposit: 363504,
    withdraw: 6340800,
    rebate: 6340860,
    discount: 9690,
    cost: 600,
    commission: 11773,
    gameFee: 50,
    netProfit: 17491.58,
  },
  {
    key: '2',
    agentLevel: '1 / 7 (51)',
    agentName: 'XOUT (金流/成數代理-外單位)',
    memberCount: 45876,
    betCount: 465753,
    betAmount: 81346514,
    validBetAmount: 81346514,
    winAmount: 1354515,
    lossAmount: 79991999,
    deposit: 162541.8,
    withdraw: 244039542,
    rebate: 244039542,
    discount: 0,
    cost: 94800,
    commission: 73211862,
    gameFee: 23652,
    netProfit: 14321799,
  },
]

export default function Integrate() {
  const searchFields: SearchField[] = [
    {
      label: (
        <div className="flex items-center gap-3">
          <span>代理級別</span>
          <div onClick={(e) => e.stopPropagation()} className="font-normal">
            <Form.Item name="settlementType" initialValue="general" noStyle>
              <Radio.Group>
                <Radio value="general">總代交收</Radio>
                <Radio value="individual">個別交收</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
      ),
      name: 'agentLevel',
      colProps: { xs: 24, md: 10, lg: 6, xl: 5 },
      render: () => (
        <Space
          direction="vertical"
          size={2}
          className="mt-1 w-full items-start"
        >
          <Select
            placeholder="請選擇"
            options={[
              { label: '總代理', value: 'all' },
              { label: '1級總代理', value: 'level1' },
              { label: '2級代理', value: 'level2' },
              { label: '3級代理', value: 'level3' },
            ]}
            className="w-full"
          />
        </Space>
      ),
    },
    {
      label: '代理名稱',
      name: 'agentName',
      colProps: { xs: 24, md: 8, lg: 5, xl: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '報表時間',
      name: 'dateRange',
      colProps: { xs: 24, md: 24, lg: 10, xl: 10 },
      render: () => <QuickRangePicker />,
    },
    {
      label: '每頁顯示',
      name: 'pageSize',
      colProps: { xs: 12, md: 4, lg: 3, xl: 2 },
      render: () => (
        <Select
          options={[
            { value: 20, label: '20' },
            { value: 50, label: '50' },
          ]}
        />
      ),
    },
  ]

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }
  // ----------- 彈窗控制邏輯 -----------
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    subTitle: '',
    data: [] as DetailDataType[],
    // 新增：用來標記這個彈窗的類型，方便 DetailModal 決定標題欄位顯示「代理級別」還是「類別」
    mode: 'agent' as 'agent' | 'category',
  })

  const handleOpenDetail = (
    title: string,
    field: keyof DataType,
    record: DataType
  ) => {
    let mockDetails: DetailDataType[] = []
    let mode: 'agent' | 'category' = 'agent'

    if (field === 'netProfit') {
      // 【特殊處理】公司淨利：根據你的截圖，這裡顯示的是計算公式的 breakdown
      mode = 'category' // 切換模式
      mockDetails = [
        { key: '1', label: '會員輸贏', value: 13380 },
        { key: '2', label: '遊戲上繳金額', value: -1605.6 },
        { key: '3', label: '會員返水', value: -40.52 },
        { key: '4', label: '會員優惠', value: -2226 },
        { key: '5', label: '營運成本', value: 150 },
        { key: '6', label: '代理分潤', value: -11773 },
      ]
    } else {
      // 【一般情況】其他所有欄位：顯示下級代理的列表
      const isMoneyField =
        field.toString().toLowerCase().includes('amount') ||
        ['rebate', 'discount', 'cost', 'commission', 'gameFee'].includes(field)

      const generateValue = () =>
        isMoneyField
          ? Math.floor(Math.random() * 1000000)
          : Math.floor(Math.random() * 500)

      mockDetails = [
        { key: '1', label: '1級總代理', value: generateValue() },
        { key: '2', label: '2級代理', value: generateValue() },
        { key: '3', label: '3級代理', value: generateValue() },
        { key: '4', label: '4級代理', value: generateValue() },
      ]
    }

    setModalState({
      open: true,
      title: title,
      subTitle: record.agentName,
      data: mockDetails,
      mode: mode,
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  // Helper: 處理純文字金額顯示 (主要用於合計欄位)
  const renderMoney = (value: number, isRed: boolean = false) => (
    <span className={`${isRed ? 'text-red-500' : 'text-gray-700'} font-medium`}>
      {value.toLocaleString()}
    </span>
  )

  // Helper: 產生可點擊的連結樣式
  // colorClass: 控制文字顏色 (text-blue-500, text-red-500, text-green-600)
  const renderLink = (
    val: number,
    title: string,
    field: keyof DataType,
    record: DataType,
    colorClass: string = 'text-blue-500'
  ) => (
    <a
      className={`${colorClass} cursor-pointer font-medium underline hover:opacity-80`}
      onClick={() => handleOpenDetail(title, field, record)}
    >
      {val.toLocaleString()}
    </a>
  )
  // ----------- 3. 計算合計資料 (用於表頭顯示) -----------
  const totalData = {
    memberCount: mockData.reduce((acc, cur) => acc + cur.memberCount, 0),
    betCount: mockData.reduce((acc, cur) => acc + cur.betCount, 0),
    betAmount: mockData.reduce((acc, cur) => acc + cur.betAmount, 0),
    validBetAmount: mockData.reduce((acc, cur) => acc + cur.validBetAmount, 0),
    winAmount: mockData.reduce((acc, cur) => acc + cur.winAmount, 0),
    lossAmount: mockData.reduce((acc, cur) => acc + cur.lossAmount, 0),
    deposit: mockData.reduce((acc, cur) => acc + cur.deposit, 0),
    withdraw: mockData.reduce((acc, cur) => acc + cur.withdraw, 0),
    rebate: mockData.reduce((acc, cur) => acc + cur.rebate, 0),
    discount: mockData.reduce((acc, cur) => acc + cur.discount, 0),
    cost: mockData.reduce((acc, cur) => acc + cur.cost, 0),
    commission: mockData.reduce((acc, cur) => acc + cur.commission, 0),
    gameFee: mockData.reduce((acc, cur) => acc + cur.gameFee, 0),
    netProfit: mockData.reduce((acc, cur) => acc + cur.netProfit, 0),
  }

  // ----------- Columns 設定  -----------
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div className="w-full pr-4 text-right font-bold text-gray-600">
          合計 :
        </div>
      ),
      fixed: 'left',
      children: [
        {
          title: '代理級別',
          dataIndex: 'agentLevel',
          key: 'agentLevel',
          width: 100,
          fixed: 'left',
          align: 'center',
        },
        {
          title: '代理名稱',
          dataIndex: 'agentName',
          key: 'agentName',
          width: 220,
          fixed: 'left',
          render: (text) => (
            <div className="flex flex-col">
              <a className="font-medium text-blue-500 hover:underline">
                {text.split(' ')[0]}
              </a>
              <span className="text-xs text-gray-400">
                {text.split(' ')[1]}
              </span>
            </div>
          ),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.memberCount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '會員數',
          dataIndex: 'memberCount',
          key: 'memberCount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '累計會員數', 'memberCount', record), // 藍色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.betCount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          key: 'betCount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '下注筆數', 'betCount', record), // 藍色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-blue-600">
          {totalData.betAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '下注金額',
          dataIndex: 'betAmount',
          key: 'betAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '下注金額', 'betAmount', record, 'text-blue-600'), // 藍色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-blue-600">
          {totalData.validBetAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '有效投注',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '有效投注金額',
              'validBetAmount',
              record,
              'text-blue-600'
            ), // 藍色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.winAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '中獎金額',
          dataIndex: 'winAmount',
          key: 'winAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '會員中獎金額',
              'winAmount',
              record,
              'text-green-600'
            ), // 綠色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-red-500">
          {renderMoney(totalData.lossAmount, true)}
        </div>
      ),
      children: [
        {
          title: '虧損金額',
          dataIndex: 'lossAmount',
          key: 'lossAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '會員虧損金額',
              'lossAmount',
              record,
              'text-red-500'
            ), // 紅色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.deposit.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '儲值',
          dataIndex: 'deposit',
          key: 'deposit',
          align: 'right',
          render: (val) => renderMoney(val), // 儲值通常不需彈窗，或需求未提，維持純文字
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.withdraw.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '託售',
          dataIndex: 'withdraw',
          key: 'withdraw',
          align: 'right',
          render: (val) => renderMoney(val), // 託售通常不需彈窗，維持純文字
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.rebate.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '會員返水',
          dataIndex: 'rebate',
          key: 'rebate',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '會員返水', 'rebate', record, 'text-green-600'), // 綠色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.discount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '會員優惠',
          dataIndex: 'discount',
          key: 'discount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '會員優惠', 'discount', record, 'text-green-600'), // 綠色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.cost.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '營運成本',
          dataIndex: 'cost',
          key: 'cost',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '營運成本', 'cost', record, 'text-green-600'), // 綠色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.commission.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '代理分潤',
          dataIndex: 'commission',
          key: 'commission',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '代理分潤', 'commission', record, 'text-green-600'), // 綠色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.gameFee.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '遊戲上繳',
          dataIndex: 'gameFee',
          key: 'gameFee',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '遊戲上繳金額',
              'gameFee',
              record,
              'text-green-600'
            ), // 綠色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold">
          {renderMoney(totalData.netProfit, totalData.netProfit < 0)}
        </div>
      ),
      fixed: 'right',
      children: [
        {
          title: '公司淨利',
          dataIndex: 'netProfit',
          key: 'netProfit',
          align: 'right',
          fixed: 'right',
          width: 120,
          // 公司淨利 (紅色連結) - 注意：handleOpenDetail 內有特殊邏輯處理它
          render: (val, record) =>
            renderLink(val, '公司獲利', 'netProfit', record, 'text-red-500'),
        },
      ],
    },
  ]

  const tabItems = [
    { key: 'company', label: '公司' },
    { key: 'agent', label: '代理' },
    { key: 'member', label: '會員' },
    { key: 'betType', label: '下注類別' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item>整合報表</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <SearchPanel
        title="條件搜尋"
        fields={searchFields}
        onSearch={handleSearch}
        initialValues={{
          agentLevel: 'level1',
          pageSize: 20,
        }}
      />

      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <Tabs
          defaultActiveKey="company"
          items={tabItems}
          type="card"
          className="mb-4"
        />

        <div className="mb-4 border-l-4 border-teal-500 pl-2 text-lg font-bold text-gray-700">
          1級總代理
        </div>

        <Table
          columns={columns}
          dataSource={mockData} // 【修正】恢復使用原始資料，不需插入 total row
          scroll={{ x: 2200 }}
          pagination={{
            position: ['bottomLeft'],
            total: mockData.length,
            showTotal: (total) => `總計 ${total} 筆資料`,
            defaultPageSize: 20,
            className: 'p-4',
          }}
          bordered
          size="middle"
          rowClassName="hover:bg-blue-50 transition-colors"
        />
      </div>
      {/* 【新增】將彈窗元件放在這裡 */}
      <DetailModal
        open={modalState.open}
        onCancel={handleCloseModal}
        title={modalState.title}
        subTitle={modalState.subTitle}
        data={modalState.data}
        mode={modalState.mode} // <--- 加上這一行！
      />
    </div>
  )
}
