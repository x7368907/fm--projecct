import React from 'react'
import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export interface ProfitDetailItem {
  key: string
  memberName: string
  gameType: string
  baseAmount: number
  rate: number
  finalAmount: number
}

const mockProfitData: ProfitDetailItem[] = [
  {
    key: '1',
    memberName: '馬佩琳',
    gameType: '真人',
    baseAmount: 10000,
    rate: 90,
    finalAmount: 54,
  },
  {
    key: '2',
    memberName: '馬佩琳',
    gameType: '電子',
    baseAmount: 10000,
    rate: 90,
    finalAmount: 54,
  },
  {
    key: '3',
    memberName: '林哲賢',
    gameType: '電子',
    baseAmount: 15000,
    rate: 90,
    finalAmount: 81,
  },
  {
    key: '4',
    memberName: '黃廷宇',
    gameType: '電子',
    baseAmount: 15000,
    rate: 90,
    finalAmount: 81,
  },
]

interface ProfitDetailModalProps {
  open: boolean
  onCancel: () => void
  profitMode: string
}

const ProfitDetailModal: React.FC<ProfitDetailModalProps> = ({
  open,
  onCancel,
  profitMode,
}) => {
  // 判斷分潤模式
  const isShareMode = profitMode === '佔成制'
  const baseAmountTitle = isShareMode ? '會員虧損金額' : '有效投注金額'
  const rateTitle = isShareMode ? '代理佔成(%)' : '代理反水(%)'

  const columns: ColumnsType<ProfitDetailItem> = [
    { title: '會員姓名', dataIndex: 'memberName', align: 'center' },
    { title: '遊戲類型', dataIndex: 'gameType', align: 'center' },
    {
      title: baseAmountTitle,
      dataIndex: 'baseAmount',
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
    {
      title: rateTitle,
      dataIndex: 'rate',
      align: 'center',
    },
    {
      title: '金額',
      dataIndex: 'finalAmount',
      align: 'right',
      render: (val) => val.toLocaleString(),
    },
  ]

  return (
    <Modal
      title={
        <div className="inline-block rounded border border-gray-600 px-3 py-1 text-sm text-gray-700">
          代理獲利
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
        dataSource={mockProfitData}
        pagination={false}
        className="mt-4"
        summary={(pageData) => {
          let totalFinal = 0
          pageData.forEach(({ finalAmount }) => {
            totalFinal += finalAmount
          })
          return (
            <Table.Summary.Row className="bg-white font-bold text-gray-700">
              <Table.Summary.Cell index={0} colSpan={4} />
              <Table.Summary.Cell index={4} align="right">
                <div className="border-t pt-2">
                  {totalFinal.toLocaleString()}
                </div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    </Modal>
  )
}

export default ProfitDetailModal
