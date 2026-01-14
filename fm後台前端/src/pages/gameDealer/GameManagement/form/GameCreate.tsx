import { useEffect } from 'react'
import { Breadcrumb, Select, Button, Input, Form, Card, Divider } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface Props {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: any // ★ 新增：接受外部傳入的初始資料
}

export default function GameCreate({ onCancel, onSave, initialValues }: Props) {
  const [form] = Form.useForm()

  // 判斷是否為編輯模式
  const isEdit = !!initialValues

  // ★ 當 initialValues 改變時，更新表單內容
  useEffect(() => {
    if (initialValues) {
      // 編輯模式：填入資料
      form.setFieldsValue(initialValues)
    } else {
      // 新增模式：重置表單 (給予預設值)
      form.resetFields()
      form.setFieldsValue({
        gameType: 'electronic', // 預設值
        status: true,
      })
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    console.log('Form values:', values)
    onSave(values)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* 麵包屑：依據模式顯示不同文字 */}
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer transition-colors hover:text-teal-600"
          onClick={onCancel}
        >
          遊戲管理
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          {isEdit ? '編輯遊戲' : '新增遊戲'}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card
        className="overflow-hidden border border-gray-200 shadow-sm"
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        {/* 標題列：依據模式顯示不同文字 */}
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-3">
          <h2 className="mb-0 text-base font-bold text-gray-700">
            {isEdit ? '編輯遊戲' : '新增遊戲'}
          </h2>
        </div>

        {/* 表單內容區 */}
        <div className="p-8">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
            labelAlign="left"
            colon={false}
            onFinish={handleFinish}
          >
            {/* 區塊標題 */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">遊戲設定</h3>
              <Divider className="my-0" />
            </div>

            {/* 表單欄位 */}
            <Form.Item label="遊戲類型" name="gameType" className="mb-5">
              <Select
                style={{ width: 400 }}
                options={[
                  { label: '真人', value: 'live' },
                  { label: '電子', value: 'electronic' },
                  { label: '體育', value: 'sport' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Game ID" name="gameId" className="mb-5">
              <Input style={{ width: 400 }} placeholder="請輸入" />
            </Form.Item>

            <Form.Item label="Game code" name="gameCode" className="mb-5">
              <Input style={{ width: 400 }} placeholder="請輸入" />
            </Form.Item>

            <Form.Item label="遊戲名稱" name="gameName" className="mb-5">
              <Input style={{ width: 400 }} placeholder="請輸入" />
            </Form.Item>

            <Form.Item label="遊戲Logo" name="gameLogo" className="mb-5">
              <div className="flex gap-2" style={{ width: 400 }}>
                <Input className="flex-1" placeholder="" />
                <Button>瀏覽</Button>
              </div>
            </Form.Item>

            <Form.Item label="RTP(%)" name="rtp" className="mb-5">
              <Input
                style={{ width: 400 }}
                placeholder="HashKey / code / 交易密碼 / 廠商信任碼"
              />
            </Form.Item>

            <Form.Item label="啟/停用" name="status" className="mb-5">
              <Select
                style={{ width: 400 }}
                placeholder="請選擇"
                options={[
                  { label: '啟用', value: true },
                  { label: '停用', value: false },
                ]}
              />
            </Form.Item>

            <Form.Item label="備註" name="remark" className="mb-5">
              <TextArea
                style={{ width: 400 }}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Form>
        </div>
      </Card>

      {/* 底部固定按鈕列 */}
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
