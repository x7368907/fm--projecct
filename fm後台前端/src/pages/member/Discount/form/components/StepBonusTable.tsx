import React from 'react'
import { Input, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { BonusItem } from '../../types'
import { BONUS_DATA } from '../../utils/fakeData'

interface StepBonusTableProps {
  selectedRowKeys: React.Key[]
  onChange: (keys: React.Key[]) => void
}

export default function StepBonusTable({
  selectedRowKeys,
  onChange,
}: StepBonusTableProps) {
  const columns: ColumnsType<BonusItem> = [
    { title: '優惠名稱', dataIndex: 'name', key: 'name', width: 150 },
    { title: '獎勵點數', dataIndex: 'points', key: 'points', width: 100 },
    { title: '獎金申請方式', dataIndex: 'method', key: 'method', width: 150 },
    {
      title: '獎金發放方式',
      dataIndex: 'distribute',
      key: 'distribute',
      width: 120,
    },
    { title: '必須流水', dataIndex: 'turnover', key: 'turnover', width: 100 },
    { title: '備註', dataIndex: 'remark', key: 'remark' },
  ]

  return (
    <div className="flex flex-1 flex-col border-b border-gray-400">
      <div className="border-b border-gray-300 bg-gray-200 p-2 text-left text-xs font-bold text-gray-600">
        [Step2] 選擇優惠項目
      </div>
      <div className="p-4">
        <Input
          placeholder="請輸入優惠名稱"
          className="mb-3 w-52"
          size="small"
        />
        <Table
          rowKey="key"
          rowSelection={{
            type: 'radio',
            selectedRowKeys,
            onChange: (keys) => onChange(keys),
          }}
          columns={columns}
          dataSource={BONUS_DATA}
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 200 }}
        />
      </div>
    </div>
  )
}
