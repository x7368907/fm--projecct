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

// 1. 引入共用搜尋與彈窗元件
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

// ★★★ 2. 引入你剛剛做好的 QuickRangePicker ★★★
import QuickRangePicker from '../../components/QuickRangePicker'

const theme = { token: { colorPrimary: '#14b8a6' } }
const { TextArea } = Input

// =============================================================================
// EditableNoteCell (保持不變)
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
// 資料定義
// =============================================================================
interface DepositDataType {
  key: string
  tagType: 'ip_black' | 'normal' | 'new'
  memberPhone: string
  memberLevel: string
  memberName: string
  group: string
  paymentType: string
  transactionType: string
  orderId: string
  amount: number
  freeFeeCount: string
  returnRate: number
  returnAmount: number
  feeRate: number
  feeAmount: number
  payable: number
  requestTime: string
  statusNote: string
}

const MOCK_DATA: DepositDataType[] = [
  {
    key: '1',
    tagType: 'ip_black',
    memberPhone: '0933501090',
    memberLevel: 'VIP1-一般會員',
    memberName: '車龍須',
    group: '常規會員',
    paymentType: '超商(CVS)',
    transactionType: '7-11-CuPay',
    orderId: 'FMB606964098198707',
    amount: 1700,
    freeFeeCount: '1/3',
    returnRate: 2,
    returnAmount: 34,
    feeRate: 2,
    feeAmount: 0,
    payable: 1700,
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
    paymentType: 'ATM',
    transactionType: '98Pay',
    orderId: 'FMB606963917684869',
    amount: 1000,
    freeFeeCount: '3/3',
    returnRate: 2,
    returnAmount: 34,
    feeRate: 2,
    feeAmount: 20,
    payable: 1020,
    requestTime: '2025-06-06 14:43:00',
    statusNote:
      '已入款\n國泰銀行: 822-****103351\n會員綁定: 822-****103351 (已驗證)',
  },
  {
    key: '3',
    tagType: 'ip_black',
    memberPhone: '0933501090',
    memberLevel: 'VIP1-一般會員',
    memberName: '鍾資志',
    group: '常規會員',
    paymentType: 'USDT',
    transactionType: 'USDT-OnePay',
    orderId: 'FMB606961627113905',
    amount: 200000,
    freeFeeCount: '3/3',
    returnRate: 2,
    returnAmount: 34,
    feeRate: 2,
    feeAmount: 4000,
    payable: 204000,
    requestTime: '2025-06-06 14:57:55',
    statusNote: '未收款',
  },
]

// =============================================================================
// 主頁面元件
// =============================================================================

export default function Discount() {
  const [activeStatusTab, setActiveStatusTab] = useState('pending')
  const [dataSource, setDataSource] = useState(MOCK_DATA)

  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // 定義搜尋欄位
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '樓層',
        name: 'level',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => <Select placeholder="全部" options={[]} />,
      },
      {
        label: '會員姓名',
        name: 'memberName',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => <Input placeholder="請輸入" />,
      },
      {
        label: '金流群組',
        name: 'group',
        colProps: { xs: 24, md: 8, lg: 4 },
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
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="全部"
            options={[
              { label: '超商', value: 'cvs' },
              { label: 'ATM', value: 'atm' },
            ]}
          />
        ),
      },
      {
        label: '交易類別',
        name: 'transactionCategory',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="全部"
            options={[{ label: '7-11', value: '711' }]}
          />
        ),
      },
      // ★★★ 3. 使用 QuickRangePicker ★★★
      {
        label: '申請時間',
        name: 'dateRange',
        colProps: { xs: 24, md: 16, lg: 8 }, // 這裡寬度稍微給大一點
        render: () => <QuickRangePicker />,
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        colProps: { xs: 24, md: 8, lg: 4 },
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
    message.success('儲值狀況已更新')
  }

  const handleShowLogs = (record: DepositDataType) => {
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
        details: `會員 ${record.memberName} 提交儲值申請 $${record.amount}`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  const columns: ColumnsType<DepositDataType> = [
    {
      title: '標籤',
      key: 'tag',
      width: 100,
      fixed: 'left',
      align: 'center',
      render: (_, r) => {
        let color = 'blue'
        let text = '一般會員'
        if (r.tagType === 'ip_black') {
          color = 'red'
          text = r.amount > 100000 ? '金流黑名單' : 'IP黑名單'
        } else if (r.tagType === 'new') {
          color = 'green'
          text = '新會員'
        }
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: '會員編號/特權',
      key: 'memberInfo',
      width: 140,
      render: (_, r) => (
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-mono text-gray-600">{r.memberPhone}</span>
          <span className="text-gray-400">{r.memberLevel}</span>
        </div>
      ),
    },
    {
      title: '會員姓名',
      dataIndex: 'memberName',
      key: 'memberName',
      width: 100,
      render: (t) => <span className="font-medium text-gray-700">{t}</span>,
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
      width: 100,
      render: (t) => <span className="text-xs">{t}</span>,
    },
    {
      title: '交易類別',
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: 120,
      render: (t) => <span className="text-xs">{t}</span>,
    },
    {
      title: '訂單編號',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 160,
      render: (t) => (
        <span className="font-mono text-xs text-gray-500">{t}</span>
      ),
    },
    {
      title: '儲值金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 100,
      render: (v) => <b className="text-gray-800">{v?.toLocaleString()}</b>,
    },
    {
      title: '免手續費次數',
      dataIndex: 'freeFeeCount',
      key: 'freeFeeCount',
      align: 'center',
      width: 110,
      render: (v) => <span className="text-xs text-gray-500">{v}</span>,
    },
    {
      title: '儲值回饋金',
      key: 'return',
      align: 'right',
      width: 100,
      render: (_, r) => (
        <div className="flex flex-col items-end text-xs">
          <span className="text-gray-400">{r.returnRate}%</span>
          <span className="font-medium text-teal-600">{r.returnAmount}</span>
        </div>
      ),
    },
    {
      title: '儲值手續費',
      key: 'fee',
      align: 'right',
      width: 100,
      render: (_, r) => (
        <div className="flex flex-col items-end text-xs">
          <span className="text-gray-400">{r.feeRate}%</span>
          <span className="text-red-500">{r.feeAmount}</span>
        </div>
      ),
    },
    {
      title: '應付金額',
      dataIndex: 'payable',
      key: 'payable',
      align: 'right',
      width: 110,
      render: (v) => <b className="text-teal-600">{v?.toLocaleString()}</b>,
    },
    {
      title: '申請時間',
      dataIndex: 'requestTime',
      key: 'requestTime',
      width: 110,
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
      width: 240,
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

  const tabItems = [
    { key: 'pending', label: '待審核 (26)' },
    { key: 'distributed', label: '派發 (0)' },
    { key: 'rejected', label: '拒絕 (0)' },
  ]

  const statsContent = (
    <div className="flex flex-col items-end gap-1 pb-1 text-xs text-gray-600 lg:flex-row lg:items-center lg:gap-4 lg:text-sm">
      <div className="flex gap-2">
        <span>儲值回饋總計:</span>
        <span className="font-bold text-gray-800">25,623</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-gray-300 lg:block"></div>
      <div className="flex gap-2">
        <span>儲值手續費總計:</span>
        <span className="font-bold text-gray-800">53,262</span>
      </div>
      <div className="hidden h-3 w-[1px] bg-gray-300 lg:block"></div>
      <div className="flex gap-2 text-sm lg:text-base">
        <span>應付金額總計:</span>
        <span className="font-bold text-red-500">2,888,600</span>
      </div>
    </div>
  )

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4 text-gray-500">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            儲值申請管理
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
                  scroll={{ x: 1800 }}
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
