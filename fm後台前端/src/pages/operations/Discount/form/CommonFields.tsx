import { Form, Input, DatePicker } from 'antd'

const { TextArea } = Input
const { RangePicker } = DatePicker

export default function CommonFields() {
  return (
    <>
      <div className="my-6 border-t border-gray-100" />
      <div className="mb-6 text-sm font-bold text-gray-700">基本設定</div>

      <Form.Item label="優惠名稱" name="name" rules={[{ required: true }]}>
        <Input placeholder="請輸入優惠名稱" />
      </Form.Item>

      <Form.Item label="優惠期限" name="period">
        <RangePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="備註" name="note">
        <TextArea rows={3} showCount maxLength={200} />
      </Form.Item>
    </>
  )
}
