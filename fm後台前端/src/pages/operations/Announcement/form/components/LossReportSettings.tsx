import { Button, Radio, Form, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface LossReportSettingsProps {
  lossReportRows: number[]
  addLossRow: () => void
  removeLossRow: (index: number) => void
  lossResetType: 'daily' | 'weekly'
  setLossResetType: (type: 'daily' | 'weekly') => void
}

const displayDays = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
]

export default function LossReportSettings({
  lossReportRows,
  addLossRow,
  removeLossRow,
  lossResetType,
  setLossResetType,
}: LossReportSettingsProps) {
  return (
    <div className="animate-fadeIn mb-6">
      <div className="mb-4 flex items-center gap-2">
        <div
          style={{
            width: '110px',
            textAlign: 'left',
            fontWeight: 500,
            color: '#333',
          }}
        >
          結算範圍設定
        </div>
        <div className="flex flex-1 gap-1">
          <Button
            type="primary"
            style={{ background: '#3b5998', borderColor: '#3b5998' }}
          >
            星期
          </Button>
          {displayDays.map((day) => (
            <Button key={day} className="border-gray-300 bg-white">
              {day}
            </Button>
          ))}
        </div>
      </div>

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
          累計虧損報表設定
        </div>
        <div className="max-w-[400px] flex-1">
          <div className="overflow-hidden rounded border border-gray-300">
            <div className="flex text-center text-sm text-white">
              <div className="flex w-16 items-center justify-center border-r border-gray-300 bg-white p-1">
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={addLossRow}
                  style={{
                    background: '#52c41a',
                    borderColor: '#52c41a',
                    fontSize: '12px',
                  }}
                >
                  新增
                </Button>
              </div>
              <div className="flex-1 border-r border-gray-500 bg-[#2e3a59] py-2">
                累積金額
              </div>
              <div className="flex-1 border-r border-gray-500 bg-[#2e3a59] py-2">
                贈送金額
              </div>
              <div className="w-16 border-l border-gray-300 bg-white"></div>
            </div>
            {lossReportRows.map((_, index) => (
              <div
                key={index}
                className="flex items-center border-t border-gray-200 bg-white"
              >
                <div className="flex h-full w-16 items-center justify-center border-r bg-gray-50 py-2 text-center font-medium text-gray-700">
                  {index + 1}
                </div>
                <div className="flex-1 border-r p-1">
                  <Form.Item name={['lossReport', index, 'amount']} noStyle>
                    <Input
                      placeholder="請輸入金額"
                      style={{ textAlign: 'center', fontSize: '12px' }}
                      size="small"
                    />
                  </Form.Item>
                </div>
                <div className="flex-1 border-r p-1">
                  <Form.Item name={['lossReport', index, 'bonus']} noStyle>
                    <Input
                      placeholder="請輸入活動金額"
                      style={{ textAlign: 'center', fontSize: '12px' }}
                      size="small"
                    />
                  </Form.Item>
                </div>
                <div className="flex w-16 items-center justify-center p-1">
                  {index >= 3 && (
                    <Button
                      danger
                      size="small"
                      style={{
                        fontSize: '12px',
                        padding: '0 4px',
                        borderColor: '#ff4d4f',
                        color: '#ff4d4f',
                      }}
                      onClick={() => removeLossRow(index)}
                    >
                      刪除
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          style={{
            width: '110px',
            textAlign: 'left',
            fontWeight: 500,
            color: '#333',
          }}
        >
          累計虧損重置設定
        </div>
        <Radio.Group
          onChange={(e) => setLossResetType(e.target.value)}
          value={lossResetType}
        >
          <Radio value="daily">每日重置</Radio>
          <Radio value="weekly">每週五重置</Radio>
        </Radio.Group>
      </div>
    </div>
  )
}
