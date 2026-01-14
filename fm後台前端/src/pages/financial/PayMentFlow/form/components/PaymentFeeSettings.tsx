import { Form, Input, Select, Card } from 'antd'

const { Option } = Select

const cardHeadStyle = {
  background: '#fafafa',
  fontWeight: 'bold',
  borderBottom: '1px solid #f0f0f0',
  fontSize: '16px',
}

export default function PaymentFeeSettings() {
  return (
    <Card
      title="手續費設定"
      size="small"
      headStyle={cardHeadStyle}
      className="animate-fadeIn mb-4 shadow-sm"
    >
      <Form.Item label="每筆手續費(%)" name="feePercent">
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="每筆最低手續費(金額)" name="minFee">
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="免手續費次數" name="freeTimes">
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="免手續費次數重置條件" name="resetCondition">
        <Select placeholder="請選擇">
          <Option value="daily">每日重置</Option>
          <Option value="weekly">每週重置</Option>
          <Option value="monthly">每月重置</Option>
          <Option value="never">不重置</Option>
        </Select>
      </Form.Item>
    </Card>
  )
}
