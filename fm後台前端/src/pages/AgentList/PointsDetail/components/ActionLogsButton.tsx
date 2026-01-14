import { Button } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { PointsRecord } from '../types'

export default function ActionLogsButton({
  record,
  onClick,
}: {
  record: PointsRecord
  onClick: (r: PointsRecord) => void
}) {
  return (
    <Button
      type="text"
      icon={<FileTextOutlined className="text-xl text-black" />}
      onClick={() => onClick(record)}
    />
  )
}
