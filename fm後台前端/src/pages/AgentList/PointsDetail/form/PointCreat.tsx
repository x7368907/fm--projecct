import { Form, Select, Button, Input, InputNumber } from 'antd'
import AccountSelector from './components/AccountSelector'
import { usePointsForm } from '../hooks/usePointsForm'
import type { PointsFormData } from '../types'
import { MOCK_LEVELS, MOCK_ISSUERS, MOCK_RECEIVERS } from '../mock'

const { Option } = Select
const { TextArea } = Input

interface PointsCreateProps {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: PointsFormData | null
}

export default function PointsCreate({
  onCancel,
  onSave,
  initialValues,
}: PointsCreateProps) {
  const { form, handleFinish, selectorState } = usePointsForm({
    initialValues,
    onSave,
  })

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="mb-4 border-b pb-2 text-lg font-semibold">加扣點操作</h3>

        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          onFinish={handleFinish}
          initialValues={{ actionType: 'add' }}
        >
          <Form.Item
            label="加點 / 扣點"
            name="actionType"
            className="font-bold"
          >
            <Select style={{ width: 200 }}>
              <Option value="add">加點</Option>
              <Option value="deduct">扣點</Option>
            </Select>
          </Form.Item>

          {/* 模組化的選擇器元件 */}
          <Form.Item label="帳戶餘額" required>
            <AccountSelector
              levels={MOCK_LEVELS}
              issuers={MOCK_ISSUERS}
              receivers={MOCK_RECEIVERS}
              selectedLevel={selectorState.selectedLevel}
              onSelectLevel={selectorState.setSelectedLevel}
              selectedIssuer={selectorState.selectedIssuer}
              onSelectIssuer={selectorState.setSelectedIssuer}
              selectedReceivers={selectorState.selectedReceivers}
              onReceiverChange={selectorState.handleReceiverChange}
              onSelectAllReceivers={selectorState.handleSelectAllReceivers}
            />
          </Form.Item>

          <Form.Item label="獎勵類型" name="rewardType">
            <Select style={{ width: 200 }} placeholder="請選擇">
              <Option value="manual_add">加點</Option>
              <Option value="reward_add">獎勵點數發放</Option>
              <Option value="credit_add">信用點數上分</Option>
              <Option value="manual_deduct">扣點</Option>
              <Option value="reward_deduct">獎勵點數收回</Option>
              <Option value="credit_deduct">信用點數收回</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="點數"
            name="points"
            rules={[{ required: true, message: '請輸入點數' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="請輸入"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item label="流水倍數" name="turnoverMultiple">
            <InputNumber style={{ width: '100%' }} placeholder="請輸入" />
          </Form.Item>

          <Form.Item label="必須流水" name="requiredTurnover">
            <InputNumber style={{ width: '100%' }} placeholder="請輸入" />
          </Form.Item>

          <Form.Item label="備註" name="remarks">
            <TextArea rows={4} />
          </Form.Item>

          <div className="mt-8 flex justify-center gap-4 pb-8">
            <Button
              size="large"
              className="w-32 border-red-500 font-bold text-red-500 hover:border-red-600 hover:text-red-600"
              onClick={onCancel}
            >
              × 取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-32 border-green-600 bg-green-600 font-bold hover:bg-green-500"
              icon={<span className="text-lg">💾</span>}
            >
              儲存
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
