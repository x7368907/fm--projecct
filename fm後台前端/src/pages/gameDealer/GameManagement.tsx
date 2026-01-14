import { useState, useMemo } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Select,
  Button,
  Switch,
  Table,
  message,
  Input,
  Dropdown,
  Space,
} from 'antd'
import {
  DownOutlined,
  EditOutlined,
  StopOutlined,
  EyeOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'

import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'
import GameCreate from './components/GameCreate'

const { TextArea } = Input

const theme = { token: { colorPrimary: '#14b8a6' } }

// ... EditableNoteCell 元件保持不變 ...
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
// ... EditableNoteCell End ...

interface GameDataType {
  key: string
  type: string
  gameId: number
  gameCode: string
  gameName: string
  rtp: string
  device: string
  status: boolean
  remark: string
}

const MOCK_DATA: GameDataType[] = [
  {
    key: '1',
    type: '電子',
    gameId: 122,
    gameCode: 'golden-seth',
    gameName: '戰神賽特II',
    rtp: '96.89%',
    device: '所有裝置',
    status: true,
    remark: '',
  },
  {
    key: '2',
    type: '電子',
    gameId: 121,
    gameCode: 'wuxia-caishen',
    gameName: '武俠',
    rtp: '97%',
    device: '所有裝置',
    status: true,
    remark: '',
  },
  {
    key: '3',
    type: '電子',
    gameId: 114,
    gameCode: 'egyptian-mythology',
    gameName: '戰神賽特',
    rtp: '96.89%',
    device: '所有裝置',
    status: true,
    remark: '',
  },
]

const PROVIDERS = [
  { code: 'ATG', count: 36 },
  { code: 'QT', count: 23 },
  { code: 'FM', count: 19 },
  { code: 'RSG', count: 32 },
  { code: 'BNG', count: 20 },
  { code: 'BT', count: 21 },
  { code: 'FG', count: 30 },
  { code: '簽發', count: 22 },
  { code: 'CG', count: 16 },
  { code: 'GB', count: 21 },
]

export default function GameManagement() {
  // ★ 修改：viewMode 狀態包含 form 模式
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')

  // ★ 新增：目前正在編輯的資料 (若為 null 則表示是新增模式)
  const [editingRecord, setEditingRecord] = useState<any>(null)

  const [dataSource, setDataSource] = useState(MOCK_DATA)
  const [selectedProvider, setSelectedProvider] = useState<string>('ATG')
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    message.success('執行搜尋更新列表')
  }

  // ★ 點擊新增：清空編輯資料，切換到表單模式
  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('form')
  }

  // ★ 點擊編輯：設定資料，切換到表單模式
  const handleEdit = (record: GameDataType) => {
    // 這裡做簡單的資料對應，將表格資料轉為表單需要的格式
    const formValues = {
      ...record,
      gameType: record.type === '電子' ? 'electronic' : 'live', // 簡單對應範例
      gameLogo: `${record.gameCode}_logo`, // 模擬一個 logo 值
    }
    setEditingRecord(formValues)
    setViewMode('form')
  }

  const handleBackToList = () => {
    setViewMode('list')
  }

  const handleStatusChange = (checked: boolean, key: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      )
    )
    message.success(`狀態已${checked ? '開啟' : '關閉'}`)
  }

  const handleSaveRemark = (key: string, newRemark: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, remark: newRemark } : item
      )
    )
    message.success('備註已更新')
  }

  const fetchLogs = (record: GameDataType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2026-01-08 14:20:00',
        handler: 'admin',
        status: '修改',
        details: `修改遊戲RTP: 95% -> ${record.rtp}`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  const handleMenuClick = (key: string, record: GameDataType) => {
    if (key === 'edit') {
      // ★ 呼叫編輯函式
      handleEdit(record)
    } else if (key === 'view') {
      message.info(`檢視詳情: ${record.gameName}`)
    } else if (key === 'logs') {
      fetchLogs(record)
    }
  }

  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '遊戲類型',
        name: 'gameType',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="請選擇"
            options={[{ label: '電子', value: 'electronic' }]}
          />
        ),
      },
      {
        label: '遊戲名稱',
        name: 'gameName',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="全部"
            options={[{ label: '全部', value: 'all' }]}
          />
        ),
      },
      {
        label: '遊戲狀態',
        name: 'status',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="全部"
            options={[
              { label: '全部', value: 'all' },
              { label: '開啟', value: 'on' },
              { label: '關閉', value: 'off' },
            ]}
          />
        ),
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        render: () => (
          <Select
            style={{ width: 200 }}
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

  const columns: ColumnsType<GameDataType> = [
    {
      title: '遊戲類型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      align: 'center',
    },
    {
      title: 'Game ID',
      dataIndex: 'gameId',
      key: 'gameId',
      width: 100,
      align: 'center',
    },
    {
      title: 'Game Code',
      dataIndex: 'gameCode',
      key: 'gameCode',
      width: 150,
      render: (text) => <span className="font-mono text-xs">{text}</span>,
    },
    {
      title: '遊戲名稱',
      dataIndex: 'gameName',
      key: 'gameName',
      width: 150,
      align: 'center',
    },
    {
      title: '遊戲Logo',
      key: 'logo',
      width: 120,
      align: 'center',
      render: () => (
        <Button size="small" icon={<EyeOutlined />} className="text-gray-500">
          檢視
        </Button>
      ),
    },
    {
      title: 'RTP',
      dataIndex: 'rtp',
      key: 'rtp',
      width: 100,
      align: 'center',
    },
    {
      title: '支援裝置',
      dataIndex: 'device',
      key: 'device',
      width: 120,
      align: 'center',
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
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
      width: 250,
      render: (text, record) => (
        <EditableNoteCell
          value={text}
          onSave={(newVal) => handleSaveRemark(record.key, newVal)}
        />
      ),
    },
    {
      title: '管理',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const menuItems: MenuProps['items'] = [
          {
            key: 'edit',
            label: '編輯設定',
            icon: <EditOutlined />,
            onClick: () => handleMenuClick('edit', record),
          },
          {
            key: 'logs',
            label: '經手人',
            icon: <FileTextOutlined />,
            onClick: () => handleMenuClick('logs', record),
          },
          {
            key: 'view',
            label: '檢視詳細',
            icon: <EyeOutlined />,
            onClick: () => handleMenuClick('view', record),
          },
          { type: 'divider' },
          {
            key: 'disable',
            label: '停用遊戲',
            icon: <StopOutlined />,
            danger: true,
          },
        ]

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button className="flex w-24 items-center justify-between px-3 text-gray-600">
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // ★ 切換渲染內容
  if (viewMode === 'form') {
    return (
      <ConfigProvider theme={theme}>
        <GameCreate
          // 傳入編輯資料 (若是新增則為 null)
          initialValues={editingRecord}
          onCancel={handleBackToList}
          onSave={(values) => {
            console.log(editingRecord ? 'Update' : 'Create', values)
            message.success(editingRecord ? '遊戲更新成功' : '遊戲新增成功')
            handleBackToList()
          }}
        />
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲管理
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{
            gameType: 'electronic',
            gameName: 'all',
            status: 'all',
            pageSize: 20,
          }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 遊戲商篩選列 */}
        <div className="mb-2 overflow-x-auto pb-2">
          <Space size={8}>
            {PROVIDERS.map((p) => (
              <div
                key={p.code}
                onClick={() => setSelectedProvider(p.code)}
                className={`flex cursor-pointer flex-col items-center justify-center rounded border px-4 py-2 transition-all ${
                  selectedProvider === p.code
                    ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-teal-300 hover:text-teal-600'
                } `}
                style={{ minWidth: '80px' }}
              >
                <span className="text-xs font-bold">{p.code}</span>
                <span className="text-[10px] text-gray-400">({p.count})</span>
              </div>
            ))}
          </Space>
        </div>

        {/* 資料表格 */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              total: 26,
              pageSize: 20,
              position: ['bottomLeft'],
              showTotal: (total) => `總計 ${total} 筆資料`,
              className: 'p-4',
            }}
            size="middle"
            scroll={{ x: 1200 }}
            bordered
            rowClassName="hover:bg-gray-50 align-middle"
          />
        </div>
      </div>

      {/* 經手人彈窗 */}
      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={() => setIsHandlerModalOpen(false)}
        logs={currentLogs}
      />
    </ConfigProvider>
  )
}
