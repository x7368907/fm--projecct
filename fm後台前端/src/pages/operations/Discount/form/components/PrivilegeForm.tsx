import { Form, Select, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const { Option } = Select

export default function PrivilegeForm() {
  return (
    <>
      <Form.Item label="VIP等級" name="vipLevel">
        <Select>
          <Option value="vip2">VIP2-BOK會員</Option>
          <Option value="vip3">VIP3-黃金會員</Option>
        </Select>
      </Form.Item>

      <Form.Item label="回饋金(%)" name="rebate">
        <Input suffix="%" />
      </Form.Item>

      <Form.Item label="結算時機" name="timing">
        <Select>
          <Option value="month">月結(每月最後一天-23:59:59)</Option>
          <Option value="instant">即時</Option>
        </Select>
      </Form.Item>

      <Form.Item label="公式計算">
        <div className="flex items-center gap-3">
          <Form.Item name="formulaLeft" noStyle initialValue="儲值最大值">
            <Select style={{ width: 140 }} disabled>
              <Option value="儲值最大值">儲值最大值</Option>
            </Select>
          </Form.Item>
          <CloseOutlined className="text-gray-400" />
          <span className="text-gray-500">回饋金 %</span>
        </div>
      </Form.Item>

      {/* 這裡可以繼續放流水設定、派發方式等 */}
      <Form.Item label="必須流水" name="turnover">
        <Input />
      </Form.Item>
    </>
  )
}
