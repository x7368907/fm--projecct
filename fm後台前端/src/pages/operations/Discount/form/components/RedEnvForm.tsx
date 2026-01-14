import { Form, Select, Input } from 'antd'

const { Option } = Select

export default function RedEnvForm() {
  return (
    <>
      <Form.Item label="金額提供方式" name="amountType" initialValue="points">
        <Select disabled>
          <Option value="points">點數發放</Option>
        </Select>
      </Form.Item>

      <Form.Item label="發放金額" name="fixedAmount">
        <Input placeholder="請輸入金額" prefix="$" />
      </Form.Item>

      <Form.Item label="獎勵申請方式" name="applyMethod">
        <Select>
          <Option value="agent_manual">後台-代理手動</Option>
        </Select>
      </Form.Item>

      <Form.Item label="獎勵派發方式" name="distributeMethod">
        <Select>
          <Option value="會員錢包">會員錢包</Option>
        </Select>
      </Form.Item>
    </>
  )
}
