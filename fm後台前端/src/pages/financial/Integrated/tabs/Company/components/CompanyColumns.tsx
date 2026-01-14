import type { ColumnsType } from 'antd/es/table'
import type { DataType, TotalDataType } from '../types'

// 輔助函式：純文字金額顯示 (主要用於合計欄位與非連結欄位)
const renderMoney = (value: number, isRed: boolean = false) => (
  <span className={`${isRed ? 'text-red-500' : 'text-gray-700'} font-medium`}>
    {value.toLocaleString()}
  </span>
)

interface GetColumnsProps {
  totalData: TotalDataType
  onOpenDetail: (title: string, field: keyof DataType, record: DataType) => void
}

export const getCompanyColumns = ({
  totalData,
  onOpenDetail,
}: GetColumnsProps): ColumnsType<DataType> => {
  // 輔助函式：產生可點擊的連結 (減少重複代碼)
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
          title: '會員數',
          dataIndex: 'memberCount',
          key: 'memberCount',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '累計會員數', 'memberCount', record), // 預設藍色
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
            renderLink(val, '下注筆數', 'betCount', record), // 預設藍色
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-blue-600">
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
            renderLink(val, '下注金額', 'betAmount', record, 'text-blue-600'),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-blue-600">
          {totalData.validBetAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '有效投注',
          dataIndex: 'validBetAmount',
          key: 'validBetAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '有效投注金額',
              'validBetAmount',
              record,
              'text-blue-600'
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
            renderLink(
              val,
              '會員中獎金額',
              'winAmount',
              record,
              'text-green-600'
            ),
        },
      ],
    },
    {
      title: (
        <div className="text-right font-bold text-red-500">
          {renderMoney(totalData.lossAmount, true)}
        </div>
      ),
      children: [
        {
          title: '虧損金額',
          dataIndex: 'lossAmount',
          key: 'lossAmount',
          align: 'right',
          render: (val, record) =>
            renderLink(
              val,
              '會員虧損金額',
              'lossAmount',
              record,
              'text-red-500'
            ),
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
          render: (val) => renderMoney(val),
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
          render: (val) => renderMoney(val),
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
          title: '會員返水',
          dataIndex: 'rebate',
          key: 'rebate',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '會員返水', 'rebate', record, 'text-green-600'),
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
          {totalData.commission.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '代理分潤',
          dataIndex: 'commission',
          key: 'commission',
          align: 'right',
          render: (val, record) =>
            renderLink(val, '代理分潤', 'commission', record, 'text-green-600'),
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
          title: '遊戲上繳',
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
    {
      title: (
        <div className="text-right font-bold">
          {renderMoney(totalData.netProfit, totalData.netProfit < 0)}
        </div>
      ),
      fixed: 'right',
      children: [
        {
          title: '公司淨利',
          dataIndex: 'netProfit',
          key: 'netProfit',
          align: 'right',
          fixed: 'right',
          width: 120,
          render: (val, record) =>
            renderLink(val, '公司獲利', 'netProfit', record, 'text-red-500'),
        },
      ],
    },
  ]
}
