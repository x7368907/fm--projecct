import { useState } from 'react'
import {
  Breadcrumb,
  ConfigProvider,
  Card,
  Input,
  Select,
  Button,
  message,
} from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

// 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

// 引入子元件
import AgentCreate from './form/AgentCreate'
import HandlerModal from '../components/HandlerModal'
import AgentTable from './components/AgentTable'

// 引入 Hooks 與 Types
import { useHandlerLogs } from './hooks/useHandlerLogs'
import { useAgentHierarchy } from './hooks/useAgentHierarchy'
import type { DataType } from './types'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function AgentList() {
  // 視圖狀態：列表 | 新增 | 編輯
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list')
  const [editing, setEditing] = useState<DataType | null>(null)

  // 經手人日誌 Hook
  const { logs, open, setOpen, fetchLogs } = useHandlerLogs()

  // 代理層級與列表資料 Hook
  const { agentList, cardTitle, searchByLevel, goNextLevel } =
    useAgentHierarchy()

  /**
   * =================================================
   * 搜尋欄位設定 (Search Fields) - 完整未省略
   * =================================================
   */
  const searchFields: SearchField[] = [
    {
      label: '代理級別',
      name: 'level',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => (
        <Select
          placeholder="請選擇代理級別"
          allowClear
          options={[
            { label: '1級總代理', value: 'lvl1' },
            { label: '2級代理', value: 'lvl2' },
            { label: '3級代理', value: 'lvl3' },
            { label: '4級代理', value: 'lvl4' },
            { label: '5級代理', value: 'lvl5' },
            { label: '6級代理', value: 'lvl6' },
            { label: '7級代理', value: 'lvl7' },
          ]}
        />
      ),
    },
    {
      label: '代理名稱',
      name: 'name', // 修正：對齊後端 name
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '代理帳號',
      name: 'account', // 修正：對齊後端 account
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '代理姓名',
      name: 'realName', // 已對齊
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '帳號狀態',
      name: 'status',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          allowClear
          options={[
            { label: '啟用', value: '啟用' }, // 直接傳中文對齊後端邏輯
            { label: '停用', value: '停用' },
          ]}
        />
      ),
    },
    {
      label: '金流群組',
      name: 'cashGroup',
      colProps: { xs: 24, sm: 12, md: 8, lg: 4 },
      render: () => (
        <Select
          placeholder="請選擇"
          allowClear
          options={[
            { label: '常規會員', value: '常規會員' },
            { label: '老會員', value: '老會員' },
            { label: '信用代理', value: '信用代理' },
            { label: 'USDT通道', value: 'USDT通道' },
          ]}
        />
      ),
    },
    {
      label: '註冊時間',
      name: 'regDate', // 在 Hook 轉成 regStart / regEnd
      colProps: { xs: 24, sm: 24, md: 12, lg: 6 },
      render: () => <QuickRangePicker />,
    },
    {
      label: '最後登入時間',
      name: 'loginDate', // 在 Hook 轉成 loginStart / loginEnd
      colProps: { xs: 24, sm: 24, md: 12, lg: 6 },
      render: () => <QuickRangePicker />,
    },
    {
      label: '分潤制度',
      name: 'profitSystem', // 修正：system -> profitSystem
      colProps: { xs: 24, sm: 12, md: 8, lg: 3 },
      render: () => (
        <Select placeholder="全部" allowClear>
          <Select.Option value="佔成制">佔成制</Select.Option>
          <Select.Option value="反水制">反水制</Select.Option>
        </Select>
      ),
    },
  ]

  // 搜尋面板初始值
  const initialValues = {
    level: 'lvl1',
  }

  // 操作函式
  const handleCreate = () => {
    setEditing(null)
    setView('create')
  }

  const handleEdit = (record: DataType) => {
    setEditing(record)
    setView('edit')
  }

  const handleDownload = () => {
    message.success('下載 Excel 報表中...')
  }

  const downloadBtn = (
    <Button
      icon={<DownloadOutlined />}
      onClick={handleDownload}
      className="border-green-500 bg-white text-green-500 hover:!border-green-400 hover:!text-green-400"
    >
      下載
    </Button>
  )

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* 共用麵包屑區塊
          在父層控制，確保切換 view 時位置不跳動
        */}
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>代理管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className={
              view !== 'list'
                ? 'cursor-pointer transition-colors hover:text-teal-600'
                : ''
            }
            onClick={() => setView('list')}
          >
            代理資料
          </Breadcrumb.Item>

          {/* 若非列表模式，動態顯示第三層 */}
          {view !== 'list' && (
            <Breadcrumb.Item>
              {view === 'edit' ? '編輯代理' : '新增代理'}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>

        {/* 內容切換區塊 */}
        {view === 'list' ? (
          <>
            <SearchPanel
              fields={searchFields}
              initialValues={initialValues}
              onCreate={handleCreate}
              onSearch={(values) => {
                searchByLevel(values)
              }}
              extra={downloadBtn}
            />

            <Card title={cardTitle} className="shadow-sm">
              <AgentTable
                data={agentList}
                onEdit={handleEdit}
                onLogs={fetchLogs}
                onViewFrontend={() => message.info('前往前台')}
                onPoints={() => message.info('開啟點數設定')}
                onLevelClick={goNextLevel}
              />
            </Card>

            <HandlerModal
              open={open}
              onCancel={() => setOpen(false)}
              logs={logs}
            />
          </>
        ) : (
          /* 新增/編輯模式
            注意：AgentCreate.tsx 內部已經移除了外層 Container 與 Breadcrumb，
            只保留 Form 內容，完美嵌入此處
          */
          <AgentCreate
            initialValues={view === 'edit' ? editing : null}
            onCancel={() => setView('list')}
          />
        )}
      </div>
    </ConfigProvider>
  )
}
