import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { BetDetailType } from '../../types'

interface Props {
  open: boolean
  onCancel: () => void
  data: BetDetailType[]
}

export default function BetDetailModal({ open, onCancel, data }: Props) {
  const columns: ColumnsType<BetDetailType> = [
    {
      title: '玩家名稱',
      dataIndex: 'playerName',
      key: 'playerName',
      align: 'center',
    },
    {
      title: '有效投注金額',
      dataIndex: 'validBet',
      key: 'validBet',
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '中獎金額',
      dataIndex: 'winAmount',
      key: 'winAmount',
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '虧損金額',
      dataIndex: 'lossAmount',
      key: 'lossAmount',
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
  ]

  return (
    <Modal
      title={
        <div className="inline-block rounded border border-gray-400 px-3 py-1 text-sm text-gray-700">
          下注筆數
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
        bordered={false}
        className="mt-4"
        summary={(pageData) => {
          let totalLoss = 0
          pageData.forEach(({ lossAmount }) => {
            totalLoss += lossAmount
          })
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3} />
              <Table.Summary.Cell index={1} align="center">
                <span className="font-bold text-gray-700">
                  {totalLoss.toLocaleString()}
                </span>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    </Modal>
  )
}
