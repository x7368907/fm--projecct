import { Form, Select, Button, Input, InputNumber } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
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
    <div className="space-y-4">
      <div className="rounded-sm bg-gray-100 px-4 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">新增加扣點</h2>
      </div>

      <div className="relative rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6 pb-2">
          <h3 className="text-base font-bold text-gray-800">加扣點操作</h3>
        </div>

        {/* 表單內容 */}
        <div className="p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            onFinish={handleFinish}
            initialValues={{ actionType: 'add' }}
            className="max-w-6xl"
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
                style={{ width: '100%', maxWidth: '400px' }}
                placeholder="請輸入"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item label="流水倍數" name="turnoverMultiple">
              <InputNumber
                style={{ width: '100%', maxWidth: '400px' }}
                placeholder="請輸入"
              />
            </Form.Item>

            <Form.Item label="必須流水" name="requiredTurnover">
              <InputNumber
                style={{ width: '100%', maxWidth: '400px' }}
                placeholder="請輸入"
              />
            </Form.Item>

            <Form.Item label="備註" name="remarks">
              <TextArea rows={4} style={{ maxWidth: '600px' }} />
            </Form.Item>
          </Form>
        </div>

        {/* 3. 底部浮動區塊 (Sticky Footer) */}
        <div className="sticky bottom-0 z-10 mt-4 flex justify-center gap-4 rounded-b-lg border-t border-gray-200 bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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
            className="h-10 w-32 border-green-600 bg-green-600 hover:!bg-green-700"
            onClick={() => form.submit()}
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
