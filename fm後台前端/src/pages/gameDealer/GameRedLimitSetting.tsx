import { useState, useMemo } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Select,
  Button,
  Table,
  message,
  Dropdown,
  Space,
} from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'

// 請確保路徑正確指向你的共用元件
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

// 引入剛剛的新增/編輯表單元件
import RedLimitCreate from './components/RedLimitCreate'

const theme = { token: { colorPrimary: '#14b8a6' } }

// =============================================================================
// 資料定義與模擬資料
// =============================================================================

interface RedLimitDataType {
  key: string
  type: string // '真人' 或 '體育'
  gameName: string // 遊戲名稱
  hallCode: string // 廳別
  minBet: number
  maxBet: number
  maxLoss: number
  maxWin: number
}

const MOCK_DATA: RedLimitDataType[] = [
  {
    key: '1',
    type: '真人',
    gameName: '百家樂',
    hallCode: 'A001',
    minBet: 100,
    maxBet: 30000,
    maxLoss: 100000,
    maxWin: 1000000,
  },
  {
    key: '2',
    type: '真人',
    gameName: '龍虎',
    hallCode: 'D006',
    minBet: 100,
    maxBet: 30000,
    maxLoss: 0,
    maxWin: 500000,
  },
  {
    key: '3',
    type: '體育',
    gameName: '盤口限紅',
    hallCode: 'SP-01',
    minBet: 50,
    maxBet: 5000,
    maxLoss: 0,
    maxWin: 200000,
  },
]

const PROVIDERS = [
  { code: 'DG', count: 36 },
  { code: '歐博', count: 23 },
  { code: 'MT', count: 19 },
  { code: 'T9', count: 32 },
  { code: 'DB', count: 20 },
  { code: 'SA', count: 21 },
  { code: 'WM', count: 30 },
  { code: 'RG', count: 22 },
]

// =============================================================================
// 主元件：GameRedLimitSetting
// =============================================================================

export default function GameRedLimitSetting() {
  // 1. 頁面模式：'list' | 'form'
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list')

  // 2. 編輯中的資料 (Form Values 格式)
  const [editingValues, setEditingValues] = useState<any>(null)

  // 3. 列表狀態
  const [dataSource, setDataSource] = useState(MOCK_DATA)
  const [selectedProvider, setSelectedProvider] = useState<string>('DG')

  // 4. 彈窗狀態
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // --- 操作邏輯 ---

  const handleSearch = (values: any) => {
    console.log('Search:', values)
    console.log(setDataSource)
    message.success('列表已更新')
  }

  // 點擊新增
  const handleCreate = () => {
    setEditingValues(null) // 清空資料代表新增
    setViewMode('form')
  }

  // ★ 點擊編輯：將列表資料轉換為表單資料
  const handleEdit = (record: RedLimitDataType) => {
    // 1. 轉換類型：中文 '真人/體育' -> ID 'live/sport'
    const targetType = record.type === '體育' ? 'sport' : 'live'

    // 2. 模擬 provider (實際應從 record 讀取)
    const targetProvider = record.type === '體育' ? 'Super' : 'DG'

    // 3. 組合表單資料
    const formValues = {
      type: targetType,
      provider: targetProvider,

      // 動態設定該遊戲的限紅等級 (這裡模擬設定為 limit_a)
      [record.gameName]: 'limit_a',

      // 全域數值，若為0則不帶入(顯示空)或依需求帶入0
      maxLossLimit: record.maxLoss === 0 ? undefined : record.maxLoss,
      maxWinLimit: record.maxWin === 0 ? undefined : record.maxWin,

      // 保存原始 Key 以便儲存時辨識
      _originKey: record.key,
    }

    console.log('Edit Values:', formValues)
    setEditingValues(formValues)
    setViewMode('form')
  }

  const handleBackToList = () => {
    setViewMode('list')
    setEditingValues(null)
  }

  // 儲存表單資料
  const handleSaveForm = (values: any) => {
    console.log('Save Data:', values)

    // 模擬更新畫面
    if (editingValues && editingValues._originKey) {
      // 編輯模式：更新
      message.success('設定已更新')
      // 這裡可以寫邏輯更新 dataSource...
    } else {
      // 新增模式
      message.success('新增成功')
    }

    handleBackToList()
  }

  // 經手人日誌
  const fetchLogs = (record: RedLimitDataType) => {
    const mockLogs: HandlerLogData[] = [
      {
        key: 'log-1',
        time: '2026-01-09 12:00:00',
        handler: 'admin',
        status: '修改',
        details: `修改 ${record.gameName} 設定`,
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  const handleMenuClick = (key: string, record: RedLimitDataType) => {
    if (key === 'edit') {
      handleEdit(record)
    } else if (key === 'logs') {
      fetchLogs(record)
    } else if (key === 'disable') {
      message.info('刪除功能演示')
    }
  }

  // --- 欄位與搜尋 ---

  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '遊戲類型',
        name: 'gameType',
        render: () => (
          <Select
            style={{ width: 200 }}
            placeholder="請選擇"
            defaultValue="live"
            options={[
              { label: '真人', value: 'live' },
              { label: '電子', value: 'electronic' },
              { label: '體育', value: 'sport' },
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

  const columns: ColumnsType<RedLimitDataType> = [
    {
      title: '遊戲類型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      align: 'center',
    },
    {
      title: '遊戲名稱',
      dataIndex: 'gameName',
      key: 'gameName',
      width: 150,
      align: 'center',
    },
    {
      title: '廳別',
      dataIndex: 'hallCode',
      key: 'hallCode',
      width: 120,
      align: 'center',
      render: (t) => <span className="font-semibold text-gray-700">{t}</span>,
    },
    {
      title: '下注最低限紅',
      dataIndex: 'minBet',
      key: 'minBet',
      width: 150,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '下注最高限紅',
      dataIndex: 'maxBet',
      key: 'maxBet',
      width: 150,
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '單日最大輸額限制',
      dataIndex: 'maxLoss',
      key: 'maxLoss',
      width: 160,
      align: 'center',
      render: (v) => (v === 0 ? '-' : v.toLocaleString()),
    },
    {
      title: '單日最大贏額限制',
      dataIndex: 'maxWin',
      key: 'maxWin',
      width: 160,
      align: 'center',
      render: (v) => (v === 0 ? '-' : v.toLocaleString()),
    },
    {
      title: '管理',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => {
        const menuItems: MenuProps['items'] = [
          {
            key: 'edit',
            label: '編輯',
            icon: <EditOutlined />,
            onClick: () => handleMenuClick('edit', record),
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
            label: '刪除',
            icon: <StopOutlined />,
            danger: true,
            onClick: () => handleMenuClick('disable', record),
          },
        ]
        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button
              size="small"
              className="mx-auto flex items-center justify-between gap-1 px-3 text-gray-600"
            >
              管理 <DownOutlined className="text-[10px]" />
            </Button>
          </Dropdown>
        )
      },
    },
  ]

  // ===========================================================================
  // 條件渲染 (Conditional Rendering)
  // ===========================================================================

  // 1. 若為表單模式 -> 顯示 RedLimitCreate
  if (viewMode === 'form') {
    return (
      <ConfigProvider theme={theme}>
        <RedLimitCreate
          initialValues={editingValues}
          onCancel={handleBackToList}
          onSave={handleSaveForm}
        />
      </ConfigProvider>
    )
  }

  // 2. 否則顯示列表
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲限紅設定
          </Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ gameType: 'live', pageSize: 20 }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 廠商 Tabs */}
        <div className="mb-2 overflow-x-auto pb-2">
          <Space size={8}>
            {PROVIDERS.map((p) => (
              <div
                key={p.code}
                onClick={() => setSelectedProvider(p.code)}
                className={`flex cursor-pointer flex-col items-center justify-center rounded border px-4 py-2 transition-all ${
                  selectedProvider === p.code
                    ? 'border-teal-500 bg-gray-200 text-gray-800 shadow-inner'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-teal-300 hover:text-teal-600'
                } `}
                style={{ minWidth: '80px', height: '50px' }}
              >
                <span className="text-xs font-bold">{p.code}</span>
                <span className="text-[10px] text-gray-500">({p.count})</span>
              </div>
            ))}
          </Space>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              total: dataSource.length,
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

      <HandlerModal
        open={isHandlerModalOpen}
        onCancel={() => setIsHandlerModalOpen(false)}
        logs={currentLogs}
      />
    </ConfigProvider>
  )
}
