import { useState, useMemo } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Select,
  Button,
  Table,
  Input,
  Tabs,
  Tag,
  message,
} from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

// 1. 引入共用元件 (路徑請依據你的專案結構調整)
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'
import QuickRangePicker from '../../components/QuickRangePicker'

const theme = { token: { colorPrimary: '#14b8a6' } }
const { TextArea } = Input

// =============================================================================
// 共用元件: EditableNoteCell (保持不變)
// =============================================================================
interface EditableNoteCellProps {
  value: string
  onSave: (newValue: string) => void
}

function EditableNoteCell({ value, onSave }: EditableNoteCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleEdit = () => {
    setTempValue(value)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
  }

  const handleSave = () => {
    onSave(tempValue)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2">
        <TextArea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 4 }}
          className="rounded-md border border-gray-300 bg-white text-xs focus:border-teal-500 focus:shadow-sm"
        />
        <div className="flex justify-end gap-2">
          <Button
            size="small"
            onClick={handleCancel}
            className="h-6 rounded border-red-300 bg-white text-xs text-red-400 hover:border-red-400 hover:text-red-500"
          >
            取消
          </Button>
          <Button
            size="small"
            onClick={handleSave}
            className="h-6 rounded border-none bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white"
          >
            完成
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md bg-gray-200 p-2 text-xs text-gray-600">
        {value || <span className="text-gray-400">尚無資訊...</span>}
      </div>
      <div>
        <Button
          size="small"
          onClick={handleEdit}
          className="h-6 rounded border-gray-300 bg-white px-3 text-xs text-gray-600 hover:border-teal-600 hover:text-teal-600"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// 資料定義: 針對託售 (Consign) 修改欄位
// =============================================================================
interface ConsignDataType {
  key: string
  tagType: 'ip_black' | 'normal' | 'money_black' | 'new'
  memberPhone: string
  memberLevel: string
  memberName: string
  group: string
  paymentType: string // 金流類型 (e.g. 銀行卡, USDT)
  transactionType: string // 交易類別 (e.g. 812-台新銀行)
  orderId: string
  amount: number // 託售金額

  // --- 託售特有欄位 ---
  dailyCount: string // 每日託售次數 (e.g. '1/3')
  dailyLimitUsed: number // 已用額度
  dailyLimitTotal: number // 總額度
  // ------------------

  requestTime: string
  statusNote: string
}

// 模擬資料 (根據你的截圖內容)
const MOCK_DATA: ConsignDataType[] = [
  {
    key: '1',
    tagType: 'ip_black',
    memberPhone: '0933501090',
    memberLevel: 'VIP1-一般會員',
    memberName: '車龍須',
    group: '常規會員',
    paymentType: '銀行卡',
    transactionType: '812-台新銀行',
    orderId: 'FMB606964098198707',
    amount: 1700,
    dailyCount: '1/3',
    dailyLimitUsed: 12654,
    dailyLimitTotal: 200000,
    requestTime: '2025-06-06 16:09:15',
    statusNote: '未收款',
  },
  {
    key: '2',
    tagType: 'normal',
    memberPhone: '0976139515',
    memberLevel: 'VIP1-一般會員',
    memberName: '賴俊宇',
    group: '常規會員',
    paymentType: '銀行卡',
    transactionType: '009-彰化銀行',
    orderId: 'FMB606963917684869',
    amount: 1000,
    dailyCount: '3/3',
    dailyLimitUsed: 98767,
    dailyLimitTotal: 200000,
    requestTime: '2025-06-06 14:43:00',
    statusNote:
      '已出款\n匯入銀行: 822-****03351\n會員綁定: 822-****03351 (已驗證)',
  },
  {
    key: '3',
    tagType: 'money_black', // 金流黑名單
    memberPhone: '0933501090',
    memberLevel: 'VIP1-一般會員',
    memberName: '鍾資志',
    group: '常規會員',
    paymentType: 'USDT', // 截圖第一筆其實是銀行卡，這裡模擬第三筆 USDT
    transactionType: '007-第一銀行',
    orderId: 'FMB606961627113905',
    amount: 200000,
    dailyCount: '3/3',
    dailyLimitUsed: 168765,
    dailyLimitTotal: 200000,
    requestTime: '2025-06-06 14:57:55',
    statusNote: '未收款',
  },
  {
    key: '4',
    tagType: 'new',
    memberPhone: '0976139515',
    memberLevel: 'VIP1-一般會員',
    memberName: '陳子寧',
    group: '常規會員',
    paymentType: 'USDT',
    transactionType: 'USDT-OnePay',
    orderId: 'FMB606959290333030',
    amount: 8000,
    dailyCount: '2/3',
    dailyLimitUsed: 765,
    dailyLimitTotal: 200000,
    requestTime: '2025-06-06 14:43:00',
    statusNote: '已入款\n會員綁定: TJy7...Bk31(已驗證)',
  },
]

// =============================================================================
// 主頁面元件: Consign (託售申請管理)
// =============================================================================

export default function Consign() {
  const [activeStatusTab, setActiveStatusTab] = useState('pending')
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // 定義搜尋欄位 (參考截圖)
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '標籤',
        name: 'tag',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            options={[{ label: 'IP黑名單', value: 'ip_black' }]}
          />
        ),
      },
      {
        label: '代理名稱', // ★ 新增欄位
        name: 'agentName',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '會員姓名',
        name: 'memberName',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '金流群組',
        name: 'group',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            options={[{ label: '常規會員', value: 'normal' }]}
          />
        ),
      },
      {
        label: '金流類型',
        name: 'paymentType',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            options={[
              { label: '銀行卡', value: 'bank' },
              { label: 'USDT', value: 'usdt' },
            ]}
          />
        ),
      },
      {
        label: '交易類別',
        name: 'transactionCategory',
        colProps: { xs: 24, md: 8, lg: 3 },
        render: () => (
          <Select
            placeholder="全部"
            options={[{ label: '台新銀行', value: 'taishin' }]}
          />
        ),
      },
      {
        label: '申請時間',
        name: 'dateRange',
        colProps: { xs: 24, md: 16, lg: 6 }, // 寬度稍微拉大
        render: () => <QuickRangePicker />,
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        colProps: { xs: 24, md: 8, lg: 3 }, // 調整最後一個的寬度以對齊
        render: () => (
          <Select
            defaultValue={20}
            options={[
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]}
          />
        ),
      },
    ],
    []
  )

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.info('執行搜尋')
  }

  const handleSaveStatusNote = (key: string, newNote: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, statusNote: newNote } : item
      )
    )
    message.success('備註狀況已更新')
  }

  const handleShowLogs = (record: ConsignDataType) => {
    // 模擬日誌
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-06-06 16:10:00',
        handler: 'admin',
        status: '審核',
        details: '變更狀態: 待審核 -> 通過',
      },
      {
        key: 'log-2',
        time: '2025-06-06 16:09:15',
        handler: 'system',
        status: '申請',
        details: `會員 ${record.memberName} 提交託售申請 $${record.amount}`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  // ★ 表格欄位設定
  const columns: ColumnsType<ConsignDataType> = [
    {
      title: '標籤',
      key: 'tag',
      width: 100,
      fixed: 'left',
      align: 'center',
      render: (_, r) => {
        // 根據截圖樣式調整顏色
        if (r.tagType === 'ip_black') return <Tag color="error">IP黑名單</Tag>
        if (r.tagType === 'money_black')
          return <Tag color="magenta">金流黑名單</Tag>
        if (r.tagType === 'new') return <Tag color="success">新會員</Tag>
        return (
          <Tag bordered={false} className="bg-gray-100 text-gray-600">
            一般會員
          </Tag>
        )
      },
    },
    {
      title: '會員編號/特權',
      key: 'memberInfo',
      width: 130,
      render: (_, r) => (
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-mono text-gray-700">{r.memberPhone}</span>
          <span className="text-gray-400">{r.memberLevel}</span>
        </div>
      ),
    },
    {
      title: '會員姓名',
      dataIndex: 'memberName',
      key: 'memberName',
      width: 100,
      render: (t) => <span className="font-medium text-gray-800">{t}</span>,
    },
    {
      title: '金流群組',
      dataIndex: 'group',
      key: 'group',
      width: 100,
      render: (t) => <span className="text-xs text-gray-600">{t}</span>,
    },
    {
      title: '金流類型',
      dataIndex: 'paymentType',
      key: 'paymentType',
      width: 90,
      render: (t) => <span className="text-xs">{t}</span>,
    },
    {
      title: '交易類別',
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 130,
      render: (t) => <span className="text-xs">{t}</span>,
    },
    {
      title: '訂單編號',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 170,
      render: (t) => (
        <span className="select-all font-mono text-xs text-gray-500">{t}</span>
      ),
    },
    // ★ 託售金額
    {
      title: '託售金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 110,
      render: (v) => (
        <b className="text-base text-gray-800">{v?.toLocaleString()}</b>
      ),
    },
    // ★ 每日託售次數
    {
      title: '每日託售次數',
      dataIndex: 'dailyCount',
      key: 'dailyCount',
      align: 'center',
      width: 110,
      render: (v) => (
        <span className="text-xs font-medium text-gray-600">{v}</span>
      ),
    },
    // ★ 每日託售額度 (顯示: 已用 / 總額)
    {
      title: '每日託售額度',
      key: 'dailyLimit',
      align: 'right',
      width: 160,
      render: (_, r) => (
        <div className="font-mono text-xs">
          <span className="text-gray-800">
            {r.dailyLimitUsed.toLocaleString()}
          </span>
          <span className="mx-1 text-gray-400">/</span>
          <span className="text-gray-400">
            {r.dailyLimitTotal.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      title: '申請時間',
      dataIndex: 'requestTime',
      key: 'requestTime',
      width: 130,
      render: (t) => {
        const [date, time] = t.split(' ')
        return (
          <div className="flex flex-col text-xs text-gray-500">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        )
      },
    },

    {
      title: '儲值狀況',
      key: 'status',
      width: 280,
      render: (_, record) => (
        <EditableNoteCell
          value={record.statusNote}
          onSave={(newVal) => handleSaveStatusNote(record.key, newVal)}
        />
      ),
    },
    {
      title: '審核狀態',
      key: 'audit',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: () => (
        <Select
          defaultValue="pending"
          size="small"
          className="w-24"
          options={[
            { label: '待審核', value: 'pending' },
            { label: '通過', value: 'pass' },
            { label: '拒絕', value: 'reject' },
          ]}
        />
      ),
    },
    {
      title: '經手人',
      key: 'handler',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          icon={<FileTextOutlined />}
          size="small"
          type="text"
          onClick={() => handleShowLogs(record)}
        />
      ),
    },
  ]

  // Tab 設定: 根據截圖 (待審核, 派發, 拒絕)
  const tabItems = [
    { key: 'pending', label: '待審核 (26)' },
    { key: 'dispensing', label: '派發 (0)' }, // 託售通常用派發或出款中
    { key: 'rejected', label: '拒絕 (0)' },
  ]

  // 統計區塊 (調整為託售相關的總計)
  const statsContent = (
    <div className="flex flex-col items-end gap-1 pb-1 text-xs text-gray-600 lg:flex-row lg:items-center lg:gap-4 lg:text-sm">
      <div className="flex gap-2">
        <span>今日託售總計:</span>
        <span className="font-bold text-gray-800">210,700</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-gray-300 lg:block"></div>
      <div className="flex gap-2 text-sm lg:text-base">
        <span>待審核金額:</span>
        <span className="font-bold text-red-500">201,700</span>
      </div>
    </div>
  )

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4 text-gray-500">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            託售申請管理
          </Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ pageSize: 20 }}
          onSearch={handleSearch}
        />

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Tabs
            activeKey={activeStatusTab}
            onChange={setActiveStatusTab}
            type="card"
            tabBarExtraContent={statsContent}
            items={tabItems.map((item) => ({
              label: item.label,
              key: item.key,
              children: (
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  rowKey="key"
                  pagination={{
                    total: dataSource.length,
                    pageSize: 20,
                    showTotal: (total) => `總計 ${total} 筆資料`,
                  }}
                  scroll={{ x: 1900 }} // 欄位較多，設定寬度確保橫向捲動
                  size="small"
                  bordered
                  rowClassName="hover:bg-gray-50"
                  className="mt-2"
                />
              ),
            }))}
          />
        </div>

        <HandlerModal
          open={isHandlerModalOpen}
          onCancel={() => setIsHandlerModalOpen(false)}
          logs={currentLogs}
        />
      </div>
    </ConfigProvider>
  )
}
