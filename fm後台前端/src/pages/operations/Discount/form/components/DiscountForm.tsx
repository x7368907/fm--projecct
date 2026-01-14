import { Form, Select, Input, Button, Checkbox } from 'antd'
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons'

const { Option } = Select

interface DiscountFormProps {
  isCheckAmountUnlimited: boolean
}

export default function DiscountForm({
  isCheckAmountUnlimited,
}: DiscountFormProps) {
  return (
    <>
      <Form.Item label="儲值條件" name="depositCondition">
        <Select>
          <Option value="first">首儲</Option>
          <Option value="every">每次儲值</Option>
        </Select>
      </Form.Item>

      <Form.Item label="回饋金(%)" name="rebate">
        <Input suffix="%" />
      </Form.Item>

      <Form.Item label="檢核儲值金額" style={{ marginBottom: 12 }}>
        <Form.List name="checkAmounts">
          {(fields, { add, remove }) => (
            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div key={field.key} className="flex items-center gap-2">
                  {index === 0 ? (
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      disabled={isCheckAmountUnlimited}
                      className={`flex w-[32px] justify-center border-none text-white ${
                        isCheckAmountUnlimited ? 'bg-gray-300' : 'bg-[#2c3e50]'
                      }`}
                    />
                  ) : (
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => remove(field.name)}
                      shape="circle"
                      className="flex w-[32px] justify-center border-none bg-black text-white"
                    />
                  )}
                  <Form.Item {...field} noStyle>
                    <Input
                      disabled={isCheckAmountUnlimited}
                      placeholder="輸入金額"
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
          )}
        </Form.List>
        <div className="mt-2">
          <Form.Item
            name="isCheckAmountUnlimited"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>無限制</Checkbox>
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item label="公式計算">
        <div className="flex items-center gap-3">
          <Form.Item name="formulaLeft" noStyle initialValue="儲值金額">
            <Select style={{ width: 140 }} disabled>
              <Option value="儲值金額">儲值金額</Option>
            </Select>
          </Form.Item>
          <CloseOutlined className="text-gray-400" />
          <span className="text-gray-500">回饋金 %</span>
        </div>
      </Form.Item>
    </>
  )
}
