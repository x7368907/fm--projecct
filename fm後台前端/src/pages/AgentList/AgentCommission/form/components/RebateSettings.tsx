import { Form, InputNumber } from 'antd'

const GAME_TYPES = [
  { key: 'live', label: '真人' },
  { key: 'elec', label: '電子' },
  { key: 'sport', label: '體育' },
  { key: 'lottery', label: '彩票' },
  { key: 'chess', label: '棋牌' },
  { key: 'fish', label: '捕魚' },
]

export default function RebateSettings() {
  return (
    <Form.Item label="代理反水條件">
      <div className="overflow-hidden rounded border border-gray-300">
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

        {/* 輸入框 */}
        <div className="grid grid-cols-6 divide-x divide-gray-300 bg-white">
          {GAME_TYPES.map((type) => (
            <div key={type.key} className="p-1">
              <Form.Item name={['rebate', type.key]} noStyle>
                <InputNumber
                  min={0}
                  max={100}
                  className="w-full text-center"
                  bordered={false}
                  placeholder="0"
                />
              </Form.Item>
            </div>
          ))}
        </div>
      </div>
    </Form.Item>
  )
}
