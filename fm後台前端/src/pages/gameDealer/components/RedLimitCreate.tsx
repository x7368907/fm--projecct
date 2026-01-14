import { useEffect, useState, useMemo } from 'react'
import { Breadcrumb, Select, Button, Input, Form, Card, Divider } from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'

// =============================================================================
// 資料設定檔 (Configuration)
// =============================================================================

// 1. 真人 (Live) 設定
const LIVE_PROVIDERS = [
  { code: 'DG', name: 'DG' },
  { code: '歐博', name: '歐博' },
  { code: 'MT', name: 'MT' },
  { code: 'T9', name: 'T9' },
  { code: 'DB', name: 'DB' },
  { code: 'SA', name: 'SA' },
  { code: 'WM', name: 'WM' },
  { code: 'RG', name: 'RG' },
]
const LIVE_GAMES = [
  '百家樂',
  '龍虎',
  '輪盤',
  '骰寶',
  '色碟',
  '博丁',
  '黑傑克',
  '安達巴哈',
  '印度炸金花',
]

// 2. 體育 (Sport) 設定
const SPORT_PROVIDERS = [{ code: 'Super', name: 'Super' }]
const SPORT_GAMES = ['盤口限紅']

// =============================================================================
// 組件主體
// =============================================================================

interface Props {
  onCancel: () => void
  onSave: (values: any) => void
  initialValues?: any
}

export default function RedLimitCreate({
  onCancel,
  onSave,
  initialValues,
}: Props) {
  const [form] = Form.useForm()

  // 狀態：目前選擇的類型 (live | sport)
  const [activeType, setActiveType] = useState<'live' | 'sport'>('live')
  const [activeProvider, setActiveProvider] = useState('DG')

  // 根據 activeType 動態決定要顯示的資料
  const currentProviders = useMemo(() => {
    return activeType === 'live' ? LIVE_PROVIDERS : SPORT_PROVIDERS
  }, [activeType])

  const currentGames = useMemo(() => {
    return activeType === 'live' ? LIVE_GAMES : SPORT_GAMES
  }, [activeType])

  // 當 activeType 改變時，自動選擇該類型的第一個廠商
  useEffect(() => {
    if (currentProviders.length > 0) {
      // 如果目前的 provider 不在新的列表中，才重置
      const exists = currentProviders.find((p) => p.code === activeProvider)
      if (!exists) {
        setActiveProvider(currentProviders[0].code)
      }
    }
  }, [activeType, currentProviders, activeProvider])

  // 初始值與重置邏輯
  useEffect(() => {
    if (initialValues) {
      // 編輯模式：先設定 UI 狀態
      if (initialValues.type) setActiveType(initialValues.type)
      if (initialValues.provider) setActiveProvider(initialValues.provider)

      // 再填入表單數值
      form.setFieldsValue(initialValues)
    } else {
      // 新增模式：重置表單與狀態
      form.resetFields()
      setActiveType('live')
      setActiveProvider('DG')

      // 給予預設值 (避免欄位空值)
      const defaultValues: any = {}
      LIVE_GAMES.forEach((g) => (defaultValues[g] = 'unset'))
      SPORT_GAMES.forEach((g) => (defaultValues[g] = 'unset'))
      form.setFieldsValue(defaultValues)
    }
  }, [initialValues, form])

  const handleFinish = (values: any) => {
    const submitData = {
      ...values,
      type: activeType,
      provider: activeProvider,
    }
    // console.log('Form values:', submitData)
    onSave(submitData)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* 麵包屑導航 */}
      <Breadcrumb separator=">" className="mb-4">
        <Breadcrumb.Item>遊戲商管理</Breadcrumb.Item>
        <Breadcrumb.Item
          className="cursor-pointer transition-colors hover:text-teal-600"
          onClick={onCancel}
        >
          遊戲限紅設定
        </Breadcrumb.Item>
        <Breadcrumb.Item className="font-bold text-gray-800">
          {initialValues ? '編輯遊戲限紅設定' : '新增遊戲限紅設定'}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card
        className="overflow-hidden border border-gray-200 shadow-sm"
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        {/* 標題列 */}
        <div className="border-b border-gray-200 bg-gray-100 px-6 py-3">
          <h2 className="mb-0 text-base font-bold text-gray-700">
            {initialValues ? '編輯遊戲限紅' : '新增遊戲限紅'}
          </h2>
        </div>

        {/* 表單內容區 */}
        <div className="p-8">
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            labelAlign="left"
            colon={false}
            onFinish={handleFinish}
          >
            {/* 區塊標題 */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold text-gray-700">
                遊戲限紅設定
              </h3>
              <Divider className="my-0" />
            </div>

            {/* 1. 遊戲類型切換按鈕 (靠左對齊 span: 24) */}
            <Form.Item wrapperCol={{ span: 24 }} className="mb-3">
              <div className="flex justify-start gap-2">
                <button
                  type="button"
                  onClick={() => setActiveType('live')}
                  className={`h-8 w-24 rounded border text-sm transition-colors ${
                    activeType === 'live'
                      ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                  }`}
                >
                  真人
                </button>
                <button
                  type="button"
                  onClick={() => setActiveType('sport')}
                  className={`h-8 w-24 rounded border text-sm transition-colors ${
                    activeType === 'sport'
                      ? 'border-[#7c3aed] bg-[#7c3aed] text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-[#7c3aed] hover:text-[#7c3aed]'
                  }`}
                >
                  體育
                </button>
              </div>
            </Form.Item>

            {/* 2. 動態顯示廠商列表 (靠左對齊 span: 24) */}
            <Form.Item wrapperCol={{ span: 24 }} className="mb-8">
              <div className="flex flex-wrap justify-start gap-3">
                {currentProviders.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setActiveProvider(p.code)}
                    className={`h-8 w-24 rounded border text-sm transition-colors ${
                      activeProvider === p.code
                        ? 'border-gray-400 bg-gray-300 text-gray-800 shadow-inner'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </Form.Item>

            <Divider dashed className="mb-8" />

            {/* 3. 動態顯示遊戲欄位 (寬度 50%) */}
            {currentGames.map((gameName) => (
              <Form.Item
                key={gameName}
                label={gameName}
                name={gameName}
                className="mb-5"
              >
                <Select
                  style={{ width: '50%' }}
                  options={[
                    { label: '不設定', value: 'unset' },
                    { label: '限紅 A (100~1000)', value: 'limit_a' },
                    { label: '限紅 B (500~5000)', value: 'limit_b' },
                    { label: 'VIP 限紅', value: 'limit_vip' },
                  ]}
                />
              </Form.Item>
            ))}

            {/* 共用數值欄位 (寬度 50%) */}
            <Form.Item
              label="單日最大輸額限制"
              name="maxLossLimit"
              className="mb-5"
              extra={
                <span className="text-xs text-red-500">設定0代表不限制</span>
              }
            >
              <Input placeholder="請輸入" allowClear style={{ width: '50%' }} />
            </Form.Item>

            <Form.Item
              label="單日最大贏額限制"
              name="maxWinLimit"
              className="mb-5"
              extra={
                <span className="text-xs text-red-500">設定0代表不限制</span>
              }
            >
              <Input placeholder="請輸入" allowClear style={{ width: '50%' }} />
            </Form.Item>
          </Form>
        </div>
      </Card>

      {/* 底部固定按鈕列 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-4 border-t border-gray-200 bg-white py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Button
          size="large"
          icon={<CloseOutlined />}
          onClick={onCancel}
          className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:bg-red-50 hover:!text-red-400"
        >
          取 消
        </Button>
        <Button
          size="large"
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => form.submit()}
          className="h-10 w-32 border-green-500 bg-green-500 font-bold shadow-sm hover:!border-green-400 hover:!bg-green-400"
        >
          儲 存
        </Button>
      </div>
    </div>
  )
}
