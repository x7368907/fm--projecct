import { Select } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { DataType } from './types'
import EditableNoteCell from './components/EditableNoteCell'
import ActionLogsButton from './components/ActionLogsButton'

const { Option } = Select

// 定義外部傳入的方法介面
interface ColumnHandlers {
  onOpenDetail: (record: DataType, type: 'bet' | 'loss') => void
  onOpenProfit: (record: DataType) => void
  onUpdateNote: (key: string, newNote: string) => void
  onFetchLogs: (record: DataType) => void
}

export const getColumns = ({
  onOpenDetail,
  onOpenProfit,
  onUpdateNote,
  onFetchLogs,
}: ColumnHandlers): ColumnsType<DataType> => [
  {
    title: '代理級別',
    dataIndex: 'agentLevel',
    key: 'agentLevel',
    width: 100,
  },
  {
    title: '代理名稱',
    dataIndex: 'agentName',
    key: 'agentName',
    render: (text) => <a className="text-blue-600 underline">{text}</a>,
  },
  {
    title: '會員數量',
    dataIndex: 'memberCount',
    key: 'memberCount',
    align: 'center',
  },
  {
    title: '代理帳號 / 姓名',
    dataIndex: 'agentInfo',
    key: 'agentInfo',
    render: (info) => (
      <div className="flex flex-col text-xs">
        <span>{info.account}</span>
        <span>{info.name}</span>
      </div>
    ),
  },
  {
    title: '帳號狀態',
    dataIndex: 'accountStatus',
    key: 'accountStatus',
    align: 'center',
  },
  { title: '分潤模式', dataIndex: 'profitMode', key: 'profitMode' },
  { title: '分潤結算', dataIndex: 'settlementCycle', key: 'settlementCycle' },
  {
    title: '結算起訖日',
    dataIndex: 'cycleDate',
    key: 'cycleDate',
    width: 120,
    render: (text) => (
      <div className="whitespace-pre-line text-xs">
        {text.replace(' - ', '\n|\n')}
      </div>
    ),
  },
  {
    title: '會員投注金額',
    dataIndex: 'betAmount',
    key: 'betAmount',
    align: 'right',
    render: (val, record) => (
      <a
        className="cursor-pointer text-blue-600 hover:text-blue-500 hover:underline"
        onClick={() => onOpenDetail(record, 'bet')}
      >
        {val.toLocaleString()}
      </a>
    ),
  },
  {
    title: '會員虧損金額',
    dataIndex: 'lossAmount',
    key: 'lossAmount',
    align: 'right',
    render: (val, record) => (
      <a
        className="cursor-pointer text-blue-600 hover:text-blue-500 hover:underline"
        onClick={() => onOpenDetail(record, 'loss')}
      >
        {val.toLocaleString()}
      </a>
    ),
  },
  {
    title: '代理分潤',
    dataIndex: 'agentProfit',
    key: 'agentProfit',
    align: 'right',
    render: (val, record) => (
      <a
        className="cursor-pointer font-bold text-blue-600 hover:text-blue-500 hover:underline"
        onClick={() => onOpenProfit(record)}
      >
        {val.toLocaleString()}
      </a>
    ),
  },
  {
    title: '備註',
    dataIndex: 'note',
    key: 'note',
    width: 200,
    render: (text, record) => (
      <EditableNoteCell
        value={text}
        onSave={(newValue) => onUpdateNote(record.key, newValue)}
      />
    ),
  },
  {
    title: '審核狀態',
    dataIndex: 'reviewStatus',
    key: 'reviewStatus',
    width: 140,
    render: (status) => (
      <Select defaultValue={status} style={{ width: 100 }}>
        <Option value="待審核">待審核</Option>
        <Option value="通過">通過</Option>
        <Option value="拒絕">拒絕</Option>
      </Select>
    ),
  },
  {
    title: '經手人',
    key: 'action',
    width: 80,
    fixed: 'right' as const,
    align: 'center' as const,
    render: (_: any, record: DataType) => (
      <ActionLogsButton onClick={() => onFetchLogs(record)} />
    ),
  },
]
