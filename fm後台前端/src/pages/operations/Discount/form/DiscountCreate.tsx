import { Form, Breadcrumb, Space, Button } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

// 引入拆分後的元件
import CommonFields from './CommonFields'
import PrivilegeForm from './components/PrivilegeForm'
import DiscountForm from './components/DiscountForm'
import RedEnvForm from './components/RedEnvForm'

// 引入 Hook
import { useDiscountForm } from '../hook/useDiscountForm'
import type { DiscountDataType } from '../types'

interface DiscountCreateProps {
  onCancel: () => void
  onSave: () => void
  initialValues?: DiscountDataType
}

export default function DiscountCreate({
  onCancel,
  onSave,
  initialValues,
}: DiscountCreateProps) {
  // 使用 Hook
  const {
    form,
    discountType,
    isCheckAmountUnlimited,
    handleTypeChange,
    handleValuesChange,
  } = useDiscountForm(initialValues)

  // 按鈕樣式 Helper
  const getTypeBtnClass = (type: string) => {
    const base =
      'px-8 py-1 rounded border text-sm transition-colors cursor-pointer outline-none'
    return discountType === type
      ? `${base} bg-[#7e22ce] text-white border-[#7e22ce]`
      : `${base} bg-white text-gray-500 border-gray-300 hover:text-[#7e22ce] hover:border-[#7e22ce]`
  }

  // ★ 核心：根據類型渲染對應的表單內容
  const renderFormContent = () => {
    switch (discountType) {
      case 'privilege':
        return <PrivilegeForm />
      case 'discount':
        // 傳遞需要的 props
        return <DiscountForm isCheckAmountUnlimited={isCheckAmountUnlimited} />
      case 'redenv':
        return <RedEnvForm />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>營運管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer hover:text-teal-600"
        >
          優惠管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {initialValues ? '編輯優惠' : '新增優惠'}
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-800">
            {initialValues ? '編輯優惠' : '新增優惠'}
          </h2>
        </div>

        <div className="p-8">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
            labelAlign="left"
            className="w-full"
            onValuesChange={handleValuesChange}
          >
            {/* 1. 類型切換區 */}
            <div className="mb-4 text-sm font-bold text-gray-700">優惠設定</div>
            <Space size="middle" className="mb-4">
              {[
                { key: 'privilege', label: '特權' },
                { key: 'discount', label: '優惠' },
                { key: 'redenv', label: '紅包' },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={getTypeBtnClass(item.key)}
                  onClick={() => handleTypeChange(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </Space>

            <div className="my-6 border-t border-gray-100" />

            {/* 2. 動態表單區 (只渲染當前選中的類型) */}
            {renderFormContent()}

            {/* 3. 共用欄位區 (放在最後或最前皆可) */}
            <CommonFields />
          </Form>
        </div>

        {/* 底部按鈕 */}
        <div className="flex justify-center gap-4 rounded-b-lg border-t border-gray-100 bg-gray-50 py-6">
          <Button
            size="large"
            onClick={onCancel}
            className="w-32 border-red-500 text-red-500 hover:border-red-600 hover:text-red-600"
          >
            <CloseOutlined /> 取消
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={onSave}
            className="w-32 border-green-500 bg-green-500 hover:bg-green-600"
          >
            <SaveOutlined /> 儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
