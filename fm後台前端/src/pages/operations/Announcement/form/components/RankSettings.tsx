import { Button, Radio, Form, Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface RankSettingsProps {
  rankRows: number[]
  addRankRow: () => void
  removeRankRow: () => void
  settlementType: 'daily' | 'weekly'
  setSettlementType: (type: 'daily' | 'weekly') => void
}

const displayDaysMap: Record<string, string> = {
  mon: '星期一',
  tue: '星期二',
  wed: '星期三',
  thu: '星期四',
  fri: '星期五',
  sat: '星期六',
  sun: '星期日',
}

const toChineseNum = (num: number) => {
  const map = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  return `第${map[num]}名`
}

export default function RankSettings({
  rankRows,
  addRankRow,
  removeRankRow,
  settlementType,
  setSettlementType,
}: RankSettingsProps) {
  const displayDays =
    settlementType === 'weekly'
      ? ['sun']
      : ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

  return (
    <div className="animate-fadeIn mb-6 rounded border border-gray-200 bg-gray-50 p-4">
      <div className="mb-4 text-base font-bold text-gray-700">
        累計贏分排行設定
      </div>

      <div className="mb-4">
        <Radio.Group
          onChange={(e) => setSettlementType(e.target.value)}
          value={settlementType}
          className="flex gap-8"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">
              累計贏分排行 - 日結算設定
            </span>
            <Radio value="daily">日結算設定啟用</Radio>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-600">
              累計贏分排行 - 週結算設定
            </span>
            <Radio value="weekly">週結算設定啟用</Radio>
          </div>
        </Radio.Group>
      </div>

      {settlementType === 'daily' && (
        <div className="animate-fadeIn mb-4 flex items-center gap-2">
          <div className="w-24 font-medium text-gray-700">結算範圍設定</div>
          <div className="flex flex-1 gap-1">
            <Button
              type="primary"
              style={{ background: '#3b5998', borderColor: '#3b5998' }}
            >
              星期
            </Button>
            {Object.values(displayDaysMap).map((day) => (
              <Button key={day} className="border-gray-300 bg-white">
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 flex items-start gap-2">
        <div className="w-24 pt-2 font-medium text-gray-700">
          排名活動獎金設定
        </div>
        <div className="flex-1 overflow-x-auto">
          <div
            className="overflow-hidden rounded border border-gray-300"
            style={{ minWidth: settlementType === 'weekly' ? 400 : 800 }}
          >
            <div className="flex text-center text-sm text-white">
              <div className="flex w-24 items-center justify-center border-r border-gray-300 bg-white p-1">
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={addRankRow}
                  style={{ background: '#52c41a', borderColor: '#52c41a' }}
                >
                  新增
                </Button>
              </div>
              {displayDays.map((day) => (
                <div
                  key={day}
                  className={`flex-1 border-r py-2 last:border-r-0 ${['sat', 'sun'].includes(day) ? 'border-red-400 bg-[#f56565]' : 'border-blue-400 bg-[#3b5998]'}`}
                >
                  {displayDaysMap[day]}
                </div>
              ))}
            </div>
            {rankRows.map((rank) => (
              <div
                key={rank}
                className="flex items-center border-t border-gray-200 bg-white"
              >
                <div className="flex h-full w-24 items-center justify-center border-r bg-gray-50 py-2 text-center font-medium text-gray-700">
                  {toChineseNum(rank)}
                </div>
                {displayDays.map((day) => (
                  <div
                    key={day}
                    className="flex-1 border-r p-1 last:border-r-0"
                  >
                    <Form.Item name={['rankBonus', rank, day]} noStyle>
                      <Input
                        placeholder={
                          settlementType === 'weekly' && rank <= 3
                            ? '100000'
                            : '請輸入活動金額'
                        }
                        style={{ textAlign: 'center', fontSize: '12px' }}
                        size="small"
                      />
                    </Form.Item>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 text-right">
            <Button
              danger
              size="small"
              onClick={removeRankRow}
              disabled={rankRows.length <= 1}
            >
              刪除最後一行
            </Button>
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
          統計排名顯示
        </div>
        <Form.Item name="rankDisplayLimit" noStyle initialValue="3">
          <Select style={{ width: 200 }}>
            <Select.Option value="3">3(預設)</Select.Option>
            <Select.Option value="5">5</Select.Option>
            <Select.Option value="10">10</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  )
}
