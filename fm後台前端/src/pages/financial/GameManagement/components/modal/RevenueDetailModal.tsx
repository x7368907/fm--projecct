import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { RevenueDetailType } from '../../types'

interface Props {
  open: boolean
  onCancel: () => void
  data: RevenueDetailType[]
}

export default function RevenueDetailModal({ open, onCancel, data }: Props) {
  const columns: ColumnsType<RevenueDetailType> = [
    {
      title: '遊戲商名稱',
      dataIndex: 'provider',
      key: 'provider',
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
      title: '遊戲上繳(%)',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
    },
    {
      title: 'JC+JP',
      dataIndex: 'jcJp',
      key: 'jcJp',
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
    {
      title: '遊戲上繳金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
  ]

  return (
    <Modal
      title={
        <div className="inline-block rounded border border-gray-400 px-3 py-1 text-sm text-gray-700">
          遊戲上繳金額
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
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
          let totalAmount = 0
          pageData.forEach(({ amount }) => {
            totalAmount += amount
          })
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4} />
              <Table.Summary.Cell index={1} align="center">
                <span className="font-bold text-gray-700">
                  {totalAmount.toLocaleString()}
                </span>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    </Modal>
  )
}
