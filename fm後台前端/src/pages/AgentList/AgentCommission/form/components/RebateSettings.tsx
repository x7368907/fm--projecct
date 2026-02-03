import { Form, InputNumber } from 'antd'

const GAME_TYPES = [
  { key: 'live', label: '真人' },
  { key: 'elec', label: '電子' },
  { key: 'sport', label: '體育' },
  { key: 'lottery', label: '彩票' },
  { key: 'chess', label: '棋牌' },
  { key: 'fish', label: '捕魚' },
]

interface RebateSettingsProps {
  disabled?: boolean
}

export default function RebateSettings({ disabled }: RebateSettingsProps) {
  return (
    <Form.Item label="代理反水條件">
      <div
        className={`overflow-hidden rounded border ${
          disabled ? 'border-gray-200 bg-gray-100' : 'border-gray-300 bg-white'
        }`}
      >
        {/* 表頭 */}
        <div className="grid grid-cols-6 divide-x divide-gray-300 bg-gray-200 text-center text-xs font-bold text-gray-700">
          {GAME_TYPES.map((type) => (
            <div key={type.key} className="p-2">
              {type.label}
              <br />
              (%)
            </div>
          ))}
        </div>

        {/* 輸入欄位 */}
        <div className="grid grid-cols-6 divide-x divide-gray-300">
          {GAME_TYPES.map((type) => (
            <div key={type.key} className="p-1">
              <Form.Item name={['rebate', type.key]} noStyle>
                <InputNumber
                  min={0}
                  max={100}
                  disabled={disabled}
                  className="w-full text-center"
                  bordered={false}
                  placeholder="0"
                />
              </Form.Item>
            </div>
          ))}
        </div>
      </div>

      {disabled && (
        <div className="mt-1 text-xs text-gray-400">
          佔成制不適用代理返水條件
        </div>
      )}
    </Form.Item>
  )
}
