import { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Card, Divider } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

// 引入拆分後的元件
import LiveForm from './LiveForm'
import SportForm from './SportForm'

interface Props {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: any
}

export default function RedLimitCreate({
  onCancel,
  onSave,
  initialValues,
}: Props) {
  const [form] = Form.useForm()

  // 狀態：目前選擇的類型 (live | sport)
  const [activeType, setActiveType] = useState<'live' | 'sport'>('live')
  const [activeProvider, setActiveProvider] = useState('DG')

  // 當 activeType 改變時，自動選擇該類型的第一個廠商 (保持原有邏輯)
  useEffect(() => {
    if (activeType === 'live') {
      if (activeProvider === 'Super') setActiveProvider('DG')
    } else {
      setActiveProvider('Super')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType])

  // 初始值與重置邏輯 (保持不變)
  useEffect(() => {
    if (initialValues) {
      if (initialValues.type) setActiveType(initialValues.type)
      if (initialValues.provider) setActiveProvider(initialValues.provider)
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
      setActiveType('live')
      setActiveProvider('DG')

      // 預設值邏輯可視情況保留或移入子元件，這邊先保留最基本的防止報錯
      form.setFieldsValue({})
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    const submitData = {
      ...values,
      type: activeType,
      provider: activeProvider,
    }
    onSave(submitData)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* 麵包屑導航 (保持原樣) */}
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer transition-colors hover:text-teal-600"
          onClick={onCancel}
        >
          遊戲限紅設定
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          {initialValues ? '編輯遊戲限紅設定' : '新增遊戲限紅設定'}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card
        className="overflow-hidden border border-gray-200 shadow-sm"
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        {/* 標題列 (保持原樣) */}
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-3">
          <h2 className="mb-0 text-base font-bold text-gray-700">
            {initialValues ? '編輯遊戲限紅' : '新增遊戲限紅'}
          </h2>
        </div>

        {/* 表單內容區 */}
        <div className="p-8">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            labelAlign="left"
            colon={false}
            onFinish={handleFinish}
          >
            {/* 區塊標題 (保持原樣) */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">
                遊戲限紅設定
              </h3>
              <Divider className="my-0" />
            </div>

            {/* 1. 遊戲類型切換按鈕 (保留原本 HTML 結構與 Class) */}
            <Form.Item wrapperCol={{ span: 24 }} className="mb-3">
              <div className="flex justify-start gap-2">
                <button
                  type="button"
                  onClick={() => setActiveType('live')}
                  className={`h-8 w-24 rounded border text-sm transition-colors ${
                    activeType === 'live'
                      ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                  }`}
                >
                  真人
                </button>
                <button
                  type="button"
                  onClick={() => setActiveType('sport')}
                  className={`h-8 w-24 rounded border text-sm transition-colors ${
                    activeType === 'sport'
                      ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                  }`}
                >
                  體育
                </button>
              </div>
            </Form.Item>

            {/* 根據類型切換顯示子元件 */}
            {activeType === 'live' ? (
              <LiveForm
                activeProvider={activeProvider}
                setActiveProvider={setActiveProvider}
              />
            ) : (
              <SportForm
                activeProvider={activeProvider}
                setActiveProvider={setActiveProvider}
              />
            )}
          </Form>
        </div>
      </Card>

      {/* 底部固定按鈕列 (保持原樣) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button
          size="large"
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
        >
          取 消
        </Button>
        <Button
          size="large"
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => form.submit()}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}
