import { Card, Form, Select, Input } from 'antd'

export default function ProfitSettings() {
  return (
    <Card
      title="分潤條件設定"
      className="mb-4 shadow-sm"
      headStyle={{ background: '#fafafa' }}
    >
      <Form.Item
        label="代理制度"
        name="agentSystem"
        rules={[{ required: true }]}
      >
        <Select placeholder="請選擇">
          <Select.Option value="share">佔成制</Select.Option>
          <Select.Option value="water">反水制（總投注額回饋）</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="分潤選擇"
        name="profitChoice"
        rules={[{ required: true, message: '請選擇分潤方案' }]}
      >
        <Select
          placeholder="請選擇"
          options={[
            {
              label: '通用代理0%(成數代理開設線下代理使用)',
              value: 'type1',
            },
            {
              label: '抽水代理(關線下返水)',
              value: 'type2',
            },
            {
              label: '合營計畫',
              value: 'type3',
            },
            {
              label: '抽水代理(關線下返水) 返水0.6 體育0.5 彩票0',
              value: 'type4',
            },
            {
              label: '抽水代理(關線下返水) 百家0.7 其他0.5 彩票0',
              value: 'type5',
            },
            {
              label: '合抽水代理(關線下返水) 返水0.7 體育0.5 彩票0',
              value: 'type6',
            },
            {
              label: '抽水代理(關線下返水) 返水0.5 體0.5 彩0',
              value: 'type7',
            },
            {
              label: '抽水代理(關線下返水) - 迪西 - 返水0.8 體0.8 彩0',
              value: 'type8',
            },
            {
              label: '停用',
              value: 'type9',
            },
            {
              label: '信用合營佔成20% 退傭0.5%',
              value: 'type10',
            },
            {
              label: '抽水代理(關線下返水) 返水0.8 體育0.5 彩票0',
              value: 'type11',
            },
            {
              label: '抽水代理(關線下返水) 返水 真人1 其他0.5 彩票0',
              value: 'type12',
            },
            {
              label: '抽水代理(關線下返水) 返水0.5 體育0.3 彩票0',
              value: 'type13',
            },
            {
              label: '關閉',
              value: 'type14',
            },
            {
              label: '抽水代理(關線下返水) 外找小代理返水 其他起步0.4 彩票0',
              value: 'type15',
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="分潤比例(%)" name="profitRate">
        <Input placeholder="0" suffix="%" />
      </Form.Item>
      <Form.Item label="代理反水條件" style={{ marginBottom: 0 }}>
        <div className="overflow-hidden rounded-md border text-center text-xs">
          <div className="grid grid-cols-6 bg-gray-200 py-2 font-bold">
            <div>
              真人
              <br />
              (%)
            </div>
            <div>
              電子
              <br />
              (%)
            </div>
            <div>
              體育
              <br />
              (%)
            </div>
            <div>
              彩票
              <br />
              (%)
            </div>
            <div>
              棋牌
              <br />
              (%)
            </div>
            <div>
              捕魚
              <br />
              (%)
            </div>
          </div>
          <div className="grid grid-cols-6 bg-white">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                className="w-full border-r p-2 text-center outline-none last:border-r-0"
                placeholder=""
              />
            ))}
          </div>
        </div>
      </Form.Item>
      <Form.Item label="分潤結算時機" name="settlementTime" className="mt-4">
        <Select placeholder="請選擇">
          <Select.Option value="weekly">週結(每週日-23:59:59)</Select.Option>
          <Select.Option value="monthly">
            月結(每月最後一天-23:59:59)
          </Select.Option>
        </Select>
      </Form.Item>
    </Card>
  )
}
