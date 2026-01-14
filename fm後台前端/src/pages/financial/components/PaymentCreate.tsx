import React, { useEffect } from 'react'
import { Form, Input, Select, Button, Card, Breadcrumb } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

// 定義 Props 介面
interface PaymentCreateFormProps {
  initialValues?: any
  onCancel: () => void
}

const PaymentCreateForm: React.FC<PaymentCreateFormProps> = ({
  initialValues,
  onCancel,
}) => {
  const [form] = Form.useForm()

  // ★ 使用 useWatch 即時監聽 'category' 欄位的變化
  // 如果是 'withdraw' (託售) 才顯示手續費設定，預設為 'deposit' (儲值)
  const category = Form.useWatch('category', form)

  const isEdit = !!initialValues
  const pageTitle = isEdit ? '編輯金流串接' : '新增金流串接'

  // 卡片標題樣式
  const cardHeadStyle = {
    background: '#fafafa',
    fontWeight: 'bold',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '16px',
  }

  // 統一的 Form Item Layout (單欄式)
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  }

  // 初始化處理：確保 form 拿到 initialValues，讓 useWatch 能正確抓到初始狀態
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-24">
      {/* 1. 麵包屑導航 */}
      <Breadcrumb separator=">" style={{ padding: '16px' }}>
        <Breadcrumb.Item>財務管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer transition-colors hover:text-teal-600"
        >
          金流串接管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pageTitle}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 2. 頂部標題 */}
      <div className="mb-4 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="text-lg font-bold text-gray-800">{pageTitle}</div>
      </div>

      {/* 3. 表單區域 */}
      <Form
        form={form}
        {...formItemLayout}
        labelAlign="left"
        // 設定預設值：預設為儲值 (deposit)
        initialValues={
          initialValues || {
            category: 'deposit',
            status: true,
            resetCondition: 'daily',
          }
        }
        className="w-full"
      >
        {/*區塊 A：金流串接設定 (固定顯示) */}
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
            <Input placeholder="請輸入" />
          </Form.Item>

          <Form.Item label="儲值最大值" name="maxAmount">
            <Input placeholder="請輸入" />
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

        {/* 區塊 B：手續費設定 (★ 只有當 category 為 withdraw 時才顯示) */}
        {category === 'withdraw' && (
          <Card
            title="手續費設定"
            size="small"
            headStyle={cardHeadStyle}
            className="animate-fadeIn mb-4 shadow-sm" // 加個簡單動畫讓出現更滑順
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
        )}
      </Form>

      {/* 4. 底部固定按鈕列 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
        >
          取 消
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => {
            form.validateFields().then((values) => {
              console.log('Submit:', values)
              onCancel()
            })
          }}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}

export default PaymentCreateForm
