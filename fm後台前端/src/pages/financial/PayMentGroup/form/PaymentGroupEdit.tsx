import { useEffect } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  Breadcrumb,
  Card,
  Divider,
  Row,
  Col,
} from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

interface Props {
  initialValues: any
  onCancel: () => void
  onSave: (values: any) => void
}

export default function PaymentGroupEdit({
  initialValues,
  onCancel,
  onSave,
}: Props) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category: initialValues.category || '出款',
        merchantId: '202412121708800',
        hashKey: '202412121708800',
        hashIv: '92b2e34a658d4059376a83e89d56bcab',
        rate: initialValues.rate || 1,
        status: initialValues.status ? 'enable' : 'disable',
        feePercent: initialValues.feePercent || 4,
        minFeeAmount: initialValues.minFeeAmount || 60,
        freeFeeCount: initialValues.freeFeeCount || 3,
        resetCondition: 'daily',
      })
    }
  }, [initialValues, form])

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>財務管理</Breadcrumb.Item>
        <Breadcrumb.Item>金流串接管理</Breadcrumb.Item>
        <Breadcrumb.Item>編輯金流群組</Breadcrumb.Item>
      </Breadcrumb>

      <Card
        title={<span className="font-bold text-gray-700">編輯金流群組</span>}
        className="shadow-sm"
        bodyStyle={{ padding: '24px' }}
      >
        <div className="mb-6 border-b border-gray-100 pb-4">
          <Row gutter={[0, 12]} className="mb-2">
            <Col span={4} className="pl-2 font-bold text-gray-600">
              金流群組
            </Col>
            <Col span={20} className="font-medium text-gray-800">
              常規會員
            </Col>
          </Row>
          <Row gutter={[0, 12]}>
            <Col span={4} className="pl-2 font-bold text-gray-600">
              目前累計金額
            </Col>
            <Col span={20} className="font-medium text-gray-800">
              <span className="border-l-4 border-red-500 pl-2">
                {initialValues?.grandTotal?.toLocaleString() || 0}
              </span>
            </Col>
          </Row>
        </div>

        <Form
          form={form}
          {...formLayout}
          layout="horizontal"
          labelAlign="left"
          className="w-full"
        >
          {/* ... (下方的 Form Items 保持不變) ... */}
          <Form.Item label="款項類別" name="category">
            <Select disabled className="bg-gray-100">
              <Option value="出款">出款</Option>
              <Option value="儲值">儲值</Option>
            </Select>
          </Form.Item>

          <Form.Item label="金流類型" name="type">
            <Select disabled>
              <Option value="ATM">ATM</Option>
              <Option value="CVS">超商</Option>
            </Select>
          </Form.Item>

          <Form.Item label="金流名稱" name="name">
            <Input disabled />
          </Form.Item>

          <Form.Item label="顯示名稱" name="displayName">
            <Input disabled />
          </Form.Item>

          <Form.Item label="商家代碼" name="merchantId">
            <Input disabled />
          </Form.Item>

          <Form.Item label="HashKey / 廠商信託碼" name="hashKey">
            <Input disabled />
          </Form.Item>

          <Form.Item label="HashIV / 系統信託碼" name="hashIv">
            <Input disabled />
          </Form.Item>

          <Form.Item label="驗證碼" name="validateCode">
            <Input disabled placeholder="validate" />
          </Form.Item>

          <Form.Item label="API代碼" name="apiCode">
            <Input disabled placeholder="API代碼" />
          </Form.Item>

          <Form.Item label="匯率" name="rate">
            <Input />
          </Form.Item>

          <Form.Item label="出款最小值" name="minDeposit">
            <Input />
          </Form.Item>

          <Form.Item label="出款最大值" name="maxDeposit">
            <Input />
          </Form.Item>

          <Form.Item label="啟/停用" name="status">
            <Select>
              <Option value="enable">啟用</Option>
              <Option value="disable">停用</Option>
            </Select>
          </Form.Item>

          <Form.Item label="備註" name="remark">
            <TextArea rows={2} />
          </Form.Item>

          <Divider
            orientation="left"
            className="!border-gray-300 !font-bold !text-gray-600"
          >
            手續費設定
          </Divider>

          <Form.Item label="每筆手續費(%)" name="feePercent">
            <Input suffix="%" />
          </Form.Item>

          <Form.Item label="每筆最低手續費(金額)" name="minFeeAmount">
            <Input />
          </Form.Item>

          <Form.Item label="免手續費次數" name="freeFeeCount">
            <Input />
          </Form.Item>

          <Form.Item label="免手續費次數重置條件" name="resetCondition">
            <Select>
              <Option value="daily">日結 (當天 23:59:59)</Option>
              <Option value="weekly">週結</Option>
              <Option value="monthly">月結</Option>
            </Select>
          </Form.Item>
        </Form>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
        >
          取消
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={onSave}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲存
        </Button>
      </div>
    </div>
  )
}
