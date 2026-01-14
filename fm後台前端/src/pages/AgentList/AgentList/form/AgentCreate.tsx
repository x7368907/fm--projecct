import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

// 引入拆分後的元件與 Hook
import AgentSettings from './components/AgentSettings'
import ProfitSettings from './components/ProfitSettings'
import AgentInfo from './components/AgentInfo'
import BankInfo from './components/BankInfo'
import GamePermissions from './components/GamePermissions'
import { useAgentForm } from '../hooks/useAgentForm'
import type { DataType } from '../types'

interface AgentCreateProps {
  onCancel: () => void
  initialValues?: DataType | null
}

const AgentCreate: React.FC<AgentCreateProps> = ({
  onCancel,
  initialValues,
}) => {
  // 1. 使用 Hook 處理邏輯
  const { form, isEditMode, handleSubmit } = useAgentForm({
    initialValues,
    onSuccess: onCancel,
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4 bg-gray-200 px-4 py-2 font-bold text-gray-700">
        {isEditMode ? '編輯代理' : '新增代理'}
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={24}>
          {/* 左側欄位 */}
          <Col xs={24} lg={12}>
            <AgentSettings isEditMode={isEditMode} />
            <ProfitSettings />
          </Col>

          {/* 右側欄位 */}
          <Col xs={24} lg={12}>
            <AgentInfo />
            <BankInfo />
            <GamePermissions />
          </Col>
        </Row>

        {/* 底部按鈕 */}
        <div className="sticky bottom-0 z-10 mt-4 flex justify-center gap-4 border-t bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            size="large"
            danger
            icon={<CloseOutlined />}
            className="w-32"
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            className="w-32 border-green-500 bg-green-500 hover:bg-green-600"
            onClick={handleSubmit}
          >
            {isEditMode ? '更新' : '儲存'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AgentCreate
