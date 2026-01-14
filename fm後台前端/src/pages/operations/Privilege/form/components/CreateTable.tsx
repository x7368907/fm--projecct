import { Table, Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { DataType } from '../../types'
import { renderInput, createEditGroup } from './columnsHelper'

interface CreateTableProps {
  dataSource: DataType[]
  mode: 'create' | 'edit'
  onValueChange: (val: any, key: string, field: string) => void
  onDeleteRow: (key: string) => void
}

export default function CreateTable({
  dataSource,
  mode,
  onValueChange,
  onDeleteRow,
}: CreateTableProps) {
  const columns: ColumnsType<DataType> = [
    {
      title: '編號',
      dataIndex: 'no',
      width: 60,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '特權類型',
      dataIndex: 'type',
      width: 140,
      align: 'center',
      fixed: 'left',
      render: (v, r) => renderInput(v, r, 'type', onValueChange),
    },
    {
      title: '存款要求',
      dataIndex: 'depositReq',
      width: 100,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'depositReq', onValueChange),
    },
    {
      title: '有效投注(保級)',
      dataIndex: 'validBet',
      width: 140,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'validBet', onValueChange),
    },
    {
      title: '有效投注(升級)',
      dataIndex: 'validBetUpgrade',
      width: 140,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'validBetUpgrade', onValueChange),
    },
    {
      title: '升級紅利',
      dataIndex: 'upgradeBonus',
      width: 100,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'upgradeBonus', onValueChange),
    },
    {
      title: '儲值回饋金(%)',
      dataIndex: 'rebateRatio',
      width: 120,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'rebateRatio', onValueChange),
    },
    {
      title: '生日禮金',
      dataIndex: 'birthdayBonus',
      width: 100,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'birthdayBonus', onValueChange),
    },
    {
      title: '每日託售次數',
      dataIndex: 'dailyWithdrawCount',
      width: 110,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'dailyWithdrawCount', onValueChange),
    },
    {
      title: '每日託售額度',
      dataIndex: 'dailyWithdrawLimit',
      width: 120,
      align: 'center',
      render: (v, r) => renderInput(v, r, 'dailyWithdrawLimit', onValueChange),
    },

    // 返水編輯群組
    createEditGroup('真人返水(%)', 'live', onValueChange),
    createEditGroup('電子返水(%)', 'elec', onValueChange),
    createEditGroup('體育返水(%)', 'sport', onValueChange),
    createEditGroup('彩票返水(%)', 'lottery', onValueChange),
    createEditGroup('棋牌返水(%)', 'card', onValueChange),
    createEditGroup('捕魚返水(%)', 'fish', onValueChange),
  ]

  // 只有在 Create 模式才顯示刪除欄位
  if (mode === 'create') {
    columns.push({
      title: '刪除',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="確定刪除此列？"
          onConfirm={() => onDeleteRow(record.key)}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined className="text-lg" />}
          />
        </Popconfirm>
      ),
    })
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      size="small"
      scroll={{ x: 2500 }}
      pagination={false}
      rowClassName="align-middle"
    />
  )
}
