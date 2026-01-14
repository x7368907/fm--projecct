import { Button } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'

interface Props {
  onClick: () => void
}

export default function ActionLogsButton({ onClick }: Props) {
  return (
    <Button
      type="text"
      icon={<FileTextOutlined className="text-2xl text-black" />}
      onClick={onClick}
    />
  )
}
