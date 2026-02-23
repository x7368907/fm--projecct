import type { ColumnsType } from 'antd/es/table'
import type { ChangeLineDataType } from './types'
import ProfitSettingCell from './components/ProfitSettingCell'
import ProfitCycleCell from './components/ProfitCycleCell'
import ActionLogsButton from './components/ActionLogsButton'
import ProfitSystemCell from './components/ProfitSystemCell'

export const getColumns = ({
  onLogs,
}: {
  onLogs: (r: ChangeLineDataType) => void
}): ColumnsType<ChangeLineDataType> => [
  {
    title: '原代理級別',
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
    title: '原代理名稱',
    align: 'center',
    render: (_, r) => (
      <div className="flex flex-col">
        <span className="font-bold">{r.sourceAgentName}</span>
        <span className="text-xs text-gray-500">{r.sourceAgentRealName}</span>
      </div>
    ),
  },
  {
    title: '新代理級別',
    dataIndex: 'upperLevel',
    align: 'center',
    render: (t) => <span>{t} (2)</span>,
  },
  {
    title: '新代理名稱',
    dataIndex: 'upperAgentName',
    align: 'center',
    render: (t) => <div className="whitespace-pre-wrap">{t}</div>,
  },
  {
    title: '分潤名稱',
    dataIndex: 'profitSetting',
    width: 320,
    align: 'center',
    render: (items) => <ProfitSettingCell items={items} />,
  },
  {
    title: '代理分潤制度',
    dataIndex: 'profitSystems',
    align: 'center',
    width: 160,
    render: (items) => <ProfitSystemCell items={items} />,
  },
  {
    title: '代理分潤結算',
    dataIndex: 'profitCycles',
    align: 'center',
    width: 160,
    render: (items) => <ProfitCycleCell items={items} />,
  },

  {
    title: '換線日期',
    dataIndex: 'changeDate',
    align: 'center',
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
