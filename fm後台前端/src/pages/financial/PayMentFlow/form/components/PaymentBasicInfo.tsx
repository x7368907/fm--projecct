import { Form, Input, Select, Card, InputNumber } from 'antd'

const { Option } = Select
const { TextArea } = Input

const cardHeadStyle = {
  background: '#fafafa',
  fontWeight: 'bold',
  borderBottom: '1px solid #f0f0f0',
  fontSize: '16px',
}

export default function PaymentBasicInfo() {
  return (
    <Card
      title="金流串接設定"
      size="small"
      headStyle={cardHeadStyle}
      className="mb-4 shadow-sm"
    >
      <Form.Item label="款項類別" name="category" required>
        <Select placeholder="請選擇">
          <Option value="deposit">儲值</Option>
          <Option value="withdraw">託售</Option>
        </Select>
      </Form.Item>

      <Form.Item label="金流類型" name="type" required>
        <Select placeholder="請選擇">
          <Option value="ATM">ATM</Option>
          <Option value="SuperATM">Super-ATM</Option>
          <Option value="CVS">超商(CVS)</Option>
          <Option value="Credit">信用卡</Option>
          <Option value="EPayment">電子支付</Option>
          <Option value="USDT">USDT</Option>
        </Select>
      </Form.Item>

      <Form.Item label="金流名稱" name="name" required>
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="顯示名稱" name="displayName" required>
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="商家代碼" name="merchantId" required>
        <Input placeholder="Merchant / web / Customer_no" />
      </Form.Item>

      <Form.Item label="HashKey / 廠商信託碼" name="hashKey">
        <Input placeholder="HashKey / code / 交易密碼 / 廠商信託碼" />
      </Form.Item>

      <Form.Item label="HashIV / 系統信託碼" name="hashIv">
        <Input placeholder="HashIV / 系統信託碼" />
      </Form.Item>

      <Form.Item label="驗證碼" name="validateCode">
        <Input placeholder="validate" />
      </Form.Item>

      <Form.Item label="API代碼" name="apiCode">
        <Input placeholder="API代碼" />
      </Form.Item>

      <Form.Item label="匯率" name="rate">
        <Input placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="儲值最小值" name="minAmount">
        <InputNumber style={{ width: '100%' }} placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="儲值最大值" name="maxAmount">
        <InputNumber style={{ width: '100%' }} placeholder="請輸入" />
      </Form.Item>

      <Form.Item label="啟/停用" name="status">
        <Select placeholder="請選擇">
          <Option value={true}>啟用</Option>
          <Option value={false}>停用</Option>
        </Select>
      </Form.Item>

      <Form.Item label="備註" name="remark">
        <TextArea rows={4} />
      </Form.Item>
    </Card>
  )
}
