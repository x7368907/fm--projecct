import React from 'react'
import { Button, Select } from 'antd'
import {
  CloseOutlined,
  SaveOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'

import AgentSelector from './components/AgentSelector'
import { CREATE_MOCK_DATA, LEVEL_MOCK_DATA } from '../mock'

const { Option } = Select

interface ChangeLineCreateProps {
  onCancel: () => void
  onSave: () => void
}

const ChangeLineCreate: React.FC<ChangeLineCreateProps> = ({
  onCancel,
  onSave,
}) => {
  return (
    <div className="pb-16">
      <div className="rounded-md border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="m-0 text-lg font-bold text-gray-800">新增換線</h2>
        </div>

        <div className="p-6">
          <div className="mb-4 font-bold text-gray-700">換線操作</div>

          {/* 1. 來源代理區塊 (使用模組化元件) */}
          <AgentSelector
            title="來源代理名稱"
            selectionType="checkbox"
            levels={LEVEL_MOCK_DATA}
            dataSource={CREATE_MOCK_DATA}
          />

          {/* 2. 中間轉換區塊 */}
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">轉線類型</span>
              <Select defaultValue="all" className="w-64">
                <Option value="all">資料全部移轉至新代理</Option>
              </Select>
            </div>
            <ArrowDownOutlined className="mt-2 text-3xl font-bold text-black" />
          </div>

          {/* 3. 上級代理區塊 (使用模組化元件) */}
          <AgentSelector
            title="上級代理名稱"
            selectionType="radio"
            levels={LEVEL_MOCK_DATA}
            dataSource={CREATE_MOCK_DATA}
          />
        </div>
      </div>

      {/* 底部固定按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Button
          size="large"
          danger
          className="flex w-32 items-center justify-center gap-1"
          onClick={onCancel}
        >
          <CloseOutlined /> 取消
        </Button>
        <Button
          type="primary"
          size="large"
          className="flex w-32 items-center justify-center gap-1 border-green-500 bg-green-500 hover:bg-green-400"
          onClick={onSave}
        >
          <SaveOutlined /> 儲存
        </Button>
      </div>
    </div>
  )
}

export default ChangeLineCreate
