import React from 'react'
import {
  Form,
  Input,
  Select,
  Radio,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  Breadcrumb,
} from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

// 引入拆分後的元件
import AgentSelector from './components/AgentSelector'
import IdentityVerification from './components/IdentityVerification'
import {
  BankSection,
  StoreSection,
  EPaySection,
  UsdtSection,
} from './components/FinancialSections'

const { Option } = Select
const { TextArea } = Input

interface MemberCreateProps {
  mode: 'create' | 'edit'
  initialValues?: any
  onCancel: () => void
}

const MemberCreate: React.FC<MemberCreateProps> = ({
  mode,
  initialValues,
  onCancel,
}) => {
  const [form] = Form.useForm()
  const isEdit = mode === 'edit'
  const isCreate = mode === 'create'

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-20">
      <Breadcrumb separator=">" style={{ padding: '16px' }}>
        <Breadcrumb.Item>會員管理</Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={onCancel}
          className="cursor-pointer transition-colors hover:text-teal-600"
        >
          會員資料
        </Breadcrumb.Item>
        <Breadcrumb.Item>{isCreate ? '新增會員' : '編輯會員'}</Breadcrumb.Item>
      </Breadcrumb>
      {/* 頂部標題 */}
      <div className="mb-4 border-b border-gray-200 bg-white px-6 py-4">
        <div className="text-base font-bold">
          {isCreate ? '新增會員' : '編輯會員'}
        </div>
      </div>

      <Form
        form={form}
        layout="horizontal"
        labelCol={{ flex: '120px' }}
        wrapperCol={{ flex: 1 }}
        labelAlign="left"
        initialValues={initialValues || { gender: 'male', status: 'active' }}
      >
        <Row gutter={24}>
          <Col xs={24} lg={10}>
            <Card title="帳號資料" size="small" className="mb-4">
              <Form.Item label="會員帳號" name="memberAccount" required>
                {isEdit ? (
                  <span className="font-bold">
                    {initialValues?.memberAccount}
                  </span>
                ) : (
                  <Input placeholder="請輸入" />
                )}
              </Form.Item>

              {isCreate && (
                <>
                  <Form.Item label="登入密碼" name="password" required>
                    <Input.Password placeholder="請輸入" />
                  </Form.Item>
                  <Form.Item
                    label="再輸入一次"
                    name="confirmPassword"
                    dependencies={['password']}
                    required
                  >
                    <Input.Password placeholder="請輸入" />
                  </Form.Item>
                </>
              )}

              <Form.Item label="標籤" name="tags" required>
                <Select placeholder="請選擇">
                  <Option value="一般會員">新會員(註冊未滿30天)</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={isCreate ? '選擇代理' : '所屬代理'}
                name="agent"
                required
              >
                {isCreate ? (
                  <AgentSelector />
                ) : (
                  <span>{initialValues?.agentName?.split('\n')[0]}</span>
                )}
              </Form.Item>

              {/* 預設值顯示區 (Create Mode) */}
              {isCreate && (
                <div className="space-y-4">
                  <ReadOnlyField label="預設VIP等級" value="VIP0-遊客" />
                  <Form.Item
                    label="預設返水結算條件"
                    name="rebateType"
                    initialValue="日結"
                  >
                    <Select>
                      <Option value="日結">日結</Option>
                      <Option value="週結">週結</Option>
                    </Select>
                  </Form.Item>
                  <ReadOnlyField label="預設金流群組" value="常規會員" />
                  <ReadOnlyField label="預設帳號狀態" value="啟用" />
                </div>
              )}

              {/* 編輯欄位區 (Edit Mode) */}
              {isEdit && (
                <>
                  <Form.Item label="VIP等級" name="vipLevel">
                    <Select>
                      <Option value="VIP0-一般會員">VIP0-一般會員</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="返水結算" name="rebateType">
                    <Select>
                      <Option value="日結">日結</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="金流群組" name="paymentGroup">
                    <Select>
                      <Option value="常規會員">常規會員</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="帳號狀態" name="status">
                    <Select>
                      <Option value="active">啟用</Option>
                    </Select>
                  </Form.Item>

                  {/* 註冊資訊區塊 */}
                  <div className="mb-6 rounded bg-gray-50 p-2 text-xs text-gray-500">
                    <div>會員註冊平台網址：https://seo01.fuma888.com/</div>
                    <div>註冊時間：{initialValues?.registerTime}</div>
                    <div>最後登入時間：{initialValues?.loginTime}</div>
                    <div>註冊IP：116.241.146.245</div>
                  </div>
                </>
              )}

              <Form.Item label="備註" name="note" className="mt-6">
                <TextArea rows={4} />
              </Form.Item>
            </Card>

            {/* 2. 會員資料卡片 */}
            <Card title="會員資料" size="small">
              <Form.Item label="會員姓名" name="memberName" required>
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item label="性別" name="gender" required>
                <Radio.Group>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </Radio.Group>
              </Form.Item>

              {/* 實名認證元件 */}
              <Form.Item label="實名認證" required className="mb-6">
                <IdentityVerification mode={mode} />
              </Form.Item>

              <Form.Item label="生日" name="birthday" required>
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item label="手機" name="phone" required>
                <Input
                  placeholder="請輸入"
                  defaultValue={isEdit ? '0976061431' : ''}
                />
              </Form.Item>
              <Form.Item label="Line ID" name="lineId">
                <Input
                  placeholder="請輸入"
                  defaultValue={isEdit ? 'test123' : ''}
                />
              </Form.Item>
            </Card>
          </Col>

          {/* ================= 右側欄位 (金流資料) ================= */}
          <Col xs={24} lg={14}>
            <BankSection title="銀行卡資料" isEdit={isEdit} />
            <BankSection title="信用卡資料" isEdit={isEdit} />
            <EPaySection isEdit={isEdit} />
            <StoreSection isEdit={isEdit} />
            <UsdtSection isEdit={isEdit} />
          </Col>
        </Row>
      </Form>

      {/* 底部固定按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-md">
        <Button
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:!text-red-400"
        >
          取 消
        </Button>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}

// 小幫手元件：唯讀欄位
const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <Form.Item label={label}>
    <Input
      disabled
      defaultValue={value}
      className="cursor-default bg-gray-100 text-gray-500"
    />
  </Form.Item>
)

export default MemberCreate
