import React from 'react'
import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 定義資料介面
export interface BetDetailItem {
  key: string
  memberName: string
  gameType: string
  validBet: number
  winAmount: number
  lossAmount: number
}

// 模擬資料 (實際專案可能由 Props 傳入 data)
const mockDetailData: BetDetailItem[] = [
  {
    key: '1',
    memberName: '馬佩琳',
    gameType: '真人',
    validBet: 10000,
    winAmount: 0,
    lossAmount: 10000,
  },
  {
    key: '2',
    memberName: '馬佩琳',
    gameType: '電子',
    validBet: 10000,
    winAmount: 0,
    lossAmount: 10000,
  },
  {
    key: '3',
    memberName: '林哲賢',
    gameType: '電子',
    validBet: 15000,
    winAmount: 0,
    lossAmount: 15000,
  },
  {
    key: '4',
    memberName: '黃廷宇',
    gameType: '電子',
    validBet: 15000,
    winAmount: 0,
    lossAmount: 15000,
  },
]

interface BetDetailModalProps {
  open: boolean
  onCancel: () => void
  type: 'bet' | 'loss'
}

const BetDetailModal: React.FC<BetDetailModalProps> = ({
  open,
  onCancel,
  type,
}) => {
  const titleText = type === 'bet' ? '會員投注總金額' : '會員虧損總金額'

  const columns: ColumnsType<BetDetailItem> = [
    { title: '會員姓名', dataIndex: 'memberName', align: 'center' },
    { title: '遊戲類型', dataIndex: 'gameType', align: 'center' },
    {
      title: '有效投注金額',
      dataIndex: 'validBet',
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
    {
      title: '中獎金額',
      dataIndex: 'winAmount',
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
    {
      title: '虧損金額',
      dataIndex: 'lossAmount',
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
  ]

  return (
    <Modal
      title={
        <div className="inline-block rounded border border-gray-600 px-3 py-1 text-sm text-gray-700">
          {titleText}
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
    >
      <Table
        columns={columns}
        dataSource={mockDetailData}
        pagination={false}
        className="mt-4"
        summary={(pageData) => {
          let totalValidBet = 0
          let totalLoss = 0
          pageData.forEach(({ validBet, lossAmount }) => {
            totalValidBet += validBet
            totalLoss += lossAmount
          })
          return (
            <Table.Summary.Row className="bg-white font-bold text-gray-700">
              <Table.Summary.Cell index={0} colSpan={2} />
              <Table.Summary.Cell index={2} align="right">
                <div className="border-t pt-2">
                  {totalValidBet.toLocaleString()}
                </div>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} />
              <Table.Summary.Cell index={4} align="right">
                <div className="border-t pt-2">
                  {totalLoss.toLocaleString()}
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    </Modal>
  )
}

export default BetDetailModal
