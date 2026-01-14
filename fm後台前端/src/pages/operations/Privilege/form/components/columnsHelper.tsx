import { Input } from 'antd'
import type { DataType } from '../../types'

// Input 渲染輔助
export const renderInput = (
  text: any,
  record: DataType,
  dataIndex: string,
  onChange: (val: any, key: string, field: string) => void
) => (
  <Input
    value={text}
    onChange={(e) => onChange(e.target.value, record.key, dataIndex)}
    className="text-center"
    style={{ padding: '4px 2px', fontSize: '13px' }}
  />
)

// 快速產生編輯群組
export const createEditGroup = (
  title: string,
  prefix: string,
  onChange: (val: any, key: string, field: string) => void
) => ({
  title,
  children: [
    {
      title: <span style={{ color: '#faad14' }}>時</span>,
      dataIndex: `${prefix}_h`,
      width: 50,
      align: 'center' as const,
      render: (v: any, r: DataType) =>
        renderInput(v, r, `${prefix}_h`, onChange),
    },
    {
      title: <span style={{ color: '#1890ff' }}>日</span>,
      dataIndex: `${prefix}_d`,
      width: 50,
      align: 'center' as const,
      render: (v: any, r: DataType) =>
        renderInput(v, r, `${prefix}_d`, onChange),
    },
    {
      title: '週',
      dataIndex: `${prefix}_w`,
      width: 50,
      align: 'center' as const,
      render: (v: any, r: DataType) =>
        renderInput(v, r, `${prefix}_w`, onChange),
    },
  ],
})
