import { Button, Select, Input, Form } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

import type { CommissionData } from '../types'
import { useCommissionForm } from '../hooks/useCommissionForm'
import RebateSettings from './components/RebateSettings'

interface CreateCommissionProps {
  initialValues?: CommissionData | null
  onCancel: () => void
  onSuccess: () => void
}

export default function CreateCommission({
  initialValues,
  onCancel,
  onSuccess,
}: CreateCommissionProps) {
  const { form, handleSubmit } = useCommissionForm({ initialValues, onSuccess })

  const title = initialValues ? '編輯分潤' : '新增分潤'

  // ✅ 跟假資料版一致：watch system 切換
  const system = Form.useWatch('system', form)
  const isShareMode = system === 'share'
  const isRebateMode = system === 'rebate'

  // ✅ 跟假資料版一致：切換模式時清掉不該送出的欄位，避免 payload 髒資料
  useEffect(() => {
    if (isShareMode) {
      form.setFieldsValue({
        rebate: {
          live: 0,
          elec: 0,
          sport: 0,
          lottery: 0,
          chess: 0,
          fish: 0,
        },
      })
    }
    if (isRebateMode) {
      form.setFieldsValue({ ratio: 0 })
    }
  }, [isShareMode, isRebateMode, form])

  return (
    <div className="space-y-4">
      {/* ✅ 跟假資料版一致：灰底標題 */}
      <div className="rounded-sm bg-gray-100 px-4 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>

      {/* ✅ 跟假資料版一致：relative 讓 sticky footer 以此區塊為基準 */}
      <div className="relative rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6 pb-2">
          <h3 className="text-base font-bold text-gray-800">分潤條件設定</h3>
        </div>

        {/* ✅ 跟假資料版一致：pb-32 預留 footer 高度 */}
        <div className="p-8 pb-32">
          <Form
            form={form}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 12, offset: 1 }}
            className="max-w-4xl"
            initialValues={{ system: 'share' }}
          >
            <Form.Item
              label="代理制度"
              name="system"
              rules={[{ required: true, message: '請選擇' }]}
            >
              <Select>
                <Select.Option value="share">佔成制</Select.Option>
                <Select.Option value="rebate">返水制</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="分潤名稱"
              name="name"
              rules={[{ required: true, message: '請輸入分潤名稱' }]}
            >
              <Input placeholder="請輸入" />
            </Form.Item>

            <Form.Item
              label="代理級別選擇"
              name="level"
              rules={[{ required: true, message: '請選擇' }]}
            >
              <Select
                placeholder="請選擇"
                options={[
                  { label: '任一層級', value: 'any' },
                  { label: '1級總代理', value: '1' },
                  { label: '2級代理', value: '2' },
                  { label: '3級代理', value: '3' },
                  { label: '4級代理', value: '4' },
                  { label: '5級代理', value: '5' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="代理名稱選擇"
              name="agentName"
              rules={[{ required: true, message: '請選擇' }]}
            >
              <Select
                placeholder="請選擇"
                options={[
                  { label: '任一代理', value: 'any' },
                  { label: 'FMCA(金流/成數代理-主站)', value: 'FMCA' },
                  { label: 'test123(測試帳號線)', value: 'test123' },
                  { label: 'XFW(金流/成數+返水代理-外單位)', value: 'XFW' },
                  { label: 'W02週結-(信用/成數代理-外單位)', value: 'W02' },
                  {
                    label: 'W01週結-(信用/成數+返水代理-外單位)',
                    value: 'W01',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="代理佔成比例(%)"
              name="ratio"
              rules={[
                {
                  required: isShareMode, // ✅ 佔成制才必填
                  message: '請輸入',
                },
              ]}
            >
              <Input placeholder="請輸入" suffix="%" disabled={isRebateMode} />
            </Form.Item>

            {/* ✅ 跟假資料版一致：佔成制禁用返水區，且上面 useEffect 會清值 */}
            <RebateSettings disabled={isShareMode} />

            <Form.Item
              label="代理分潤結算"
              name="settlement"
              rules={[{ required: true, message: '請選擇' }]}
            >
              <Select placeholder="請選擇">
                <Select.Option value="weekly">
                  週結(每週日-23:59:59)
                </Select.Option>
                <Select.Option value="monthly">
                  月結(每月最後一天-23:59:59)
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>

        {/* ✅ 跟假資料版一致：Sticky Footer */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 rounded-b-lg border-t border-gray-200 bg-white py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
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
            onClick={handleSubmit}
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
