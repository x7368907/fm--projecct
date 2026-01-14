import { Input, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { AgentData, LevelData } from '../../types'

interface AgentSelectorProps {
  title: string
  selectionType: 'checkbox' | 'radio'
  levels: LevelData[]
  dataSource: AgentData[]
  // 可以在此加入 onChange 等 callback
}

export default function AgentSelector({
  title,
  selectionType,
  levels,
  dataSource,
}: AgentSelectorProps) {
  const columns: ColumnsType<AgentData> = [
    {
      title: '名稱',
      dataIndex: 'name',
      width: 250,
      render: (text, record) => (
        <div>
          <div className="font-bold">
            {text}{' '}
            <span className="font-normal text-gray-400">
              ({record.memberCount})
            </span>
          </div>
          <div className="text-xs text-gray-400">{record.realName}</div>
        </div>
      ),
    },
    {
      title: '代理分潤制度',
      dataIndex: 'profitSystem',
      render: (text) => (
        <div className="whitespace-pre-wrap text-center text-xs">{text}</div>
      ),
    },
    {
      title: '分潤名稱',
      dataIndex: 'profitName',
      render: (text) => <div className="text-xs">{text}</div>,
    },
    {
      title: '代理分潤結算',
      dataIndex: 'cycle',
      align: 'center',
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs">{text}</div>
      ),
    },
  ]

  return (
    <div className="mb-4 overflow-hidden rounded-md border border-gray-300 bg-white">
      {/* 標題列 */}
      <div className="flex border-b border-gray-300 bg-gray-200 font-bold text-gray-700">
        <div className="w-40 flex-shrink-0 border-r border-gray-300 px-4 py-2">
          來源代理級別
        </div>
        <div className="flex-1 px-4 py-2">{title}</div>
      </div>

      <div className="flex">
        {/* 左側級別選單 */}
        <div className="w-40 flex-shrink-0 border-r border-gray-300 bg-gray-50">
          {levels.map((lvl, idx) => (
            <div
              key={idx}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-200 px-3 py-3 text-sm hover:bg-gray-100 ${
                lvl.active
                  ? 'border-l-4 border-l-teal-600 bg-white font-bold text-teal-600'
                  : 'text-gray-600'
              } `}
            >
              <span>{lvl.label.split(' ')[0]}</span>
              <span className="rounded-full bg-gray-200 px-1.5 text-xs text-gray-500">
                {lvl.count}
              </span>
            </div>
          ))}
        </div>

        {/* 右側內容區 */}
        <div className="flex-1 p-4">
          <div className="mb-3 flex gap-2">
            <Input placeholder="請輸入代理名稱" className="max-w-xs" />
            <Button>清空</Button>
          </div>

          <Table
            rowSelection={{ type: selectionType }}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="small"
            scroll={{ y: 240 }}
            bordered
          />
        </div>
      </div>
    </div>
  )
}
