import { useState } from 'react'
import { Form, Input, Checkbox, Button, Breadcrumb, Card, Row, Col } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons' // ★ 引入 Icon

/**
 * 定義選項資料結構
 */
const WITHDRAW_OPTIONS = [
  {
    key: 'atm',
    label: 'ATM',
    options: [
      'CKPay',
      '98Pay',
      'OKPay',
      'HWPay',
      'UMS',
      'CuPay',
      'HzPay',
      'OdPay',
      'SuperPay',
      '卓越支付',
      'ByPay',
      '巴黎支付',
      'ZH支付',
      'CL支付',
    ],
  },
  {
    key: 'superAtm',
    label: 'Super - ATM',
    options: [
      'CKPay',
      '98Pay',
      'OKPay',
      'HWPay',
      'UMS',
      'CuPay',
      'HzPay',
      'OdPay',
      'SuperPay',
      '卓越支付',
      'ByPay',
      '巴黎支付',
      'ZH支付',
      'CL支付',
    ],
  },
  {
    key: 'credit',
    label: '信用卡',
    options: ['ECPay', 'NewbPay', 'PayUni', 'PayPal', 'Stripe', 'Tappay'],
  },
  {
    key: 'epay',
    label: '電子支付',
    options: [
      '一卡通',
      '全支付',
      '街口支付',
      '台灣Pay',
      '橘子支付',
      '全盈+Pay',
      'EzPay',
      '歐付寶',
      'Pi錢包',
    ],
  },
  {
    key: 'cvs',
    label: '超商(CVS)',
    options: ['CKPay', '98Pay', 'HWPay', 'OdPay', 'ByPay'],
  },
  {
    key: 'usdt',
    label: 'USDT',
    options: ['TRC20'],
  },
]

const DEPOSIT_OPTIONS = [
  {
    key: 'bank',
    label: '銀行卡',
    options: [
      '004 台灣銀行',
      '005 土地銀行',
      '007 第一銀行',
      '008 華南銀行',
      '009 彰化銀行',
      '011 上海銀行',
      '012 台北富邦',
      '013 國泰世華',
      '016 高雄銀行',
      '017 兆豐銀行',
      '018 農業金庫',
      '021 花旗(台灣)',
      '022 美國銀行',
      '025 首都銀行',
      '039 澳盛銀行',
      '048 王道銀行',
      '050 臺灣企銀',
      '052 渣打銀行',
    ],
  },
  {
    key: 'usdt_in',
    label: 'USDT',
    options: ['TRC20'],
  },
]

/**
 * 子元件：單列選擇區塊
 */
const PaymentSelectionRow = ({
  categoryLabel,
  options,
}: {
  categoryLabel: string
  options: string[]
  name: string
}) => {
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked
    setCheckedList(checked ? options : [])
    setIndeterminate(false)
    setCheckAll(checked)
  }

  const onChange = (list: string[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < options.length)
    setCheckAll(list.length === options.length)
  }

  return (
    <div className="flex border-b border-gray-200 last:border-b-0">
      <div className="flex w-40 flex-shrink-0 items-center border-r border-gray-200 bg-gray-50 px-4 py-3">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          {categoryLabel}
        </Checkbox>
      </div>
      <div className="flex-grow bg-white px-4 py-3">
        <Checkbox.Group
          style={{ width: '100%' }}
          value={checkedList}
          onChange={(val) => onChange(val as string[])}
        >
          <Row gutter={[16, 16]}>
            {options.map((opt) => (
              <Col span={6} key={opt} xl={4} xxl={3}>
                <Checkbox value={opt}>{opt}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  )
}

interface Props {
  onCancel: () => void
  onSave: () => void
}

export default function PaymentGroupCreate({ onCancel, onSave }: Props) {
  const [form] = Form.useForm()

  return (
    // ★ 1. 加入 pb-24 確保底部內容不被固定按鈕列遮擋
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* 麵包屑 */}
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>財務管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer transition-colors hover:text-teal-600"
          onClick={onCancel}
        >
          金流群組管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>新增金流群組</Breadcrumb.Item>
      </Breadcrumb>

      <Card
        title={<span className="font-bold text-gray-700">新增金流群組</span>}
        className="shadow-sm"
        bodyStyle={{ padding: 0 }}
      >
        <Form
          form={form}
          layout="vertical"
          className="p-6"
          initialValues={{ groupId: '', groupName: '' }}
        >
          {/* 基本設定 */}
          <div className="mb-6">
            <h3 className="mb-4 border-l-4 border-teal-500 pl-2 font-bold text-gray-700">
              金流群組設定
            </h3>
            <div className="ml-2 max-w-2xl space-y-4">
              <Form.Item label="群組編號" name="groupId" className="mb-0">
                <Input placeholder="請輸入" />
              </Form.Item>
              <Form.Item label="群組名稱" name="groupName" className="mb-0">
                <Input placeholder="請輸入" />
              </Form.Item>
            </div>
          </div>

          {/* 出款設定 */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm text-gray-600">
              出款 - 金流類型 / 名稱選擇
            </h3>
            <div className="rounded border border-gray-200">
              {WITHDRAW_OPTIONS.map((item) => (
                <PaymentSelectionRow
                  key={item.key}
                  name={`withdraw_${item.key}`}
                  categoryLabel={item.label}
                  options={item.options}
                />
              ))}
            </div>
          </div>

          {/* 入款設定 */}
          <div className="mb-2">
            <h3 className="mb-2 text-sm text-gray-600">
              入款 - 金流類型 / 名稱選擇
            </h3>
            <div className="rounded border border-gray-200">
              {DEPOSIT_OPTIONS.map((item) => (
                <PaymentSelectionRow
                  key={item.key}
                  name={`deposit_${item.key}`}
                  categoryLabel={item.label}
                  options={item.options}
                />
              ))}
            </div>
          </div>
        </Form>
      </Card>

      {/* ★ 2. 底部固定按鈕列 (與您提供的參考樣式一致) */}
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
          onClick={onSave}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}
