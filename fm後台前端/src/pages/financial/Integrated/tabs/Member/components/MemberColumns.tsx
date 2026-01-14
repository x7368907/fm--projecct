import type { ColumnsType } from 'antd/es/table'
import type { MemberDataType, TotalDataType } from '../types'

interface GetColumnsProps {
  totalData: TotalDataType
  onOpenDetail: (
    title: string,
    field: keyof MemberDataType,
    record: MemberDataType
  ) => void
}

export const getMemberColumns = ({
  totalData,
  onOpenDetail,
}: GetColumnsProps): ColumnsType<MemberDataType> => {
  // Helper: 產生連結樣式
  const renderLink = (
    val: number,
    title: string,
    field: keyof MemberDataType,
    record: MemberDataType,
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
          width: 200,
          fixed: 'left',
          render: (text: string) => (
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">
                {text.split(' ')[0]}
              </span>
              <span className="text-xs text-gray-400">
                {text.split(' ')[1]}
              </span>
            </div>
          ),
        },
        {
          title: '會員姓名',
          dataIndex: 'memberName',
          key: 'memberName',
          width: 100,
          fixed: 'left',
          align: 'center',
        },
        {
          title: '特權等級',
          dataIndex: 'vipLevel',
          key: 'vipLevel',
          width: 120,
          fixed: 'left',
          align: 'center',
          className: 'text-xs text-gray-500',
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
          render: (val, record) =>
            renderLink(val, '下注金額', 'betAmount', record, 'text-gray-700'),
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
          render: (val, record) =>
            renderLink(
              val,
              '有效投注金額',
              'validBetAmount',
              record,
              'text-gray-700'
            ),
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
          {totalData.lossAmount.toLocaleString()}
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
        <div className="text-right font-bold text-blue-500">
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
        <div className="text-right font-bold text-blue-500">
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
