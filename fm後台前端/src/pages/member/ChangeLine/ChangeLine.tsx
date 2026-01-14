import { Breadcrumb, ConfigProvider, Card, Input, Select } from 'antd'

// 1. 引入共用元件
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

// 2. 引入頁面專屬元件
import ChangeLineCreate from './form/ChangeLineCreat'
import HandlerModal from '../../AgentList/components/HandlerModal'
import ChangeLineTable from './components/ChangeLineTable'

// 3. 引入您原本寫好的 Hook (裡面已經包含 log 邏輯了)
import { useChangeLine } from './hook/useChangeLine'

const theme = { token: { colorPrimary: '#14b8a6' } }

export default function ChangeLine() {
  // 4. 使用您的 Hook，取出所有需要的狀態
  const {
    viewMode,
    setViewMode,
    dataSource, // 如果您的表格資料也是從這裡來，記得解構出來傳給 Table
    logState, // 這裡包含了 open, setOpen, logs, fetchLogs
  } = useChangeLine()

  // 搜尋欄位設定
  const searchFields: SearchField[] = [
    {
      label: '來源代理級別',
      name: 'sourceLevel',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => (
        <Select
          placeholder="請選擇代理級別"
          allowClear
          options={[
            { label: '全部', value: 'all' },
            { label: '1級總代理', value: 'lvl1' },
            { label: '2級代理', value: 'lvl2' },
            // ...
          ]}
        />
      ),
    },
    {
      label: '來源代理名稱',
      name: 'sourceAgentName',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => <Input placeholder="請輸入" />,
    },
    {
      label: '換線日期',
      name: 'changeDate',
      colProps: { xs: 24, sm: 24, md: 8 },
      render: () => <QuickRangePicker />,
    },
  ]

  const initialValues = { sourceLevel: 'all' }

  // 搜尋事件
  const handleSearch = (values: any) => {
    console.log('搜尋條件:', values)
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>營運商管理</Breadcrumb.Item>
          <Breadcrumb.Item
            className="cursor-pointer transition-colors hover:text-teal-600"
            onClick={() => setViewMode('list')} // 使用 setViewMode
          >
            代理換線紀錄
          </Breadcrumb.Item>

          {viewMode === 'create' && <Breadcrumb.Item>新增換線</Breadcrumb.Item>}
        </Breadcrumb>

        {viewMode === 'create' ? (
          <ChangeLineCreate onCancel={() => setViewMode('list')} />
        ) : (
          <>
            <SearchPanel
              fields={searchFields}
              initialValues={initialValues}
              onCreate={() => setViewMode('create')}
              onSearch={handleSearch}
            />

            <Card className="shadow-sm">
              <ChangeLineTable
                dataSource={dataSource}
                onViewLog={logState.fetchLogs}
              />
            </Card>

            <HandlerModal
              // 這裡改用 logState 的狀態
              open={logState.open}
              onCancel={() => logState.setOpen(false)}
              logs={logState.logs}
            />
          </>
        )}
      </div>
    </ConfigProvider>
  )
}
