import { Breadcrumb, ConfigProvider, Input, Select } from 'antd'
import SearchPanel, { type SearchField } from '../../../components/SearchPanel'
import HandlerModal from '../../AgentList/components/HandlerModal'
import WalletTable from './components/WalletTable'
import { useWalletRecord } from './hook/useWalletRecord'

const { Option } = Select

export default function WalletRecord() {
  const { dataSource, handleUpdateNote, handleSearch, logState } =
    useWalletRecord()

  // 搜尋欄位設定
  const searchFields: SearchField[] = [
    {
      label: '會員帳號',
      name: 'account',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => <Input placeholder="請輸入帳號" />,
    },
    {
      label: '會員姓名',
      name: 'name',
      colProps: { xs: 24, sm: 12, md: 5 },
      render: () => <Input placeholder="請輸入姓名" />,
    },
    {
      label: '類型',
      name: 'type',
      colProps: { xs: 24, sm: 12, md: 4 },
      render: () => (
        <Select>
          <Option value="all">全部</Option>
          <Option value="activity">優惠活動</Option>
          <Option value="withdraw">會員託售</Option>
        </Select>
      ),
    },
  ]

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#14b8a6' } }}>
      <div className="min-h-screen w-full bg-gray-50 p-4">
        <Breadcrumb separator=">" className="mb-4">
          <Breadcrumb.Item>會員管理</Breadcrumb.Item>
          <Breadcrumb.Item>會員錢包紀錄</Breadcrumb.Item>
        </Breadcrumb>

        <SearchPanel
          title="條件搜尋"
          fields={searchFields}
          initialValues={{ type: 'all', pageSize: '20' }}
          onSearch={handleSearch}
        />

        <WalletTable
          dataSource={dataSource}
          onUpdateNote={handleUpdateNote}
          onViewLog={logState.fetchLogs}
        />

        <HandlerModal
          open={logState.open}
          onCancel={() => logState.setOpen(false)}
          logs={logState.logs}
        />
      </div>
    </ConfigProvider>
  )
}
