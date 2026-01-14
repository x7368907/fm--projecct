import { Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { DataType, TotalDataType } from '../types'

interface GetColumnsProps {
  totalData: TotalDataType
  onOpenDetail: (title: string, field: keyof DataType, record: DataType) => void
}

export const getAgentColumns = ({
  totalData,
  onOpenDetail,
}: GetColumnsProps): ColumnsType<DataType> => {
  // 輔助函式：純文字金額
  const renderMoney = (
    value: number,
    colorType: 'red' | 'green' | 'normal' = 'normal'
  ) => {
    let colorClass = 'text-gray-700'
    if (colorType === 'red') colorClass = 'text-red-500'
    if (colorType === 'green') colorClass = 'text-green-600'
    if (value < 0) colorClass = 'text-red-500'
    return (
      <span className={`${colorClass} font-medium`}>
        {value.toLocaleString()}
      </span>
    )
  }

  // 輔助函式：連結
  const renderLink = (
    val: number,
    title: string,
    field: keyof DataType,
    record: DataType,
    colorClass: string = 'text-blue-500'
  ) => (
    <a
      className={`${colorClass} cursor-pointer font-medium underline hover:opacity-80`}
      onClick={() => onOpenDetail(title, field, record)}
    >
      {val.toLocaleString()}
    </a>
  )

  return [
    {
      title: (
        <div className="w-full pr-4 text-right font-bold text-gray-600">
          合計 :
        </div>
      ),
      fixed: 'left',
      children: [
        {
          title: '代理級別',
          dataIndex: 'agentLevel',
          key: 'agentLevel',
          width: 100,
          fixed: 'left',
          align: 'center',
        },
        {
          title: '代理名稱',
          dataIndex: 'agentName',
          key: 'agentName',
          width: 220,
          fixed: 'left',
          render: (text: string) => (
            <div className="flex flex-col">
              <a className="font-medium text-blue-500 hover:underline">
                {text.split(' ')[0]}
              </a>
              <span className="text-xs text-gray-400">
                {text.split(' ')[1]}
              </span>
            </div>
          ),
        },
        {
          title: '分潤制度',
          dataIndex: 'commissionMode',
          key: 'commissionMode',
          width: 100,
          fixed: 'left',
          align: 'center',
          render: (text: string) => (
            <Tag color={text === '佔成制' ? 'orange' : 'default'}>{text}</Tag>
          ),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.memberCount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '會員數量',
          dataIndex: 'memberCount',
          key: 'memberCount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '會員數量', 'memberCount', record),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.betCount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          key: 'betCount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '下注筆數', 'betCount', record),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.betAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '下注金額',
          dataIndex: 'betAmount',
          key: 'betAmount',
          align: 'right',
          render: (val) => renderMoney(val),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.validBetAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '有效投注金額',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val) => renderMoney(val),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.winAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '中獎金額',
          dataIndex: 'winAmount',
          key: 'winAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '中獎金額', 'winAmount', record, 'text-green-600'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-red-500">
          {renderMoney(totalData.lossAmount, 'red')}
        </div>
      ),
      children: [
        {
          title: '虧損金額',
          dataIndex: 'lossAmount',
          key: 'lossAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '虧損金額', 'lossAmount', record, 'text-red-500'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.deposit.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '儲值',
          dataIndex: 'deposit',
          key: 'deposit',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '儲值', 'deposit', record, 'text-blue-500'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-gray-700">
          {totalData.withdraw.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '託售',
          dataIndex: 'withdraw',
          key: 'withdraw',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '託售', 'withdraw', record, 'text-blue-500'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.rebate.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '會員返水金額',
          dataIndex: 'rebate',
          key: 'rebate',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '會員返水金額', 'rebate', record, 'text-green-600'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.discount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '會員優惠',
          dataIndex: 'discount',
          key: 'discount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '會員優惠', 'discount', record, 'text-green-600'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.cost.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '營運成本',
          dataIndex: 'cost',
          key: 'cost',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '營運成本', 'cost', record, 'text-green-600'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-green-600">
          {totalData.gameFee.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '遊戲上繳金額',
          dataIndex: 'gameFee',
          key: 'gameFee',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '遊戲上繳金額',
              'gameFee',
              record,
              'text-green-600'
            ),
        },
      ],
    },
  ]
}
