import { Radio, Tag, Input, Button, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { AgentData } from '../../types'
import { MOCK_AGENTS } from '../../utils/fakeData'

interface AgentTableAreaProps {
  selectedAgentKey: string
  onSelect: (key: string) => void
}

export default function AgentTableArea({
  selectedAgentKey,
  onSelect,
}: AgentTableAreaProps) {
  // 定義表格欄位
  const columns: ColumnsType<AgentData> = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text, record) => (
        <Radio
          checked={record.key === selectedAgentKey}
          onChange={() => onSelect(record.key)}
          className="whitespace-normal"
        >
          <span className="text-xs font-bold text-gray-700">
            {text.split('\n')[0]}
            {/* 保留原始邏輯：特定 key 顯示 Tag */}
            {record.key === '1' && (
              <Tag color="orange" className="ml-2">
                3
              </Tag>
            )}
            {record.key === '2' && (
              <Tag color="orange" className="ml-2">
                11
              </Tag>
            )}
          </span>
        </Radio>
      ),
    },
    {
      title: '代理制度',
      dataIndex: 'system',
      key: 'system',
      align: 'center',
      width: 150,
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs text-gray-500">{text}</div>
      ),
    },
    {
      title: '分潤名稱',
      dataIndex: 'splitName',
      key: 'splitName',
      align: 'center',
      width: 200,
      render: (text) => <div className="text-xs text-gray-500">{text}</div>,
    },
    {
      title: '代理佔成/返水',
      dataIndex: 'share',
      key: 'share',
      align: 'center',
      width: 120,
      render: (val) => (
        <div className="text-xs text-gray-500">
          {val === 0 ? '真人(0.4) / 電子(0.4) ...' : val}
        </div>
      ),
    },
    {
      title: '代理分潤結算',
      dataIndex: 'settlement',
      key: 'settlement',
      align: 'center',
      width: 150,
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs text-gray-500">{text}</div>
      ),
    },
  ]

  return (
    <div className="bg-white p-2">
      {/* 搜尋列 */}
      <div className="mb-2 flex">
        <Input
          placeholder="請輸入代理名稱"
          className="mr-2 w-64"
          suffix={<SearchOutlined />}
        />
        <Button size="small" type="primary" ghost>
          清空
        </Button>
      </div>

      {/* 表格本體 */}
      <Table
        columns={columns}
        dataSource={MOCK_AGENTS}
        pagination={false}
        size="small"
        rowKey="key"
        // 點擊整行也能觸發選取
        onRow={(record) => ({
          onClick: () => onSelect(record.key),
        })}
        scroll={{ y: 240 }}
        bordered={false}
      />
    </div>
  )
}
