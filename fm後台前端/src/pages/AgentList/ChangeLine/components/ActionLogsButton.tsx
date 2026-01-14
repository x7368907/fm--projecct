import { Button } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import type { ChangeLineDataType } from '../types'

export default function ActionLogsButton({
  record,
  onClick,
}: {
  record: ChangeLineDataType
  onClick: (r: ChangeLineDataType) => void
}) {
  return (
    <Button
      type="text"
      icon={<FileTextOutlined className="text-2xl text-black" />}
      onClick={() => onClick(record)}
    />
  )
}
