import { Form, Input } from 'antd'

const days = [
  { key: 'mon', label: '星期一', color: '#3b5998' },
  { key: 'tue', label: '星期二', color: '#3b5998' },
  { key: 'wed', label: '星期三', color: '#3b5998' },
  { key: 'thu', label: '星期四', color: '#3b5998' },
  { key: 'fri', label: '星期五', color: '#3b5998' },
  { key: 'sat', label: '星期六', color: '#f56565' },
  { key: 'sun', label: '星期日', color: '#f56565' },
]

export default function SignInSettings() {
  return (
    <div className="animate-fadeIn mb-6">
      <div className="mb-4 flex">
        <div
          style={{
            width: '110px',
            textAlign: 'left',
            fontWeight: 500,
            color: '#333',
            paddingTop: 10,
          }}
        >
          活動金設定
        </div>
        <div className="max-w-[900px] flex-1">
          <div className="overflow-hidden rounded border border-gray-300">
            <div className="flex text-center text-sm text-white">
              <div className="flex w-24 items-center justify-center border-r border-gray-400 bg-[#4a5568] py-2">
                星期
              </div>
              {days.map((day) => (
                <div
                  key={day.key}
                  className={`flex flex-1 items-center justify-center border-r py-2 last:border-r-0`}
                  style={{ backgroundColor: day.color }}
                >
                  {day.label}
                </div>
              ))}
            </div>
            <div className="flex items-center bg-white">
              <div className="flex h-full w-24 items-center justify-center border-r py-2 text-center font-medium text-gray-700">
                金額
              </div>
              {days.map((day) => (
                <div
                  key={day.key}
                  className="flex-1 border-r p-1 last:border-r-0"
                >
                  <Form.Item name={['signBonus', day.key]} noStyle>
                    <Input
                      placeholder="請輸入活動金額"
                      style={{ textAlign: 'center', fontSize: '12px' }}
                      size="small"
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div style={{ fontWeight: 500, color: '#333' }}>
            下注金額滿(含活動金)
          </div>
          <Form.Item name="betThreshold" noStyle>
            <Input style={{ width: 200 }} placeholder="請輸入活動金額" />
          </Form.Item>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ fontWeight: 500, color: '#333' }}>加贈活動金</div>
          <Form.Item name="bonusFund" noStyle>
            <Input style={{ width: 200 }} placeholder="請輸入活動金額" />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
