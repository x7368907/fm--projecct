import { useState } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import DetailModal, {
  type DetailDataType,
} from '../../../../components/DetailModal'

interface MemberTableProps {
  searchParams?: any
}

// 資料型別
interface MemberDataType {
  key: string
  agentLevel: string
  agentName: string
  memberName: string
  vipLevel: string
  betCount: number
  betAmount: number
  validBetAmount: number
  winAmount: number
  lossAmount: number
  deposit: number
  withdraw: number
  rebate: number
  discount: number
  cost: number
  gameFee: number
}

const mockData: MemberDataType[] = [
  {
    key: '1',
    agentLevel: '1 / 4 (8)',
    agentName: 'FMCA (金流/成數代理-主站)',
    memberName: '馬佩琳',
    vipLevel: 'VIP1-一般會員',
    betCount: 6,
    betAmount: 13380,
    validBetAmount: 13380,
    winAmount: 12279,
    lossAmount: 1101,
    deposit: 363504,
    withdraw: 6340860,
    rebate: 6340860,
    discount: 9690,
    cost: 600,
    gameFee: 363504,
  },
  {
    key: '2',
    agentLevel: '1 / 4 (8)',
    agentName: 'XOUT (金流/成數代理-外單位)',
    memberName: '林哲賢',
    vipLevel: 'VIP1-一般會員',
    betCount: 7,
    betAmount: 87775293,
    validBetAmount: 81346514,
    winAmount: 1354515,
    lossAmount: 79991999,
    deposit: 162541.8,
    withdraw: 244039542,
    rebate: 244039542,
    discount: 0,
    cost: 94800,
    gameFee: 162541.8,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MemberTable({ searchParams }: MemberTableProps) {
  // 1. 彈窗狀態管理
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    subTitle: '',
    data: [] as DetailDataType[],
    mode: 'agent' as any, // 暫時用 any 以容納多種 mode 字串
  })

  // 2. 隨機資料產生器 (Helper)
  const getRandomTime = () =>
    `2025-07-16 08:${Math.floor(Math.random() * 59)
      .toString()
      .padStart(2, '0')}:23`
  const rand = (max: number) => Math.floor(Math.random() * max)

  // 3. 處理點擊邏輯：根據欄位決定彈窗內容
  const handleOpenDetail = (
    title: string,
    field: keyof MemberDataType,
    record: MemberDataType
  ) => {
    let mode = 'agent'
    let mockDetails: DetailDataType[] = []

    // --- A. 注單相關 (下注、有效、中獎、虧損) ---
    if (
      [
        'betAmount',
        'validBetAmount',
        'winAmount',
        'lossAmount',
        'betCount',
      ].includes(field)
    ) {
      mode = 'member-bet'
      // 產生 5 筆假注單
      mockDetails = Array.from({ length: 5 }).map((_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        gameType: ['真人', '電子', '體育', '彩票'][rand(4)],
        vendor: ['DG', 'RSG', 'Super', 'MT'][rand(4)],
        betCount: 1,
        validBetAmount: 100 * (i + 1),
        value: field === 'lossAmount' ? -100 : 100 * (i + 1), // 根據欄位微調數值
      }))
    }
    // --- B. 返水 ---
    else if (field === 'rebate') {
      mode = 'member-rebate'
      mockDetails = Array.from({ length: 5 }).map((_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        gameType: ['真人', '電子'][rand(2)],
        vendor: ['DG', 'RSG'][rand(2)],
        validBetAmount: 1000 * (i + 1),
        rate: 0.4,
        value: 4 * (i + 1),
      }))
    }
    // --- C. 優惠 ---
    else if (field === 'discount') {
      mode = 'member-discount'
      mockDetails = [
        { key: '1', time: getRandomTime(), name: 'VIP2儲值回饋', value: 1888 },
        { key: '2', time: getRandomTime(), name: '代理紅包', value: 5000 },
      ]
    }
    // --- D. 營運成本 ---
    else if (field === 'cost') {
      mode = 'member-cost'
      mockDetails = [
        {
          key: '1',
          time: getRandomTime(),
          baseAmount: 10000,
          type: '儲值回饋金',
          rate: 1,
          value: 100,
        },
        {
          key: '2',
          time: getRandomTime(),
          baseAmount: 10000,
          type: '儲值手續費',
          rate: 2,
          value: 200,
        },
      ]
    }
    // --- E. 遊戲上繳 ---
    else if (field === 'gameFee') {
      mode = 'member-gamefee'
      mockDetails = [
        {
          key: '1',
          gameType: '真人',
          vendor: '歐博',
          baseAmount: 500,
          rate: 6,
          value: 30,
        },
        {
          key: '2',
          gameType: '電子',
          vendor: 'RSG',
          baseAmount: 300,
          rate: 10,
          value: 30,
        },
      ]
    }
    // --- F. 儲值/託售 ---
    else if (['deposit', 'withdraw'].includes(field)) {
      mode = 'member-transaction'
      mockDetails = Array.from({ length: 3 }).map((_, i) => ({
        key: `${i}`,
        time: getRandomTime(),
        value: field === 'deposit' ? 20000 : 10000,
      }))
    }

    setModalState({
      open: true,
      title: title,
      subTitle: `1/4 ${record.agentName}`, // 顯示代理路徑
      data: mockDetails,
      mode: mode,
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  // Helper: 產生連結
  const renderLink = (
    val: number,
    title: string,
    field: keyof MemberDataType,
    record: MemberDataType,
    colorClass: string = 'text-blue-500'
  ) => (
    <a
      className={`${colorClass} cursor-pointer font-medium underline hover:opacity-80`}
      onClick={() => handleOpenDetail(title, field, record)}
    >
      {val.toLocaleString()}
    </a>
  )

  // 合計資料
  const totalData = {
    betCount: mockData.reduce((acc, cur) => acc + cur.betCount, 0),
    betAmount: mockData.reduce((acc, cur) => acc + cur.betAmount, 0),
    validBetAmount: mockData.reduce((acc, cur) => acc + cur.validBetAmount, 0),
    winAmount: mockData.reduce((acc, cur) => acc + cur.winAmount, 0),
    lossAmount: mockData.reduce((acc, cur) => acc + cur.lossAmount, 0),
    deposit: mockData.reduce((acc, cur) => acc + cur.deposit, 0),
    withdraw: mockData.reduce((acc, cur) => acc + cur.withdraw, 0),
    rebate: mockData.reduce((acc, cur) => acc + cur.rebate, 0),
    discount: mockData.reduce((acc, cur) => acc + cur.discount, 0),
    cost: mockData.reduce((acc, cur) => acc + cur.cost, 0),
    gameFee: mockData.reduce((acc, cur) => acc + cur.gameFee, 0),
  }

  const columns: ColumnsType<MemberDataType> = [
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
          render: (text) => (
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
          // 讓筆數也可以點擊
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
            renderLink(val, '下注金額', 'betAmount', record, 'text-gray-700'), // 連結但保持灰色
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

  return (
    <>
      <div className="mb-4 border-l-4 border-teal-500 pl-2 text-lg font-bold text-gray-700">
        會員列表
      </div>
      <Table
        columns={columns}
        dataSource={mockData}
        scroll={{ x: 2600 }}
        pagination={{ pageSize: 20 }}
        bordered
        size="middle"
        rowClassName="hover:bg-blue-50 transition-colors"
      />
      <DetailModal
        open={modalState.open}
        onCancel={handleCloseModal}
        title={modalState.title}
        subTitle={modalState.subTitle}
        data={modalState.data}
        mode={modalState.mode}
      />
    </>
  )
}
