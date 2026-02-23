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
    <div className="space-y-4">
      {/* 外層卡片 */}
      <div className="relative rounded-md border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="m-0 text-lg font-bold text-gray-800">新增換線</h2>
        </div>

        {/* ===== 內容區（一定要預留 footer 高度） ===== */}
        <div className="p-6 pb-32">
          <div className="mb-4 font-bold text-gray-700">換線操作</div>

          {/* 1. 來源代理 */}
          <AgentSelector
            title="來源代理名稱"
            selectionType="checkbox"
            levels={LEVEL_MOCK_DATA}
            dataSource={CREATE_MOCK_DATA}
          />

          {/* 2. 中間轉換 */}
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">轉線類型</span>
              <Select defaultValue="all" className="w-64">
                <Option value="all">資料全部移轉至新代理</Option>
              </Select>
            </div>
            <ArrowDownOutlined className="mt-2 text-3xl font-bold text-black" />
          </div>

          {/* 3. 上級代理 */}
          <AgentSelector
            title="上級代理名稱"
            selectionType="radio"
            levels={LEVEL_MOCK_DATA}
            dataSource={CREATE_MOCK_DATA}
          />
        </div>

        {/* ===== Sticky Footer（跟 PointsCreate 一樣） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 rounded-b-md border-t border-gray-200 bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            icon={<CloseOutlined />}
            className="h-10 w-32 border-red-500 text-red-500 hover:!border-red-600 hover:!text-red-600"
            onClick={onCancel}
          >
            取消
          </Button>

          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            className="h-10 w-32 border-green-500 bg-green-500 hover:!bg-green-400"
            onClick={onSave}
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangeLineCreate
