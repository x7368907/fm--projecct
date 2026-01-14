import React from 'react'
import { Input, Table, Button, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { MemberItem } from '../../types'
import { MEMBER_DATA } from '../../utils/fakeData'

interface StepMemberTableProps {
  selectedRowKeys: React.Key[]
  onChange: (keys: React.Key[]) => void
}

export default function StepMemberTable({
  selectedRowKeys,
  onChange,
}: StepMemberTableProps) {
  const columns: ColumnsType<MemberItem> = [
    { title: '代理級別', dataIndex: 'level', key: 'level' },
    { title: '代理名稱', dataIndex: 'agent', key: 'agent' },
    { title: '會員帳號', dataIndex: 'account', key: 'account' },
    { title: '會員名稱', dataIndex: 'name', key: 'name' },
    { title: 'VIP等級', dataIndex: 'vip', key: 'vip' },
    { title: '狀態', dataIndex: 'status', key: 'status' },
    { title: '帳戶餘額', dataIndex: 'balance', key: 'balance' },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-gray-300 bg-gray-200 p-2 text-left text-xs font-bold text-gray-600">
        [Step3] 選擇會員
      </div>
      <div className="p-4">
        <Space className="mb-3">
          <Input placeholder="請輸入會員名稱" className="w-52" size="small" />
          <Button size="small">檢視已選 ({selectedRowKeys.length})</Button>
        </Space>
        <Table
          rowKey="key"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (keys) => onChange(keys),
          }}
          columns={columns}
          dataSource={MEMBER_DATA}
          pagination={false}
          size="small"
          bordered
          locale={{ emptyText: '暫無數據' }}
          scroll={{ y: 200 }}
        />
      </div>
    </div>
  )
}
