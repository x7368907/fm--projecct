import { Form, Divider, Select, Input } from 'antd'

// 原本的資料設定 (只留體育的)
const SPORT_PROVIDERS = [{ code: 'Super', name: 'Super' }]
const SPORT_GAMES = ['盤口限紅']

interface SportFormProps {
  activeProvider: string
  setActiveProvider: (val: string) => void
}

export default function SportForm({
  activeProvider,
  setActiveProvider,
}: SportFormProps) {
  return (
    <>
      {/* 2. 動態顯示廠商列表 (保持原本樣式) */}
      <Form.Item wrapperCol={{ span: 24 }} className="mb-8">
        <div className="flex flex-wrap justify-start gap-3">
          {SPORT_PROVIDERS.map((p) => (
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

      {/* 3. 動態顯示遊戲欄位 (保持原本樣式) */}
      {SPORT_GAMES.map((gameName) => (
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

      {/* 共用數值欄位 (保持原本樣式) */}
      <Form.Item
        label="單日最大輸額限制"
        name="maxLossLimit"
        className="mb-5"
        extra={<span className="text-xs text-red-500">設定0代表不限制</span>}
      >
        <Input placeholder="請輸入" allowClear style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item
        label="單日最大贏額限制"
        name="maxWinLimit"
        className="mb-5"
        extra={<span className="text-xs text-red-500">設定0代表不限制</span>}
      >
        <Input placeholder="請輸入" allowClear style={{ width: '50%' }} />
      </Form.Item>
    </>
  )
}
