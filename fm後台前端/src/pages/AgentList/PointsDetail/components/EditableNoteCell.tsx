import { useState } from 'react'
import { Button, Input } from 'antd'

const { TextArea } = Input

export default function EditableNoteCell({
  value,
  onSave,
}: {
  value: string
  onSave: (val: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [temp, setTemp] = useState(value)

  // 開始編輯時，確保 temp 是最新的 value
  const handleEdit = () => {
    setTemp(value)
    setEditing(true)
  }

  // 取消時，還原 temp 並關閉
  const handleCancel = () => {
    setTemp(value)
    setEditing(false)
  }

  // 儲存時，呼叫 onSave 並關閉
  const handleSave = () => {
    onSave(temp)
    setEditing(false)
  }

  return editing ? (
    // === 編輯模式 ===
    <div className="flex flex-col gap-2">
      <TextArea
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
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
          type="primary"
          onClick={handleSave}
          className="h-6 rounded border-none bg-green-500 text-xs text-white hover:bg-green-600 hover:text-white"
        >
          完成
        </Button>
      </div>
    </div>
  ) : (
    // === 顯示模式 ===
    <div className="flex flex-col gap-1">
      {/* 唯讀區塊：灰色底 + 圓角 */}
      <div className="min-h-[40px] whitespace-pre-wrap rounded-md bg-gray-200 p-2 text-xs text-gray-700">
        {value || <span className="text-gray-400">尚無備註...</span>}
      </div>
      <div>
        <Button
          size="small"
          onClick={handleEdit}
          // 樣式：白底灰邊，Hover 時變 Teal 色
          className="h-6 rounded border-gray-400 bg-white px-3 text-xs text-gray-700 hover:border-teal-600 hover:text-teal-600"
        >
          編輯
        </Button>
      </div>
    </div>
  )
}
