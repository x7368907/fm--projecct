import type { ColumnsType } from 'antd/es/table'
import type { BetTypeDataType, TotalDataType } from '../types'

interface GetColumnsProps {
  totalData: TotalDataType
  onLinkClick: (title: string, record: BetTypeDataType) => void
}

export const getBetTypeColumns = ({
  totalData,
  onLinkClick,
}: GetColumnsProps): ColumnsType<BetTypeDataType> => {
  // Helper: 產生藍色連結
  const renderLink = (val: number, title: string, record: BetTypeDataType) => (
    <a
      className="cursor-pointer font-medium text-blue-500 underline hover:opacity-80"
      onClick={() => onLinkClick(title, record)}
    >
      {val.toLocaleString()}
    </a>
  )

  // Helper: 產生一般金額/數字 (用於下注筆數、虧損、餘額)
  const renderText = (
    val: number,
    colorType: 'red' | 'green' | 'blue' | 'normal' = 'normal',
    isTotalRow: boolean = false
  ) => {
    let colorClass = 'text-gray-700'
    if (colorType === 'green') colorClass = 'text-green-600'
    if (colorType === 'red') colorClass = 'text-red-500'
    if (colorType === 'blue') colorClass = 'text-blue-500'

    // 合計列加粗
    const fontClass = isTotalRow ? 'font-bold text-lg' : 'font-medium'

    return (
      <span className={`${colorClass} ${fontClass}`}>
        {val.toLocaleString()}
      </span>
    )
  }

  // Helper: 產生金額 (含顏色邏輯)
  const renderMoney = (
    val: number,
    colorType: 'red' | 'green' | 'normal' = 'normal'
  ) => {
    let colorClass = 'text-gray-700'
    if (colorType === 'green') colorClass = 'text-green-600'
    if (colorType === 'red') colorClass = 'text-red-500'
    return (
      <span className={`${colorClass} font-medium`}>
        {val.toLocaleString()}
      </span>
    )
  }

  return [
    {
      title: <div className="text-center font-bold text-gray-700">合計：</div>,
      fixed: 'left',
      width: 400,
      children: [
        {
          title: '代理級別',
          dataIndex: 'agentLevel',
          width: 90,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '代理名稱',
          dataIndex: 'agentName',
          width: 120,
          align: 'center',
          fixed: 'left',
          render: (text: string) => {
            const [name, desc] = text.split(' ')
            return (
              <div className="flex flex-col leading-tight">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-gray-400">{desc}</span>
              </div>
            )
          },
        },
        {
          title: '會員姓名',
          dataIndex: 'memberName',
          width: 100,
          align: 'center',
          fixed: 'left',
        },
        {
          title: '特權等級',
          dataIndex: 'vipLevel',
          width: 120,
          align: 'center',
          fixed: 'left',
        },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.betCount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '下注筆數',
          dataIndex: 'betCount',
          align: 'center',
          width: 120,
          render: (v, r) => renderText(v, 'blue', r.key === 'total_row'),
        },
      ],
    },
    {
      title: (
        <div className="grid grid-cols-7 divide-x divide-gray-300 font-bold text-blue-500">
          <div className="text-center">
            {totalData.liveValidBet.toLocaleString()}
          </div>
          <div className="text-center">
            {totalData.slotValidBet.toLocaleString()}
          </div>
          <div className="text-center">
            {totalData.sportValidBet.toLocaleString()}
          </div>
          <div className="text-center">
            {totalData.lotteryValidBet.toLocaleString()}
          </div>
          <div className="text-center">
            {totalData.chessValidBet.toLocaleString()}
          </div>
          <div className="text-center">
            {totalData.fishValidBet.toLocaleString()}
          </div>
          <div className="text-center">
            {totalData.totalValidBet.toLocaleString()}
          </div>
        </div>
      ),
      children: [
        {
          title: (
            <div className="text-center font-bold text-gray-700">
              有效投注金額
            </div>
          ),
          colSpan: 7,
          children: [
            {
              title: '真人',
              dataIndex: 'liveValidBet',
              align: 'center',
              width: 120,
              render: (v, r) => renderLink(v, '真人投注', r),
            },
            {
              title: '電子',
              dataIndex: 'slotValidBet',
              align: 'center',
              width: 120,
              render: (v, r) => renderLink(v, '電子投注', r),
            },
            {
              title: '體育',
              dataIndex: 'sportValidBet',
              align: 'center',
              width: 120,
              render: (v, r) => renderLink(v, '體育投注', r),
            },
            {
              title: '彩票',
              dataIndex: 'lotteryValidBet',
              align: 'center',
              width: 120,
              render: (v, r) => renderLink(v, '彩票投注', r),
            },
            {
              title: '棋牌',
              dataIndex: 'chessValidBet',
              align: 'center',
              width: 120,
              render: (v, r) => renderLink(v, '棋牌投注', r),
            },
            {
              title: '捕魚',
              dataIndex: 'fishValidBet',
              align: 'center',
              width: 120,
              render: (v, r) => renderLink(v, '捕魚投注', r),
            },
            {
              title: '總計',
              dataIndex: 'totalValidBet',
              align: 'center',
              width: 120,
              render: (v) => renderMoney(v),
            },
          ],
        },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-green-600">
          {totalData.winAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '中獎金額',
          dataIndex: 'winAmount',
          align: 'center',
          width: 120,
          render: (v) => renderMoney(v, 'green'),
        },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-red-500">
          {totalData.lossAmount.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '虧損金額',
          dataIndex: 'lossAmount',
          align: 'center',
          width: 120,
          render: (v) => renderMoney(v, 'red'),
        },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.accountBalance.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '帳號餘額',
          dataIndex: 'accountBalance',
          align: 'center',
          width: 120,
          render: (v) => renderMoney(v),
        },
      ],
    },
    {
      title: (
        <div className="text-center font-bold text-gray-700">
          {totalData.gameBalance.toLocaleString()}
        </div>
      ),
      children: [
        {
          title: '遊戲餘額',
          dataIndex: 'gameBalance',
          align: 'center',
          width: 120,
          render: (v) => renderMoney(v),
        },
      ],
    },
  ]
}
