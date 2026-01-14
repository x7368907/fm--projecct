import { Card, Form, Input, Radio } from 'antd'

export default function AgentInfo() {
  return (
    <Card
      title="代理資料"
      className="mb-4 shadow-sm"
      headStyle={{ background: '#fafafa' }}
    >
      <Form.Item label="代理姓名" name="realName">
        <Input placeholder="請輸入" />
      </Form.Item>
      <Form.Item label="性別" name="gender">
        <Radio.Group>
          <Radio value="male">男</Radio>
          <Radio value="female">女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="身分證字號" name="idCard">
        <Input placeholder="請輸入" />
      </Form.Item>
      <Form.Item label="暱稱" name="nickname">
        <Input placeholder="請輸入" />
      </Form.Item>
      <Form.Item label="手機" name="mobile">
        <Input placeholder="請輸入" />
      </Form.Item>
      <Form.Item label="Line ID" name="lineId">
        <Input placeholder="請輸入" />
      </Form.Item>
    </Card>
  )
}
