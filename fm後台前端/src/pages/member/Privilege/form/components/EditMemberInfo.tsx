import { Form, Input } from 'antd'

export default function EditMemberInfo() {
  return (
    <div className="mb-6">
      <h3 className="mb-4 border-l-4 border-teal-500 pl-2 font-bold text-gray-700">
        會員資料
      </h3>
      <div className="max-w-2xl">
        <Form.Item label="會員帳號" name="account">
          <Input disabled className="bg-gray-100 text-gray-600" />
        </Form.Item>
        <Form.Item label="會員姓名" name="name">
          <Input disabled className="bg-gray-100 text-gray-600" />
        </Form.Item>
      </div>
    </div>
  )
}
