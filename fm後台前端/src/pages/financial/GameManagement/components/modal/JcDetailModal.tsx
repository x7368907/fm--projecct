import { Modal, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { JcDetailType } from '../../types'

interface Props {
  open: boolean
  onCancel: () => void
  data: JcDetailType[]
}

export default function JcDetailModal({ open, onCancel, data }: Props) {
  const columns: ColumnsType<JcDetailType> = [
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
      title: '彩金貢獻值(%)',
      dataIndex: 'jcRate',
      key: 'jcRate',
      align: 'center',
      render: (v) => v,
    },
    {
      title: '彩金貢獻值(JC)',
      dataIndex: 'jcAmount',
      key: 'jcAmount',
      align: 'center',
      render: (v) => v.toLocaleString(),
    },
  ]

  return (
    <Modal
      title={
        <div className="inline-block rounded border border-gray-400 px-3 py-1 text-sm text-gray-700">
          彩金貢獻值(JC)
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
          let totalJc = 0
          pageData.forEach(({ jcAmount }) => {
            totalJc += jcAmount
          })
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3} />
              <Table.Summary.Cell index={1} align="center">
                <span className="font-bold text-gray-700">
                  {totalJc.toLocaleString()}
                </span>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    </Modal>
  )
}
