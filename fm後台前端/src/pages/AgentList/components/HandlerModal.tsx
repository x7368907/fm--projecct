import { Modal, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// 1. 加上 export，讓父層也能使用這個型別
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
  logs: HandlerLogData[] // 2. 新增：接收外部傳入的資料
}

export default function HandlerModal({
  open,
  onCancel,
  logs,
}: HandlerModalProps) {
  const columns: ColumnsType<HandlerLogData> = [
    {
      title: '修改時間',
      dataIndex: 'time',
      key: 'time',
      width: 180,
    },
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
    {
      title: '異動資料',
      dataIndex: 'details',
      key: 'details',
    },
  ]

  return (
    <Modal
      title={<span className="text-lg font-bold">經手人</span>}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={900}
      centered
    >
      <Table
        columns={columns}
        // 3. 這裡改用 props 傳進來的 logs
        dataSource={logs}
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
