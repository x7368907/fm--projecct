import { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Input, Select, Card } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import type { GameSettingData } from '../types'

interface GameSettingFormProps {
  initialValues?: GameSettingData | null
  onCancel: () => void
  onSave: (values: any) => void
}

export default function GameSettingForm({
  initialValues,
  onCancel,
  onSave,
}: GameSettingFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // 判斷是否為編輯模式
  const isEdit = !!initialValues
  const pageTitle = isEdit ? '編輯遊戲上繳' : '新增遊戲上繳'

  // 初始化表單值
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  const handleFinish = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      console.log('Submit Values:', values)

      // 模擬 API 請求
      setTimeout(() => {
        setLoading(false)
        onSave(values)
      }, 800)
    } catch (error) {
      console.log('Validation Failed:', error)
    }
  }

  // 卡片標題樣式
  const cardHeadStyle = {
    background: '#fafafa',
    fontWeight: 'bold',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '16px',
  }

  // 表單排版
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-24">
      {/* 1. 麵包屑導航 */}
      <Breadcrumb separator=">" style={{ padding: '16px' }}>
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer transition-colors hover:text-teal-600"
        >
          遊戲上繳設定
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 2. 頂部標題 */}
      <div className="mb-4 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="text-lg font-bold text-gray-800">{pageTitle}</div>
      </div>

      {/* 3. 表單區域 */}
      <Form
        form={form}
        {...formItemLayout}
        labelAlign="left"
        className="w-full"
        size="large"
      >
        <Card
          title="遊戲上繳設定"
          size="small"
          headStyle={cardHeadStyle}
          className="mb-4 shadow-sm"
        >
          <Form.Item
            label="站別"
            name="station"
            rules={[{ required: true, message: '請選擇站別' }]}
          >
            {/* 編輯模式下 disabled */}
            <Select
              placeholder="請選擇"
              options={[{ label: 'FM', value: 'FM' }]}
              disabled={isEdit}
            />
          </Form.Item>

          <Form.Item
            label="遊戲類別選擇"
            name="category"
            rules={[{ required: true, message: '請選擇遊戲類別' }]}
          >
            <Select
              placeholder="請選擇"
              options={[
                { label: '電子', value: '電子' },
                { label: '真人', value: '真人' },
              ]}
              disabled={isEdit}
            />
          </Form.Item>

          <Form.Item
            label="遊戲商選擇"
            name="vendorName"
            rules={[{ required: true, message: '請選擇遊戲商' }]}
          >
            <Select
              placeholder="請選擇"
              options={[
                { label: 'ATG', value: 'ATG' },
                { label: 'QT', value: 'QT' },
                { label: 'RSG', value: 'RSG' },
                { label: 'BNG', value: 'BNG' },
              ]}
              disabled={isEdit}
            />
          </Form.Item>

          <Form.Item
            label="彩金結算"
            name="jackpotSettlement"
            rules={[{ required: true, message: '請選擇彩金結算狀態' }]}
          >
            <Select
              placeholder="請選擇"
              options={[
                { label: '啟用', value: '啟用' },
                { label: '停用', value: '停用' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="彩金貢獻值(JC / %)"
            name="contribution"
            rules={[{ required: true, message: '請輸入彩金貢獻值' }]}
          >
            <Input placeholder="請輸入" />
          </Form.Item>

          <Form.Item
            label="遊戲上繳(%)"
            name="gameCap"
            rules={[{ required: true, message: '請輸入遊戲上繳比例' }]}
          >
            <Input placeholder="請輸入" />
          </Form.Item>

          <Form.Item
            label="負營利狀態"
            name="negativeProfit"
            rules={[{ required: true, message: '請選擇負營利狀態' }]}
          >
            <Select
              placeholder="請選擇"
              options={[
                { label: '承擔', value: '承擔' },
                { label: '不承擔', value: '不承擔' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="遊戲上繳結算日"
            name="settlementType"
            rules={[{ required: true, message: '請選擇結算日' }]}
          >
            <Select
              placeholder="請選擇"
              options={[
                { label: '週結 (每週日)', value: '週結' },
                { label: '月結 (每月最後一天)', value: '月結' },
              ]}
            />
          </Form.Item>
        </Card>
      </Form>

      {/* 4. 底部固定按鈕列 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button
          icon={<CloseOutlined />}
          onClick={onCancel}
          size="large"
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
        >
          取 消
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleFinish}
          loading={loading}
          size="large"
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}
