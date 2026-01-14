import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import {
  EditOutlined,
  FileTextOutlined,
  DownOutlined,
  GlobalOutlined,
  PayCircleOutlined,
} from '@ant-design/icons'
import type { DataType } from '../types'

export default function ActionDropdown({
  record,
  onEdit,
  onViewFrontend,
  onPoints,
  onLogs,
}: {
  record: DataType
  onEdit: (r: DataType) => void
  onViewFrontend: (r: DataType) => void
  onPoints: (r: DataType) => void
  onLogs: (r: DataType) => void
}) {
  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: '編輯',
      icon: <EditOutlined />,
      onClick: () => onEdit(record),
    },
    {
      key: 'view_frontend',
      label: '瀏覽前台',
      icon: <GlobalOutlined />,
      onClick: () => onViewFrontend(record),
    },
    {
      key: 'points',
      label: '點數加扣點',
      icon: <PayCircleOutlined />,
      onClick: () => onPoints(record),
    },
    {
      key: 'logs',
      label: '經手人',
      icon: <FileTextOutlined />,
      onClick: () => onLogs(record),
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button size="small">
        管理 <DownOutlined />
      </Button>
    </Dropdown>
  )
}
