import { Breadcrumb, Button } from 'antd'
import { PlusOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons'

import CreateTable from './components/CreateTable'
import { useCreateForm } from './hook/useCreateForm'
import type { DataType } from '../types'

interface PrivilegeCreateProps {
  onCancel: () => void
  onSave: () => void
  mode: 'create' | 'edit'
  initialRecord?: DataType | null
}

export default function PrivilegeCreate({
  onCancel,
  onSave,
  mode,
  initialRecord,
}: PrivilegeCreateProps) {
  // 使用 Hook 獲取狀態與邏輯
  const { dataSource, handleAddRow, handleDeleteRow, handleValueChange } =
    useCreateForm(mode, initialRecord)

  return (
    <div className="min-h-screen bg-white p-6">
      <Breadcrumb separator=">" style={{ marginBottom: '16px' }}>
        <Breadcrumb.Item>會員管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer transition-colors hover:text-teal-600"
        >
          特權管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {mode === 'create' ? '新增特權' : '編輯特權'}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="overflow-hidden rounded-lg border bg-gray-50">
        <div className="flex items-center justify-between border-b bg-gray-200 p-4">
          <h2 className="m-0 text-lg font-bold">
            {mode === 'create' ? '新增特權' : '編輯特權'}
          </h2>
        </div>

        <div className="bg-white p-4">
          <div className="mb-4 flex items-center gap-4">
            <h3 className="m-0 font-bold text-gray-700">VIP設定</h3>
            {mode === 'create' && (
              <Button
                icon={<PlusOutlined />}
                onClick={handleAddRow}
                style={{
                  background: '#f3e8ff',
                  color: '#7e22ce',
                  borderColor: '#d8b4fe',
                }}
              >
                新增欄位
              </Button>
            )}
          </div>

          <CreateTable
            dataSource={dataSource}
            mode={mode}
            onValueChange={handleValueChange}
            onDeleteRow={handleDeleteRow}
          />
        </div>

        <div className="mt-4 flex justify-center gap-4 border-t bg-white p-6">
          <Button
            size="large"
            className="w-32 border-red-500 font-bold text-red-500 hover:text-red-600"
            onClick={onCancel}
            icon={<CloseOutlined />}
          >
            取消
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-32 border-green-500 bg-green-500 font-bold hover:bg-green-600"
            onClick={onSave}
            icon={<SaveOutlined />}
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
