import { Modal, Table, Tag, Empty } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export interface HandlerLogData {
  key: string
  time: string
  handler: string
  status: string
  details: string
}

interface HandlerModalProps {
  open: boolean
  onCancel: () => void
  logs: HandlerLogData[]
  loading?: boolean
  planName?: string
}

export default function HandlerModal({
  open,
  onCancel,
  logs,
  loading = false,
}: HandlerModalProps) {
  const columns: ColumnsType<HandlerLogData> = [
    { title: '修改時間', dataIndex: 'time', key: 'time', width: 180 },
    {
      title: '經手人',
      dataIndex: 'handler',
      key: 'handler',
      width: 120,
      align: 'center',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: (text) => (
        <Tag
          color={text === '新增' ? 'green' : text === '刪除' ? 'red' : 'orange'}
        >
          {text}
        </Tag>
      ),
    },
    { title: '異動資料', dataIndex: 'details', key: 'details' },
  ]

  return (
    <Modal
      title={
        <div className="flex flex-col">
          <span className="text-lg font-bold">經手人</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={900}
      centered
    >
      <Table
        columns={columns}
        dataSource={logs}
        loading={loading}
        rowKey="key"
        locale={{ emptyText: <Empty description="目前沒有紀錄" /> }}
        pagination={{
          pageSize: 5,
          position: ['bottomLeft'],
          showTotal: (total) => `總計 ${total} 筆資料`,
        }}
        size="middle"
        className="mt-4 [&_.ant-table-pagination]:!justify-start"
        bordered
      />
    </Modal>
  )
}
