import { Table, Select, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { BlocklistData } from '../../types' // 注意引用路徑

const { Option } = Select
const { TextArea } = Input

interface BlocklistTableProps {
  type: 'ip' | 'device'
  dataSource: BlocklistData[]
}

export default function BlocklistTable({
  type,
  dataSource,
}: BlocklistTableProps) {
  const columns: ColumnsType<BlocklistData> = [
    {
      title: '標籤',
      dataIndex: 'tag',
      width: 130,
      render: (val) => (
        <Select defaultValue={val} style={{ width: '100%' }}>
          <Option value="IP黑名單">IP黑名單</Option>
          <Option value="裝置黑名單">裝置黑名單</Option>
        </Select>
      ),
    },
    {
      title: '上級代理級別',
      dataIndex: 'agentLevel',
      width: 100,
      align: 'center',
    },
    {
      title: '代理名稱',
      dataIndex: 'agentName',
      width: 200,
      render: (text) => (
        <div className="whitespace-pre-line text-xs">{text}</div>
      ),
    },
    {
      title: '會員帳號 / 特權',
      dataIndex: 'account',
      width: 150,
      render: (text, record) => (
        <div>
          <div className="font-bold text-blue-600">{text}</div>
          <div className="text-xs text-gray-500">{record.privilege}</div>
        </div>
      ),
    },
    { title: '會員姓名', dataIndex: 'name', width: 90 },
    {
      title: '註冊 / 登入時間',
      dataIndex: 'registerTime',
      width: 160,
      render: (text, record) => (
        <div className="text-xs">
          <div>{text}</div>
          <div className="text-orange-500">{record.loginTime}</div>
        </div>
      ),
    },
    {
      title: '未登入天數',
      dataIndex: 'daysOffline',
      width: 90,
      align: 'center',
    },
    { title: '國家', dataIndex: 'country', width: 70 },
    { title: '城市', dataIndex: 'city', width: 80 },
    {
      title: type === 'ip' ? 'IP' : '裝置',
      dataIndex: 'duplicateValue',
      width: type === 'ip' ? 140 : 220,
      render: (text) => (
        <span className="break-all font-bold text-red-500">{text}</span>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-1">
          狀態
          <UserOutlined className="rounded-full bg-blue-600 p-1 text-xs text-white" />
        </div>
      ),
      dataIndex: 'status',
      width: 140,
      render: (val) => (
        <Select defaultValue={val} style={{ width: '100%' }}>
          <Option value="停用">停用</Option>
          <Option value="啟用(凍結錢包)">啟用(凍結錢包)</Option>
          <Option value="啟用">啟用</Option>
        </Select>
      ),
    },
    {
      title: '備註',
      dataIndex: 'remark',
      render: (text) => (
        <TextArea
          defaultValue={text}
          placeholder="請輸入備註"
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered
      size="small"
      scroll={{ x: 1200 }}
      className="mb-8"
    />
  )
}
