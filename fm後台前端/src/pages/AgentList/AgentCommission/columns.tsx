import { Tag, Dropdown, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { CommissionData } from './types'
import {
  SYSTEM_TYPE_LABEL,
  SETTLEMENT_LABEL,
  SETTLEMENT_HINT,
  AGENT_LEVEL_LABEL,
  mapLabel,
} from './mappings'
export const getColumns = (opts: {
  onEdit: (record: CommissionData) => void
  onLogs: (record: CommissionData) => void
}): ColumnsType<CommissionData> => {
  const getActions = (record: CommissionData): MenuProps['items'] => [
    {
      key: 'edit',
      label: '編輯',
      icon: <EditOutlined />,
      onClick: () => opts.onEdit(record),
    },
    {
      key: 'logs',
      label: '經手人',
      icon: <FileTextOutlined />,
      onClick: () => opts.onLogs(record),
    },
    {
      key: 'delete',
      danger: true,
      label: '刪除',
      icon: <DeleteOutlined />,
      onClick: () => console.log('Delete', record.key),
    },
  ]

  return [
    {
      title: '分潤制度',
      dataIndex: 'system_type',
      width: 100,
      align: 'center',
      render: (value: string) => {
        const label = mapLabel(SYSTEM_TYPE_LABEL, value)
        const isShare = value === 'share' || label === '佔成制'
        return <Tag color={isShare ? 'blue' : 'cyan'}>{label}</Tag>
      },
    },
    {
      title: '分潤名稱',
      dataIndex: 'name',
      width: 250,
      align: 'center',
      ellipsis: true,
    },
    {
      title: '代理層級',
      dataIndex: 'agent_level',
      align: 'center',
      width: 100,
      render: (value: string) => mapLabel(AGENT_LEVEL_LABEL, value),
    },
    { title: '代理名稱', dataIndex: 'agent_name', align: 'center', width: 100 },
    {
      title: '佔成比例(%)',
      dataIndex: 'share_ratio',
      align: 'center',
      width: 140,
    },
    {
      title: '代理反水比例 (%)',
      children: [
        { title: '真人', dataIndex: 'rebate_live', align: 'center', width: 80 },
        { title: '電子', dataIndex: 'rebate_elec', align: 'center', width: 80 },
        {
          title: '體育',
          dataIndex: 'rebate_sport',
          align: 'center',
          width: 80,
        },
        {
          title: '彩票',
          dataIndex: 'rebate_lottery',
          align: 'center',
          width: 80,
        },
        {
          title: '棋牌',
          dataIndex: 'rebate_chess',
          align: 'center',
          width: 80,
        },
        { title: '捕魚', dataIndex: 'rebate_fish', align: 'center', width: 80 },
      ],
    },
    {
      title: '代理分潤結算',
      dataIndex: 'settlement',
      align: 'center',
      width: 150,
      render: (value: string) => {
        const label = mapLabel(SETTLEMENT_LABEL, value)
        const hint = mapLabel(SETTLEMENT_HINT, value)
        return (
          <div className="flex flex-col items-center">
            <span className="font-medium">{label}</span>
            <span className="scale-90 text-xs text-gray-400">{hint}</span>
          </div>
        )
      },
    },
    {
      title: '管理',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Dropdown menu={{ items: getActions(record) }} trigger={['click']}>
          <Button size="small">
            管理 <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ]
}
