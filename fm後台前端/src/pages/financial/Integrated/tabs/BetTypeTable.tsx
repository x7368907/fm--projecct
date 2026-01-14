import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 如果需要彈窗，請引入 DetailModal
// import DetailModal from '@/components/DetailModal';

interface BetTypeTableProps {
  searchParams?: any
}

// 擴充後的資料型別：包含六大類的筆數與金額
interface BetTypeDataType {
  key: string
  agentLevel: string
  agentName: string
  memberName: string
  vipLevel: string
  betCount: number // 總筆數

  // --- 各遊戲類別下注筆數 ---
  liveBetCount: number // 真人
  slotBetCount: number // 電子
  sportBetCount: number // 體育
  lotteryBetCount: number // 彩票
  chessBetCount: number // 棋牌
  fishBetCount: number // 捕魚

  // --- 有效投注金額細項 ---
  liveValidBet: number
  slotValidBet: number
  sportValidBet: number
  lotteryValidBet: number
  chessValidBet: number
  fishValidBet: number
  totalValidBet: number // 總計

  winAmount: number
  lossAmount: number
  accountBalance: number
  gameBalance: number
}

// 模擬資料
const mockData: BetTypeDataType[] = [
  {
    key: '1',
    agentLevel: '1 / 4 (8)',
    agentName: 'FMCA (金流/成數代理-主站)',
    memberName: '馬佩琳',
    vipLevel: 'VIP1-一般會員',
    betCount: 60,

    // 筆數細項
    liveBetCount: 10,
    slotBetCount: 20,
    sportBetCount: 5,
    lotteryBetCount: 15,
    chessBetCount: 5,
    fishBetCount: 5,

    // 金額細項
    liveValidBet: 1000,
    slotValidBet: 500,
    sportValidBet: 200,
    lotteryValidBet: 300,
    chessValidBet: 100,
    fishValidBet: 100,
    totalValidBet: 2200,

    winAmount: 540,
    lossAmount: 60,
    accountBalance: 6807,
    gameBalance: 5,
  },
  {
    key: '2',
    agentLevel: '1 / 4 (8)',
    agentName: 'XOUT (金流/成數代理-外單位)',
    memberName: '林哲賢',
    vipLevel: 'VIP1-一般會員',
    betCount: 35,

    liveBetCount: 5,
    slotBetCount: 10,
    sportBetCount: 10,
    lotteryBetCount: 5,
    chessBetCount: 3,
    fishBetCount: 2,

    liveValidBet: 5000,
    slotValidBet: 1000,
    sportValidBet: 2000,
    lotteryValidBet: 500,
    chessValidBet: 300,
    fishValidBet: 200,
    totalValidBet: 9000,

    winAmount: 350,
    lossAmount: 650,
    accountBalance: 9358,
    gameBalance: 13,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function BetTypeTable({ searchParams }: BetTypeTableProps) {
  // Helper: 點擊事件
  const handleLinkClick = (title: string, record: BetTypeDataType) => {
    console.log(`Open modal for: ${title}`, record)
  }

  // Helper: 產生藍色連結
  const renderLink = (val: number, title: string, record: BetTypeDataType) => (
    <a
      className="cursor-pointer font-medium text-blue-500 underline hover:opacity-80"
      onClick={() => handleLinkClick(title, record)}
    >
      {val.toLocaleString()}
    </a>
  )

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

  // 計算合計資料
  const totalData = {
    betCount: mockData.reduce((acc, cur) => acc + cur.betCount, 0),

    // 筆數合計
    liveBetCount: mockData.reduce((acc, cur) => acc + cur.liveBetCount, 0),
    slotBetCount: mockData.reduce((acc, cur) => acc + cur.slotBetCount, 0),
    sportBetCount: mockData.reduce((acc, cur) => acc + cur.sportBetCount, 0),
    lotteryBetCount: mockData.reduce(
      (acc, cur) => acc + cur.lotteryBetCount,
      0
    ),
    chessBetCount: mockData.reduce((acc, cur) => acc + cur.chessBetCount, 0),
    fishBetCount: mockData.reduce((acc, cur) => acc + cur.fishBetCount, 0),

    // 金額合計
    liveValidBet: mockData.reduce((acc, cur) => acc + cur.liveValidBet, 0),
    slotValidBet: mockData.reduce((acc, cur) => acc + cur.slotValidBet, 0),
    sportValidBet: mockData.reduce((acc, cur) => acc + cur.sportValidBet, 0),
    lotteryValidBet: mockData.reduce(
      (acc, cur) => acc + cur.lotteryValidBet,
      0
    ),
    chessValidBet: mockData.reduce((acc, cur) => acc + cur.chessValidBet, 0),
    fishValidBet: mockData.reduce((acc, cur) => acc + cur.fishValidBet, 0),
    totalValidBet: mockData.reduce((acc, cur) => acc + cur.totalValidBet, 0),

    winAmount: mockData.reduce((acc, cur) => acc + cur.winAmount, 0),
    lossAmount: mockData.reduce((acc, cur) => acc + cur.lossAmount, 0),
    accountBalance: mockData.reduce((acc, cur) => acc + cur.accountBalance, 0),
    gameBalance: mockData.reduce((acc, cur) => acc + cur.gameBalance, 0),
  }

  const columns: ColumnsType<BetTypeDataType> = [
    //
    // 左側固定欄位
    //
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
          render: (text) => {
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

    //
    // 下注筆數總計
    //
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
          render: (v, r) => renderLink(v, '下注筆數', r),
        },
      ],
    },

    //
    // 第一層：遊戲有效投注總計
    //
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
        //
        // 第二層：唯一的有效投注金額跨欄
        //
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

    //
    // ======================
    // ⭐ 右側四大欄位（你缺掉的）
    // ======================
    //
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

  return (
    <>
      <div className="mb-4 border-l-4 border-teal-500 pl-2 text-lg font-bold text-gray-700">
        下注類別列表
      </div>
      <Table
        columns={columns}
        dataSource={mockData}
        scroll={{ x: 2600 }} // 欄位變多了，加寬捲動範圍
        pagination={{
          position: ['bottomLeft'],
          total: mockData.length,
          showTotal: (total) => `總計 ${total} 筆資料`,
          defaultPageSize: 20,
          className: 'p-4',
        }}
        bordered
        size="middle"
        rowClassName="hover:bg-blue-50 transition-colors"
      />
    </>
  )
}
