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
          autoSize={{ minRows: 2, maxRows: 4 }}
          className="rounded-md border border-gray-300 bg-white text-xs focus:border-blue-400 focus:shadow-sm"
        />
        <div className="flex justify-end gap-2">
          <Button
            size="small"
            onClick={handleCancel}
            className="h-6 rounded border-red-300 bg-white text-xs text-red-400 hover:border-red-400 hover:text-red-500"
          >
            取消
          </Button>
          <Button
            size="small"
            onClick={handleSave}
            className="h-6 rounded border-none bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white"
          >
            完成
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {/* 檢視模式：灰色背景 bg-gray-200 */}
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md bg-gray-200 p-2 text-xs text-gray-700">
        {value || <span className="text-gray-400">尚無備註...</span>}
      </div>
      <div>
        <Button
          size="small"
          onClick={handleEdit}
          className="h-6 rounded border-gray-400 bg-white px-3 text-xs text-gray-700 hover:border-teal-600 hover:text-teal-600"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}
