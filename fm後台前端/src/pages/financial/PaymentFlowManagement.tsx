import { useState } from 'react'
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
  type MenuProps,
} from 'antd'
import { DownOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

// 引入共用元件 (請確保路徑正確)
import SearchPanel, { type SearchField } from '../../components/SearchPanel'

// 模擬 PaymentCreateForm
import PaymentCreate from '../financial/components/PaymentCreate'

const { TextArea } = Input
const theme = { token: { colorPrimary: '#14b8a6' } }

/**
 * =============================================================================
 * 1. 備註編輯元件 (EditableNoteCell)
 * =============================================================================
 */
interface EditableNoteCellProps {
  value: string
  onSave: (newValue: string) => void
}

function EditableNoteCell({ value, onSave }: EditableNoteCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

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
          className="rounded-md border border-gray-300 bg-white text-xs focus:border-teal-400 focus:shadow-sm"
        />
        <div className="flex justify-end gap-2">
          <Button size="small" onClick={() => setIsEditing(false)}>
            取消
          </Button>
          <Button
            size="small"
            className="border-none bg-green-500 text-white hover:bg-green-600 hover:!text-white"
            onClick={handleSave}
          >
            完成
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-100 p-2 text-xs text-gray-700">
        {value || <span className="text-gray-400">尚無備註...</span>}
      </div>
      <div>
        <Button
          size="small"
          onClick={() => {
            setTempValue(value)
            setIsEditing(true)
          }}
          className="h-6 text-xs text-gray-500"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}

/**
 * =============================================================================
 * 2. 主頁面 (PaymentFlow)
 * =============================================================================
 */

// --- 資料定義 ---
interface DataType {
  key: string
  category: string // 這裡存 'deposit' 或 'withdraw'
  type: string
  name: string
  displayName: string
  merchantId: string
  hashKey: string
  hashIv: string
  status: boolean
  remark: string
}

// ★ 修正1：Mock Data 的 category 改為英文代碼 'deposit'
const MOCK_DEPOSIT_DATA: DataType[] = [
  {
    key: '1',
    category: 'deposit',
    type: 'ATM',
    name: 'CKPAY',
    displayName: 'ATM-CKPAY',
    merchantId: '202412121708800',
    hashKey: '92b2e34a658d4059376a83e89d56bcab',
    hashIv: '92b2e34a658d4059376a83e89d56bcab',
    status: true,
    remark: 'VIP專用通道',
  },
  {
    key: '2',
    category: 'deposit',
    type: 'Super-ATM',
    name: 'SuperPay',
    displayName: 'Super-ATM-SuperPay',
    merchantId: 'SP20241212001',
    hashKey: 'TJy7u4enG7xMfUXkPFZGJd6BHn6gknBkx3',
    hashIv: 'TJy7u4enG7xMfUXkPFZGJd6BHn6gknBkx3',
    status: true,
    remark: '',
  },
  {
    key: '4',
    category: 'deposit',
    type: '信用卡',
    name: '藍新',
    displayName: '信用卡-藍新',
    merchantId: '858323',
    hashKey: '29d40c95b55fbe5154d807c47a52881e',
    hashIv: '29d40c95b55fbe5154d807c47a52881e',
    status: true,
    remark: '',
  },
]

// ★ 修正2：Mock Data 的 category 改為英文代碼 'withdraw'
const MOCK_WITHDRAW_DATA: DataType[] = [
  {
    key: 'w1',
    category: 'withdraw',
    type: 'ATM',
    name: '004 台灣銀行',
    displayName: 'ATM-004 台灣銀行',
    merchantId: '12345678912345',
    hashKey: '29d40c95b55fbe5154d807c47a52881e',
    hashIv: 'TJy7u4enG7xMfUXkPFZGJd6BHn6gknBkx3',
    status: true,
    remark: '',
  },
  {
    key: 'w2',
    category: 'withdraw',
    type: 'USDT',
    name: 'TRC20',
    displayName: 'USDT-TRC20',
    merchantId: 'WALLET_ADDRESS',
    hashKey: '29d40c95b55fbe5154d807c47a52881e',
    hashIv: 'TJy7u4enG7xMfUXkPFZGJd6BHn6gknBkx3',
    status: true,
    remark: '出款專用',
  },
]

export default function PaymentFlow() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editing, setEditing] = useState<DataType | null>(null)
  const [activeTab, setActiveTab] = useState('deposit')

  // ★ 更新搜尋欄位選項
  const searchFields: SearchField[] = [
    {
      label: '金流類型',
      name: 'paymentType',
      colProps: { xs: 24, sm: 12, md: 8, lg: 5 },
      render: () => (
        <Select
          placeholder="請選擇"
          allowClear
          options={[
            { label: 'ATM', value: 'ATM' },
            { label: 'Super-ATM', value: 'SuperATM' },
            { label: '信用卡', value: 'Credit' },
            { label: '電子支付', value: 'EPayment' },
            { label: '超商', value: 'CVS' },
            { label: 'USDT', value: 'USDT' },
          ]}
        />
      ),
    },
  ]

  const handleCreate = () => {
    setEditing(null)
    setView('create')
  }

  const handleEdit = (record: DataType) => {
    setEditing(record)
    setView('edit')
  }

  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }

  const handleSaveRemark = (key: string, newRemark: string) => {
    console.log(`更新 Key: ${key} 的備註為: ${newRemark}`)
    message.success('備註已更新')
  }

  const handleLogs = (record: DataType) => {
    console.log('查看日誌:', record)
    message.info('開啟經手人紀錄')
  }

  // 表格欄位定義 (共用)
  const columns: ColumnsType<DataType> = [
    { title: '款項類別', dataIndex: 'category', key: 'category', width: 90 },
    { title: '金流類型', dataIndex: 'type', key: 'type', width: 110 },
    { title: '金流名稱', dataIndex: 'name', key: 'name', width: 110 },
    {
      title: '顯示名稱',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 160,
    },
    {
      title: '商家代碼',
      dataIndex: 'merchantId',
      key: 'merchantId',
      width: 150,
      render: (text) => (
        <span className="whitespace-nowrap font-mono text-gray-600">
          {text}
        </span>
      ),
    },
    {
      title: 'HashKey / 廠商信託碼',
      dataIndex: 'hashKey',
      key: 'hashKey',
      width: 220,
      render: (text) => (
        <div className="max-w-[220px] break-all font-mono text-xs leading-tight text-gray-500">
          {text}
        </div>
      ),
    },
    {
      title: 'HashIV / 系統信託碼',
      dataIndex: 'hashIv',
      key: 'hashIv',
      width: 200,
      render: (text) => (
        <div className="max-w-[200px] break-all font-mono text-xs leading-tight text-gray-500">
          {text}
        </div>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (checked) => (
        <Switch
          checked={checked}
          checkedChildren="ON"
          unCheckedChildren="OFF"
          style={{ backgroundColor: checked ? '#22c55e' : undefined }}
        />
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      key: 'remark',
      width: 250,
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
            onClick: () => handleEdit(record),
          },
          {
            key: 'logs',
            label: '經手人',
            icon: <FileTextOutlined />,
            onClick: () => handleLogs(record),
          },
        ]

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button size="small" className="flex items-center gap-1 text-xs">
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // 定義 Tabs 內容
  const tabItems = [
    {
      key: 'deposit',
      label: `儲值 (${MOCK_DEPOSIT_DATA.length})`,
      children: (
        <div className="rounded-b-lg border-t-0 border-gray-100 bg-white shadow-sm">
          <Table
            columns={columns}
            dataSource={MOCK_DEPOSIT_DATA}
            rowKey="key"
            pagination={{
              total: MOCK_DEPOSIT_DATA.length,
              pageSize: 10,
              position: ['bottomCenter'],
              className: 'py-4',
            }}
            size="middle"
            scroll={{ x: 'max-content' }}
            rowClassName="align-top hover:bg-gray-50"
          />
        </div>
      ),
    },
    {
      key: 'withdraw',
      label: `託售 (${MOCK_WITHDRAW_DATA.length})`,
      children: (
        <div className="rounded-b-lg border-t-0 border-gray-100 bg-white shadow-sm">
          <Table
            columns={columns}
            dataSource={MOCK_WITHDRAW_DATA}
            rowKey="key"
            pagination={{
              total: MOCK_WITHDRAW_DATA.length,
              pageSize: 10,
              position: ['bottomCenter'],
              className: 'py-4',
            }}
            size="middle"
            scroll={{ x: 'max-content' }}
            rowClassName="align-top hover:bg-gray-50"
          />
        </div>
      ),
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className={
              view !== 'list'
                ? 'cursor-pointer transition-colors hover:text-teal-600'
                : ''
            }
            onClick={() => setView('list')}
          >
            金流串接管理
          </Breadcrumb.Item>
          {view !== 'list' && (
            <Breadcrumb.Item>
              {view === 'edit' ? '編輯金流' : '新增金流'}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        {view === 'list' ? (
          <>
            <SearchPanel
              fields={searchFields}
              initialValues={{}}
              onSearch={handleSearch}
              onCreate={handleCreate}
            />
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                type="card"
                className="custom-tabs"
              />
            </div>
          </>
        ) : (
          <PaymentCreate
            initialValues={view === 'edit' ? editing : null}
            onCancel={() => setView('list')}
          />
        )}
      </div>
    </ConfigProvider>
  )
}
