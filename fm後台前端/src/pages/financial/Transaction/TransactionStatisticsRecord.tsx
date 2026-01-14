import { useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Select, Button, Input } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

// 1. 引入共用元件 (Project-level shared components)
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import QuickRangePicker from '../../../components/QuickRangePicker'

// 2. 引入區域模組 (Page-level components & utils)
import TransactionTable from './components/TransactionTable'
import { MOCK_DATA } from './utils/fakeData'

// 設定主題色
const theme = { token: { colorPrimary: '#14b8a6' } }

export default function Transaction() {
  // --- 邏輯處理區 ---

  // 搜尋處理
  const handleSearch = (values: any) => {
    console.log('Search Values:', values)
    // TODO: 呼叫 API 更新列表資料
  }

  // 下載按鈕
  const downloadBtn = (
    <Button
      icon={<DownloadOutlined />}
      className="border-green-500 text-green-500 shadow-sm hover:!border-green-600 hover:bg-green-50 hover:!text-green-600"
    >
      下載
    </Button>
  )

  // 搜尋欄位配置
  const searchFields: SearchField[] = useMemo(
    () => [
      {
        label: '代理級別',
        name: 'agentLevel',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => (
          <Select
            placeholder="請選擇"
            allowClear
            options={[
              { value: '1', label: '1級總代理' },
              { value: '2', label: '2級代理' },
            ]}
          />
        ),
      },
      {
        label: '會員姓名',
        name: 'memberName',
        colProps: { xs: 24, md: 8, lg: 4 },
        render: () => <Input placeholder="輸入姓名" />,
      },
      {
        label: '日期時間',
        name: 'dateRange',
        colProps: { xs: 24, lg: 12, xl: 10 },
        render: () => <QuickRangePicker />,
      },
    ],
    []
  )

  // --- 畫面渲染區 ---
  return (
    <ConfigProvider theme={theme}>
      <div className="flex min-h-screen flex-col bg-gray-50 p-4">
        {/* 麵包屑導航 */}
        <Breadcrumb separator=">" className="mb-4 text-sm">
          <Breadcrumb.Item>財務管理</Breadcrumb.Item>
          <Breadcrumb.Item className="font-bold text-gray-800">
            交易管理查詢
          </Breadcrumb.Item>
        </Breadcrumb>

        {/* 搜尋區塊 */}
        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ agentLevel: '1' }}
          onSearch={handleSearch}
          extra={downloadBtn}
        />

        {/* 資料表格區塊 */}
        <TransactionTable dataSource={MOCK_DATA} />
      </div>
    </ConfigProvider>
  )
}
