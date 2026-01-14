import type { ColumnsType } from 'antd/es/table'
import type { ChangeLineDataType } from './types'
import ProfitSettingCell from './components/ProfitSettingCell'
import ActionLogsButton from './components/ActionLogsButton'

export const getColumns = ({
  onLogs,
}: {
  onLogs: (r: ChangeLineDataType) => void
}): ColumnsType<ChangeLineDataType> => [
  {
    title: '來源代理級別',
    dataIndex: 'sourceLevel',
    width: 120,
    render: (text) => <span>{text}</span>,
  },
  {
    title: '會員數量',
    dataIndex: 'memberCount',
    width: 100,
    align: 'center',
    render: (text) => <span>{text}</span>,
  },
  {
    title: '來源代理名稱',
    render: (_, r) => (
      <div className="flex flex-col">
        <span className="font-bold">{r.sourceAgentName}</span>
        <span className="text-xs text-gray-500">{r.sourceAgentRealName}</span>
      </div>
    ),
  },
  {
    title: '上級代理級別',
    dataIndex: 'upperLevel',
    render: (t) => <span>{t} (2)</span>,
  },
  {
    title: '上級代理名稱',
    dataIndex: 'upperAgentName',
    render: (t) => <div className="whitespace-pre-wrap">{t}</div>,
  },
  {
    title: '代理分潤額度',
    dataIndex: 'profitSetting',
    width: 320,
    render: (items) => <ProfitSettingCell items={items} />,
  },
  {
    title: '分潤名稱',
    render: () => <span className="text-gray-600">抽水代理(無績效退水)</span>,
  },
  {
    title: '代理分潤週期',
    dataIndex: 'profitName',
    render: (t) => <div className="whitespace-pre-wrap text-center">{t}</div>,
  },
  {
    title: '經手人',
    fixed: 'right',
    width: 80,
    align: 'center',
    render: (_, r) => <ActionLogsButton record={r} onClick={onLogs} />,
  },
]
