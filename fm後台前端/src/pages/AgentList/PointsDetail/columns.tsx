import type { ColumnsType } from 'antd/es/table'
import EditableNoteCell from './components/EditableNoteCell'
import ActionLogsButton from './components/ActionLogsButton'
import type { PointsRecord } from './types'

export const getColumns = ({
  onUpdateNote,
  onLogs,
}: {
  onUpdateNote: (key: string, val: string) => void
  onLogs: (r: PointsRecord) => void
}): ColumnsType<PointsRecord> => [
  { title: '類型', dataIndex: 'type', width: 120 },

  { title: '發放代理級別', dataIndex: 'issuingLevel', width: 120 },

  {
    title: '發放代理名稱',
    dataIndex: 'issuingAgentName',
    width: 180,
    render: (t) => <div className="whitespace-pre-wrap">{t}</div>,
  },

  { title: '發放代理', dataIndex: 'issuingAgent', width: 100 },

  {
    title: '發放帳戶餘額',
    dataIndex: 'issuingBalance',
    width: 180,
    render: (b) => (
      <div className="text-xs">
        <div className={b.change < 0 ? 'text-red-500' : 'text-green-600'}>
          {b.change.toLocaleString()}
        </div>
        <div className="text-gray-500">異動前：{b.before}</div>
        <div className="text-gray-900">異動後：{b.after}</div>
      </div>
    ),
  },

  { title: '接收代理級別', dataIndex: 'receivingLevel', width: 120 },

  {
    title: '接收代理名稱',
    dataIndex: 'receivingAgentName',
    width: 180,
    render: (t) => <div className="whitespace-pre-wrap">{t}</div>,
  },

  { title: '接收會員', dataIndex: 'receivingMember', width: 100 },

  {
    title: '接收帳戶餘額',
    dataIndex: 'receivingBalance',
    width: 180,
    render: (b) => (
      <div className="text-xs">
        <div className={b.change < 0 ? 'text-red-500' : 'text-green-600'}>
          {b.change > 0 ? `+${b.change}` : b.change}
        </div>
        <div className="text-gray-500">異動前：{b.before}</div>
        <div className="text-gray-900">異動後：{b.after}</div>
      </div>
    ),
  },

  { title: '流水倍數', dataIndex: 'turnoverMultiple', width: 80 },

  {
    title: '必須流水',
    dataIndex: 'requiredTurnover',
    width: 100,
    render: (t) => t.toLocaleString(),
  },

  {
    title: '備註',
    dataIndex: 'remarks',
    width: 200,
    render: (t, r) => (
      <EditableNoteCell value={t} onSave={(v) => onUpdateNote(r.key, v)} />
    ),
  },

  {
    title: '經手人',
    width: 80,
    fixed: 'right',
    align: 'center',
    render: (_, r) => <ActionLogsButton record={r} onClick={onLogs} />,
  },
]
