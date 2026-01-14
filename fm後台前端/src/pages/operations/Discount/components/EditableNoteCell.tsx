import { useState } from 'react'
import { Input, Button } from 'antd'

const { TextArea } = Input

interface EditableNoteCellProps {
  value: string
  onSave: (newValue: string) => void
}

export default function EditableNoteCell({
  value,
  onSave,
}: EditableNoteCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

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
          autoSize={{ minRows: 2, maxRows: 4 }}
          className="rounded-md border border-gray-300 bg-white text-xs focus:border-teal-400 focus:shadow-sm"
        />
        <div className="flex justify-end gap-2">
          <Button size="small" onClick={() => setIsEditing(false)}>
            取消
          </Button>
          <Button
            size="small"
            className="border-none bg-green-500 text-white hover:bg-green-600"
            onClick={handleSave}
          >
            完成
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-100 p-2 text-xs text-gray-700">
        {value || <span className="text-gray-400">尚無備註...</span>}
      </div>
      <div>
        <Button
          size="small"
          onClick={() => {
            setTempValue(value)
            setIsEditing(true)
          }}
          className="h-6 text-xs"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}
