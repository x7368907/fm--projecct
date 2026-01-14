import { useState, useMemo } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Select,
  Button,
  Table,
  message,
  Input,
  Dropdown,
  Tag,
  type MenuProps,
} from 'antd'
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

// 1. 引入共用元件 (請依您的專案結構調整路徑)
import SearchPanel, { type SearchField } from '../../components/SearchPanel'
import HandlerModal, {
  type HandlerLogData,
} from '../AgentList/components/HandlerModal'

// 2. 引入表單元件 (請確保此檔案存在於同目錄或正確路徑)
import GameSettingCreate from './components/GameSettingCreate'

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

  // 編輯模式：按鈕靠右
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

  // 檢視模式：按鈕靠左
  return (
    <div className="flex flex-col gap-1">
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-100 p-2 text-xs leading-relaxed text-gray-700">
        {value || <span className="text-gray-400">尚無備註...</span>}
      </div>
      <div className="text-left">
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

export interface GameSettingData {
  key: string
  station: string
  category: string
  vendorName: string
  jackpotSettlement: string
  contribution: number
  gameCap: number
  negativeProfit: string
  settlementType: string
  settlementTime: string
  remark: string
}

const MOCK_DATA: GameSettingData[] = [
  {
    key: '1',
    station: 'FM',
    category: '電子',
    vendorName: 'ATG',
    jackpotSettlement: '停用',
    contribution: 0,
    gameCap: 0.06,
    negativeProfit: '承擔',
    settlementType: '週結',
    settlementTime: '(每週日-23:59:59)',
    remark:
      '台幣通道: 累計1萬以上結清\n* 交易方式1: 10萬以內-採匯款方式結清\n* 交易方式2: 10萬以上-採現金方式面交',
  },
  {
    key: '2',
    station: 'FM',
    category: '電子',
    vendorName: 'QT',
    jackpotSettlement: '停用',
    contribution: 0,
    gameCap: 0.06,
    negativeProfit: '不承擔',
    settlementType: '月結',
    settlementTime: '(每月最後一天-23:59:59)',
    remark:
      '台幣通道: 遊戲平台商務表示，金額不大可累計(千元亦可用USDT\n* 交易方式1: 10萬以內-採USDT方式結清\n* 交易方式2: 10萬以上-採現金方式面交',
  },
  {
    key: '3',
    station: 'FM',
    category: '電子',
    vendorName: 'FM',
    jackpotSettlement: '停用',
    contribution: 0,
    gameCap: 0.06,
    negativeProfit: '承擔',
    settlementType: '週結',
    settlementTime: '(每週日-23:59:59)',
    remark:
      '台幣通道: 累計1萬以上結清\n* 交易方式1: 10萬以內-採匯款方式結清\n* 交易方式2: 10萬以上-採現金方式面交',
  },
  {
    key: '4',
    station: 'FM',
    category: '電子',
    vendorName: 'RSG',
    jackpotSettlement: '啟用',
    contribution: 0.5,
    gameCap: 0.06,
    negativeProfit: '不承擔',
    settlementType: '月結',
    settlementTime: '(每月最後一天-23:59:59)',
    remark:
      '台幣通道: 遊戲平台商務表示，金額不大可累計(千元亦可用USDT\n* 交易方式1: 10萬以內-採USDT方式結清\n* 交易方式2: 10萬以上-採現金方式面交',
  },
  {
    key: '5',
    station: 'FM',
    category: '電子',
    vendorName: 'BNG',
    jackpotSettlement: '停用',
    contribution: 0,
    gameCap: 0.06,
    negativeProfit: '承擔',
    settlementType: '週結',
    settlementTime: '(每週日-23:59:59)',
    remark:
      '台幣通道: 累計1萬以上結清\n* 交易方式1: 10萬以內-採匯款方式結清\n* 交易方式2: 10萬以上-採現金方式面交',
  },
]

// =============================================================================
// 主頁面：GameSetting
// =============================================================================

export default function GameSetting() {
  // 1. 狀態管理：viewMode 控制頁面切換, editingRecord 暫存編輯資料
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingRecord, setEditingRecord] = useState<GameSettingData | null>(
    null
  )

  const [dataSource, setDataSource] = useState(MOCK_DATA)
  const [isHandlerModalOpen, setIsHandlerModalOpen] = useState(false)
  const [currentLogs, setCurrentLogs] = useState<HandlerLogData[]>([])

  // --- 搜尋欄位設定 ---
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '站別',
        name: 'station',
        colProps: { xs: 24, md: 8, lg: 5 },
        render: () => (
          <Select
            placeholder="請選擇"
            options={[{ label: 'FM', value: 'FM' }]}
            defaultValue="FM"
          />
        ),
      },
      {
        label: '遊戲類別',
        name: 'category',
        colProps: { xs: 24, md: 8, lg: 5 },
        render: () => (
          <Select
            placeholder="請選擇"
            options={[
              { label: '電子', value: 'electronic' },
              { label: '真人', value: 'live' },
            ]}
            defaultValue="electronic"
          />
        ),
      },
      {
        label: '每頁顯示筆數',
        name: 'pageSize',
        colProps: { xs: 24, md: 8, lg: 5 },
        render: () => (
          <Select
            options={[
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 },
            ]}
            defaultValue={20}
          />
        ),
      },
    ],
    []
  )

  // --- 動作處理邏輯 ---

  const handleSearch = (values: any) => {
    message.info(`搜尋條件: ${JSON.stringify(values)}`)
  }

  // 點擊新增：切換模式並清空編輯資料
  const handleCreate = () => {
    setEditingRecord(null)
    setViewMode('create')
  }

  // 返回列表
  const handleBackToList = () => {
    setViewMode('list')
    setEditingRecord(null)
  }

  // 處理表單儲存 (新增或編輯)
  const handleFormSave = (values: any) => {
    if (viewMode === 'create') {
      // 模擬新增資料
      const newRecord: GameSettingData = {
        key: Date.now().toString(),
        station: values.station,
        category: values.category,
        vendorName: values.vendorName || values.vendor, // 相容不同命名
        jackpotSettlement: values.jackpotSettlement,
        contribution: Number(values.contribution),
        gameCap: Number(values.gameCap),
        negativeProfit: values.negativeProfit,
        settlementType: values.settlementType || '週結',
        settlementTime: '(預設時間)',
        remark: '',
      }
      setDataSource((prev) => [newRecord, ...prev])
      message.success('新增成功')
    } else if (viewMode === 'edit' && editingRecord) {
      // 模擬更新資料
      setDataSource((prev) =>
        prev.map((item) =>
          item.key === editingRecord.key ? { ...item, ...values } : item
        )
      )
      message.success('更新成功')
    }
    handleBackToList()
  }

  // 儲存備註 (列表內直接編輯)
  const handleSaveRemark = (key: string, newRemark: string) => {
    setDataSource((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, remark: newRemark } : item
      )
    )
    message.success('備註已更新')
  }

  // 讀取經手人日誌
  const fetchLogs = (record: GameSettingData) => {
    console.log('讀取日誌:', record)
    const mockLogs: HandlerLogData[] = [
      {
        key: '1',
        time: '2026-01-05 09:30:00',
        handler: 'Luca',
        status: '修改',
        details: '修改備註內容',
      },
    ]
    setCurrentLogs(mockLogs)
    setIsHandlerModalOpen(true)
  }

  // 表格下拉選單動作
  const handleMenuClick = (key: string, record: GameSettingData) => {
    if (key === 'edit') {
      // ★ 設定編輯資料並切換模式
      setEditingRecord(record)
      setViewMode('edit')
    } else if (key === 'logs') {
      fetchLogs(record)
    } else if (key === 'delete') {
      message.error(`刪除: ${record.vendorName}`)
    }
  }

  // --- 表格欄位定義 ---
  const columns: ColumnsType<GameSettingData> = [
    {
      title: '站別',
      dataIndex: 'station',
      key: 'station',
      width: 80,
      align: 'center',
    },
    {
      title: '遊戲類別',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      align: 'center',
    },
    {
      title: '遊戲商名稱',
      dataIndex: 'vendorName',
      key: 'vendorName',
      width: 120,
      align: 'center',
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: '彩金結算',
      dataIndex: 'jackpotSettlement',
      key: 'jackpotSettlement',
      width: 100,
      align: 'center',
      render: (text) => (
        <span
          className={
            text === '停用' || text === '停用' // 相容資料
              ? 'text-gray-400'
              : 'text-green-600'
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: '彩金貢獻值(JC/%)',
      dataIndex: 'contribution',
      key: 'contribution',
      width: 140,
      align: 'center',
    },
    {
      title: '遊戲上繳(%)',
      dataIndex: 'gameCap',
      key: 'gameCap',
      width: 120,
      align: 'center',
    },
    {
      title: '負營利狀態',
      dataIndex: 'negativeProfit',
      key: 'negativeProfit',
      width: 120,
      align: 'center',
      render: (text) => (
        <Tag
          color={
            text === '承擔' ? 'green' : text === '不承擔' ? 'red' : 'default'
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: '結算方式',
      key: 'settlement',
      width: 180,
      align: 'center',
      render: (_, r) => (
        <div className="flex flex-col items-center leading-tight">
          <span className="font-bold text-gray-700">{r.settlementType}</span>
          <span className="scale-90 text-[10px] text-gray-500">
            {r.settlementTime}
          </span>
        </div>
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      key: 'remark',
      width: 350,
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
          { type: 'divider' },
          {
            key: 'delete',
            label: '刪除',
            icon: <StopOutlined />,
            danger: true,
            onClick: () => handleMenuClick('delete', record),
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

  // ===========================================================================
  // 畫面渲染
  // ===========================================================================

  // 1. 如果是新增或編輯模式，渲染表單元件
  if (viewMode === 'create' || viewMode === 'edit') {
    return (
      <ConfigProvider theme={theme}>
        <GameSettingCreate
          initialValues={editingRecord} // ★ 傳入編輯資料 (如果是 create 則為 null)
          onCancel={handleBackToList}
          onSave={handleFormSave}
        />
      </ConfigProvider>
    )
  }

  // 2. 否則渲染列表模式
  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 麵包屑 */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            遊戲上繳設定
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{
            station: 'FM',
            category: 'electronic',
            pageSize: 20,
          }}
          onSearch={handleSearch}
          onCreate={handleCreate}
        />

        {/* 表格內容 */}
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="key"
            pagination={{
              total: dataSource.length,
              pageSize: 20,
              position: ['bottomCenter'],
              showTotal: (total) => `共 ${total} 筆資料`,
              className: 'pt-4',
            }}
            size="middle"
            scroll={{ x: 1400 }}
            bordered
            rowClassName="hover:bg-gray-50"
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
