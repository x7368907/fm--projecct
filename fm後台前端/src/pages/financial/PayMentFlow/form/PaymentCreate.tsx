import React, { useEffect } from 'react'
import { Form, Button, Breadcrumb } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

// 引入拆分後的子元件
import PaymentBasicInfo from './components/PaymentBasicInfo'
import PaymentFeeSettings from './components/PaymentFeeSettings'

interface PaymentCreateProps {
  initialValues?: any
  onCancel: () => void
}

const PaymentCreate: React.FC<PaymentCreateProps> = ({
  initialValues,
  onCancel,
}) => {
  const [form] = Form.useForm()

  // 監聽 category，用來控制手續費區塊顯示
  const category = Form.useWatch('category', form)

  const isEdit = !!initialValues
  const pageTitle = isEdit ? '編輯金流串接' : '新增金流串接'

  // 單欄式 Layout
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  }

  // 初始化表單
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      form.setFieldsValue({
        category: 'deposit',
        status: true,
        resetCondition: 'daily',
      })
    }
  }, [initialValues, form])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Submit:', values)
      onCancel()
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-24">
      {/* 麵包屑導航 */}
      <Breadcrumb separator=">" style={{ padding: '16px' }}>
        <Breadcrumb.Item>財務管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer transition-colors hover:text-teal-600"
        >
          金流串接管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 頂部標題 */}
      <div className="mb-4 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="text-lg font-bold text-gray-800">{pageTitle}</div>
      </div>

      {/* 表單區域 */}
      <Form
        form={form}
        {...formItemLayout}
        labelAlign="left"
        className="w-full"
      >
        {/* 1. 基本設定區塊 */}
        <PaymentBasicInfo />

        {/* 2. 手續費設定區塊 (只有託售時顯示) */}
        {category === 'withdraw' && <PaymentFeeSettings />}
      </Form>

      {/* 底部固定按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
        >
          取 消
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSubmit}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}

export default PaymentCreate
