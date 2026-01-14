import React, { useState } from 'react'
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import DetailModal, {
  type DetailDataType,
} from '../../../../components/DetailModal'

interface AgentTableProps {
  searchParams?: any
}

interface DataType {
  key: string
  agentLevel: string
  agentName: string
  commissionMode: string
  memberCount: number
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
  commission: number
  gameFee: number
}

const mockData: DataType[] = [
  {
    key: '1',
    agentLevel: '1 / 4 (8)',
    agentName: 'FMCA (金流/成數代理-主站)',
    commissionMode: '佔成制',
    memberCount: 56,
    betCount: 48,
    betAmount: 10000,
    validBetAmount: 10000,
    winAmount: 12279,
    lossAmount: -1101,
    deposit: 25000,
    withdraw: 10000,
    rebate: 6340860, // 模擬有數據
    discount: 9690,
    cost: 800,
    commission: 50,
    gameFee: 50,
  },
  {
    key: '2',
    agentLevel: '1 / 7 (51)',
    agentName: 'XOUT (金流/成數代理-外單位)',
    commissionMode: '尿水制',
    memberCount: 9,
    betCount: 783602,
    betAmount: 87775293,
    validBetAmount: 81346514,
    winAmount: 1354515,
    lossAmount: -79991999,
    deposit: 162541.8,
    withdraw: 244039542,
    rebate: 244039542,
    discount: 0,
    cost: 94800,
    commission: 23652,
    gameFee: 23652,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AgentTable({ searchParams }: AgentTableProps) {
  const [modalState, setModalState] = useState({
    open: false,
    title: '',
    subTitle: '',
    data: [] as DetailDataType[],
    mode: 'agent' as 'agent' | 'member' | 'member-detail',
  })

  // 核心邏輯：根據欄位決定彈窗模式與假資料
  const handleOpenDetail = (
    title: string,
    field: keyof DataType,
    record: DataType
  ) => {
    let mode: 'agent' | 'member' | 'member-detail' = 'agent'
    let mockDetails: DetailDataType[] = []

    // 隨機產生器
    const rand = (max: number) => Math.floor(Math.random() * max)

    // 1. 判斷模式
    if (['winAmount', 'lossAmount'].includes(field)) {
      // 輸贏金額 -> 會員詳細模式 (5欄位)
      mode = 'member-detail'
      mockDetails = [
        {
          key: '1',
          label: '馬佩琳',
          value: rand(10000),
          betCount: 6,
          betAmount: 600,
          validBetAmount: 600,
        },
        {
          key: '2',
          label: '林哲賢',
          value: rand(50000),
          betCount: 7,
          betAmount: 1000,
          validBetAmount: 1000,
        },
        {
          key: '3',
          label: '黃廷宇',
          value: rand(2000),
          betCount: 1,
          betAmount: 50,
          validBetAmount: 50,
        },
      ]
    } else if (
      ['deposit', 'withdraw', 'rebate', 'discount', 'cost', 'gameFee'].includes(
        field
      )
    ) {
      // 會員相關金額 -> 會員簡單模式 (2欄位: 姓名+金額)
      mode = 'member'
      mockDetails = [
        { key: '1', label: '馬佩琳', value: rand(20000) },
        { key: '2', label: '林哲賢', value: rand(50000) },
        { key: '3', label: '潘彥宇', value: rand(10000) },
      ]
    } else {
      // 其他 (會員數、下注筆數、代理分潤、下注金額) -> 下級代理列表
      mode = 'agent'
      mockDetails = [
        { key: '1', label: '1級總代理', value: rand(500) },
        { key: '2', label: '2級代理', value: rand(1000) },
        { key: '3', label: '3級代理', value: rand(200) },
      ]
    }

    setModalState({
      open: true,
      title: title,
      subTitle: record.agentName,
      data: mockDetails,
      mode: mode,
    })
  }

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, open: false }))
  }

  const renderMoney = (
    value: number,
    colorType: 'red' | 'green' | 'normal' = 'normal'
  ) => {
    let colorClass = 'text-gray-700'
    if (colorType === 'red') colorClass = 'text-red-500'
    if (colorType === 'green') colorClass = 'text-green-600'
    if (value < 0) colorClass = 'text-red-500' // 負數強制紅
    return (
      <span className={`${colorClass} font-medium`}>
        {value.toLocaleString()}
      </span>
    )
  }

  const renderLink = (
    val: number,
    title: string,
    field: keyof DataType,
    record: DataType,
    colorClass: string = 'text-blue-500'
  ) => (
    <a
      className={`${colorClass} cursor-pointer font-medium underline hover:opacity-80`}
      onClick={() => handleOpenDetail(title, field, record)}
    >
      {val.toLocaleString()}
    </a>
  )

  const totalData = {
    memberCount: mockData.reduce((acc, cur) => acc + cur.memberCount, 0),
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
    commission: mockData.reduce((acc, cur) => acc + cur.commission, 0),
    gameFee: mockData.reduce((acc, cur) => acc + cur.gameFee, 0),
  }

  const columns: ColumnsType<DataType> = [
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
          render: (text) => (
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
          render: (text) => (
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
          render: (val) => renderMoney(val), // 截圖顯示為純文字
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
          // 根據截圖 3.15.11，中獎金額有詳細彈窗
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
          // 根據截圖 3.15.11，虧損金額有詳細彈窗
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

  return (
    <>
      <div className="mb-4 border-l-4 border-teal-500 pl-2 text-lg font-bold text-gray-700">
        1級總代理 (代理視角)
      </div>
      <Table
        columns={columns}
        dataSource={mockData}
        scroll={{ x: 2500 }}
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
