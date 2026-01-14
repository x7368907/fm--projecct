import { useState } from 'react'
import { Input, Button } from 'antd'

const { TextArea } = Input

interface Props {
  value: string
  onSave: (newValue: string) => void
}

export default function EditableNoteCell({ value, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleEdit = () => {
    setTempValue(value)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
  }

  const handleSave = () => {
    onSave(tempValue)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2">
        <TextArea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          autoSize={{ minRows: 2, maxRows: 3 }}
          className="rounded-md border border-gray-300 bg-white text-xs focus:border-blue-400 focus:shadow-sm"
        />
        <div className="flex justify-end gap-2">
          <Button
            size="small"
            onClick={handleCancel}
            className="h-6 text-xs text-red-400"
          >
            取消
          </Button>
          <Button
            size="small"
            onClick={handleSave}
            className="h-6 bg-green-500 text-xs text-white"
          >
            完成
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <TextArea
        value={value}
        readOnly
        autoSize={{ minRows: 2, maxRows: 3 }}
        className="resize-none rounded-md border-none bg-gray-200 text-xs"
      />
      <div>
        <Button
          size="small"
          onClick={handleEdit}
          className="h-6 text-xs text-gray-700"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}
