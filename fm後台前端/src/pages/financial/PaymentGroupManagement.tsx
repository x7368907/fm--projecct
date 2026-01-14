import { useState, useMemo } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Select,
  Button,
  Tabs,
  Switch,
  Table,
  message,
  Input,
  Dropdown,
  Tag,
  Segmented,
  type MenuProps,
} from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

// 1. 共用搜尋區塊
import SearchPanel, { type SearchField } from '../../components/SearchPanel'

// 2. 共用經手人彈窗
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

// 3. 新增金流群組頁面 (剛剛建立的元件)
import PaymentGroupCreate from './PayMentGroup/form/PaymentGroupCreate'
// ★ 新增引入編輯頁面
import PaymentGroupEdit from './PayMentGroup/form/PaymentGroupEdit'

const { TextArea } = Input

// 設定主題色
const theme = { token: { colorPrimary: '#14b8a6' } }

// =============================================================================
// 內部子元件：備註編輯 (EditableNoteCell)
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
          className="rounded-md border border-gray-300 bg-white text-xs focus:border-blue-400 focus:shadow-sm"
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
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md bg-gray-200 p-2 text-xs text-gray-700">
        {value || <span className="text-gray-400">尚無備註...</span>}
      </div>
      <div>
        <Button
          size="small"
          onClick={handleEdit}
          className="h-6 rounded border-gray-400 bg-white px-3 text-xs text-gray-700 hover:border-teal-600 hover:text-teal-600"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// 資料定義與模擬資料
// =============================================================================

interface GroupDataType {
  key: string
  category: string // '儲值' 或 '託售'
  type: string
  name: string
  displayName: string
  rate: number
  minDeposit: number
  maxDeposit: number
  freeFeeCount: number
  feePercent: number
  minFeeAmount: number
  totalDeposit: number
  totalFee: number
  grandTotal: number
  status: boolean
  remark: string
}

const MOCK_DATA: GroupDataType[] = [
  {
    key: '1',
    category: '儲值',
    type: 'ATM',
    name: 'CKPAY',
    displayName: 'ATM-CKPAY',
    rate: 1,
    minDeposit: 1000,
    maxDeposit: 20000,
    freeFeeCount: 3,
    feePercent: 4,
    minFeeAmount: 60,
    totalDeposit: 130000,
    totalFee: 1300,
    grandTotal: 131300,
    status: true,
    remark: '',
  },
  {
    key: '2',
    category: '儲值',
    type: '超商(CVS)',
    name: '98PAY',
    displayName: '超商(CVS)-98PAY',
    rate: 1,
    minDeposit: 100,
    maxDeposit: 50000,
    freeFeeCount: 3,
    feePercent: 0,
    minFeeAmount: 10,
    totalDeposit: 12330005,
    totalFee: 780,
    grandTotal: 12330785,
    status: true,
    remark: '重點觀察項目',
  },
  {
    key: '3',
    category: '託售',
    type: 'ATM',
    name: '台新銀行',
    displayName: 'ATM-台新銀行',
    rate: 1,
    minDeposit: 1000,
    maxDeposit: 50000,
    freeFeeCount: 0,
    feePercent: 1,
    minFeeAmount: 15,
    totalDeposit: 0,
    totalFee: 0,
    grandTotal: 0,
    status: true,
    remark: '出款專用',
  },
]

// =============================================================================
// 主元件：PaymentGroup
// =============================================================================

export default function PaymentGroup() {
  // --- 狀態管理 ---
  // ★ 更新 viewMode 型別，加入 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<GroupDataType | null>(null)

  // 2. 列表相關狀態
  const [activeTab, setActiveTab] = useState('general')
  const [dataSource, setDataSource] = useState(MOCK_DATA)
  const [transactionType, setTransactionType] = useState('儲值') // 儲值 vs 託售

  // 3. 彈窗相關狀態
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // --- 計算屬性 ---

  // 根據「儲值/託售」篩選資料
  const filteredDataSource = useMemo(() => {
    return dataSource.filter((item) => item.category === transactionType)
  }, [dataSource, transactionType])

  // 定義搜尋欄位
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '金流類型',
        name: 'paymentType',
        colProps: { xs: 24, md: 12, lg: 6 },
        render: () => (
          <Select
            placeholder="全部"
            allowClear
            options={[
              { label: '全部', value: 'all' },
              { label: 'ATM', value: 'ATM' },
              { label: '超商', value: 'CVS' },
            ]}
          />
        ),
      },
    ],
    []
  )

  // --- 操作邏輯 (Handlers) ---

  // 切換至新增頁面
  const handleCreate = () => {
    setViewMode('create')
  }

  // 從新增頁面返回列表
  const handleBackToList = () => {
    setViewMode('list')
  }

  // 執行搜尋
  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.info(`執行搜尋: ${JSON.stringify(values)}`)
  }

  // 儲存備註
  const handleSaveRemark = (key: string, newRemark: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, remark: newRemark } : item
      )
    )
    message.success('備註已更新')
  }

  // 切換狀態
  const handleStatusChange = (checked: boolean, key: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      )
    )
    message.success(`狀態已${checked ? '開啟' : '關閉'}`)
  }

  // 讀取經手人日誌 (模擬 API)
  const fetchLogs = (record: GroupDataType) => {
    console.log('正在讀取日誌:', record.name)
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2025-12-30 14:20:00',
        handler: 'admin',
        status: '修改',
        details: '修改手續費設定: 3% -> 4%',
      },
      {
        key: 'log-2',
        time: '2025-12-29 10:00:00',
        handler: 'system',
        status: '新增',
        details: `建立金流群組: ${record.name}`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  // 下拉選單點擊處理
  const handleMenuClick = (key: string, record: GroupDataType) => {
    if (key === 'edit') {
      // 設定當前編輯的資料，並切換到編輯模式
      setEditingRecord(record)
      setViewMode('edit')
    } else if (key === 'logs') {
      fetchLogs(record)
    } else if (key === 'disable') {
      message.error(`停用: ${record.name}`)
    }
  }

  // --- 表格欄位定義 ---
  const columns: ColumnsType<GroupDataType> = [
    {
      title: '數值類別',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      fixed: 'left',
      render: (text) => (
        <Tag color={text === '儲值' ? 'blue' : 'orange'}>{text}</Tag>
      ),
    },
    { title: '金流類型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '金流名稱', dataIndex: 'name', key: 'name', width: 100 },
    {
      title: '顯示名稱',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 140,
      ellipsis: true,
    },
    {
      title: '匯率',
      dataIndex: 'rate',
      key: 'rate',
      width: 70,
      align: 'center',
    },
    {
      title: '儲值範圍',
      key: 'range',
      width: 160,
      render: (_, r) => (
        <span className="text-gray-600">
          {r.minDeposit.toLocaleString()} ~ {r.maxDeposit.toLocaleString()}
        </span>
      ),
    },
    {
      title: '免手續費',
      dataIndex: 'freeFeeCount',
      key: 'freeFeeCount',
      width: 90,
      align: 'center',
      render: (v) => `${v} 次`,
    },
    {
      title: '手續費',
      key: 'fee',
      width: 140,
      render: (_, r) => (
        <span className="text-xs">
          {r.feePercent}% (低消 ${r.minFeeAmount})
        </span>
      ),
    },
    {
      title: '累計儲值',
      dataIndex: 'totalDeposit',
      key: 'totalDeposit',
      width: 130,
      align: 'right',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '總計金額',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      width: 130,
      align: 'right',
      render: (v) => <b className="text-teal-600">{v.toLocaleString()}</b>,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (checked, record) => (
        <Switch
          checked={checked}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={(val) => handleStatusChange(val, record.key)}
          style={{ backgroundColor: checked ? '#22c55e' : undefined }}
        />
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      key: 'remark',
      width: 200,
      fixed: 'right',
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newValue) => handleSaveRemark(record.key, newValue)}
        />
      ),
    },
    {
      title: '管理',
      key: 'action',
      width: 100,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        const menuItems: MenuProps['items'] = [
          {
            key: 'edit',
            label: '編輯',
            icon: <EditOutlined />,
            onClick: () => handleMenuClick('edit', record), // 觸發編輯
          },
          {
            key: 'logs',
            label: '經手人',
            icon: <FileTextOutlined />,
            onClick: () => handleMenuClick('logs', record),
          },
          { type: 'divider' },
          {
            key: 'disable',
            label: '停用',
            icon: <StopOutlined />,
            danger: true,
            onClick: () => handleMenuClick('disable', record),
          },
        ]

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button
              size="small"
              className="mx-auto flex items-center justify-center gap-1 text-xs text-gray-600"
            >
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // 定義 Tabs
  const tabItems = [
    { key: 'general', label: '一般會員' },
    { key: 'credit', label: '信用代理' },
    { key: 'usdt', label: 'USDT' },
    { key: 'principal', label: '本金會員' },
    { key: 'test', label: '測試用' },
  ]

  // ===========================================================================
  // 渲染邏輯
  // ===========================================================================

  // 1. 如果 viewMode 是 'create'，顯示新增表單元件
  if (viewMode === 'create') {
    return (
      <ConfigProvider theme={theme}>
        <PaymentGroupCreate
          onCancel={handleBackToList}
          onSave={() => {
            message.success('儲存成功')
            handleBackToList()
          }}
        />
      </ConfigProvider>
    )
  }
  // ★ 2. 編輯模式 (新增這段)
  if (viewMode === 'edit' && editingRecord) {
    return (
      <ConfigProvider theme={theme}>
        <PaymentGroupEdit
          initialValues={editingRecord}
          onCancel={handleBackToList}
          onSave={(values) => {
            console.log('Update:', values)
            message.success('更新成功')
            handleBackToList()
          }}
        />
      </ConfigProvider>
    )
  }
  // 2. 否則顯示列表頁面
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            金流群組管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ paymentType: 'all' }}
          onSearch={handleSearch}
          onCreate={handleCreate}
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
                  {/* 儲值/託售 切換按鈕 */}
                  <div className="mb-4">
                    <Segmented
                      options={['儲值', '託售']}
                      value={transactionType}
                      onChange={(val) => setTransactionType(val as string)}
                      size="middle"
                    />
                  </div>

                  {/* 資料表格 */}
                  <Table
                    columns={columns}
                    dataSource={filteredDataSource}
                    rowKey="key"
                    pagination={{
                      total: filteredDataSource.length,
                      pageSize: 20,
                      position: ['bottomCenter'],
                      showTotal: (total) => `共 ${total} 筆`,
                      className: 'pt-4',
                    }}
                    size="middle"
                    scroll={{ x: 1600 }}
                    rowClassName=" hover:bg-gray-50"
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

      {/* 經手人彈窗 (全域共用) */}
      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={() => setIsHandlerModalOpen(false)}
        logs={currentLogs}
      />
    </ConfigProvider>
  )
}
