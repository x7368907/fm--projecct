import React from 'react'
import { Input, Button, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { MemberData } from '../../types'
import { MOCK_MEMBERS } from '../../utils/fakeData'

interface MemberTableAreaProps {
  selectedMemberKeys: React.Key[]
  onChange: (keys: React.Key[]) => void
}

export default function MemberTableArea({
  selectedMemberKeys,
  onChange,
}: MemberTableAreaProps) {
  const memberColumns: ColumnsType<MemberData> = [
    { title: '標籤', dataIndex: 'tag', width: 100 },
    { title: '會員帳號', dataIndex: 'account', width: 120 },
    { title: '會員姓名', dataIndex: 'name', width: 100 },
    { title: 'VIP等級', dataIndex: 'vip', width: 120 },
    {
      title: '狀態',
      dataIndex: 'status',
      width: 120,
      render: (text) => (
        <div className="whitespace-pre-wrap text-xs">
          {text.includes('停用') ? (
            <div className="flex flex-col">
              <span>啟用</span>
              <span className="text-red-500">(停用託售)</span>
            </div>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: '錢包餘額',
      dataIndex: 'wallet',
      align: 'right',
      width: 120,
      render: (v) => v.toLocaleString(),
    },
    {
      title: '遊戲錢包餘額',
      dataIndex: 'gameBalance',
      align: 'right',
      width: 120,
      render: (v) => v.toLocaleString(),
    },
  ]

  return (
    <div className="bg-white p-2">
      <div className="mb-2 flex items-center gap-2">
        <Input
          placeholder="請輸入會員名稱"
          className="w-64"
          suffix={<SearchOutlined />}
        />
        <Button size="small" type="primary" ghost>
          清空
        </Button>
        <span className="ml-2 text-sm text-gray-500">
          (已選 {selectedMemberKeys.length}/{MOCK_MEMBERS.length})
        </span>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys: selectedMemberKeys,
          onChange: onChange,
        }}
        columns={memberColumns}
        dataSource={MOCK_MEMBERS}
        pagination={false}
        size="small"
        rowKey="key"
        scroll={{ y: 240 }}
        bordered={false}
      />
    </div>
  )
}
