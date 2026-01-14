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
      dataIndex: 'system',
      width: 100,
      align: 'center',
      render: (text) => (
        <Tag color={text === '佔成制' ? 'blue' : 'cyan'}>{text}</Tag>
      ),
    },
    {
      title: '分潤名稱',
      dataIndex: 'name',
      width: 250,
      align: 'center',
      ellipsis: true,
    },
    { title: '代理層級', dataIndex: 'agentLevel', align: 'center', width: 100 },
    { title: '代理名稱', dataIndex: 'agentName', align: 'center', width: 100 },
    {
      title: '佔成比例(%)',
      dataIndex: 'shareRatio',
      align: 'center',
      width: 140,
    },
    {
      title: '代理反水比例 (%)',
      children: [
        { title: '真人', dataIndex: 'rebateLive', align: 'center', width: 80 },
        { title: '電子', dataIndex: 'rebateElec', align: 'center', width: 80 },
        { title: '體育', dataIndex: 'rebateSport', align: 'center', width: 80 },
        {
          title: '彩票',
          dataIndex: 'rebateLottery',
          align: 'center',
          width: 80,
        },
        { title: '棋牌', dataIndex: 'rebateChess', align: 'center', width: 80 },
        { title: '捕魚', dataIndex: 'rebateFish', align: 'center', width: 80 },
      ],
    },
    {
      title: '代理分潤結算',
      dataIndex: 'settlement',
      align: 'center',
      width: 150,
      render: (text) => (
        <div className="flex flex-col items-center">
          <span className="font-medium">{text}</span>
          <span className="scale-90 text-xs text-gray-400">
            (每週日-23:59:59)
          </span>
        </div>
      ),
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
