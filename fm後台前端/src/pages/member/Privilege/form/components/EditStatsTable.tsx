import { Form, Input, Select } from 'antd'

const statsColumns = [
  { title: '目前存款進度', name: 'depositCurrent' },
  { title: '存款要求', name: 'depositTarget' },
  { title: '有效投注(保級)進度', name: 'betKeepCurrent' },
  { title: '有效投注(保級)要求', name: 'betKeepTarget' },
  { title: '有效投注(升級)進度', name: 'betUpgradeCurrent' },
  { title: '有效投注(升級)要求', name: 'betUpgradeTarget' },
  { title: '升級紅利', name: 'upgradeBonus' },
  {
    title: (
      <>
        儲值回饋金
        <br />
        (%)
      </>
    ),
    name: 'topUpBonus',
  },
  { title: '生日禮金', name: 'birthDateBonus' },
  { title: '目前託售次數', name: 'consignmentCurrent' },
  { title: '每日託售次數', name: 'consignmentTotal' },
]

export default function EditStatsTable() {
  return (
    <div className="mb-6">
      <h3 className="mb-4 border-l-4 border-teal-500 pl-2 font-bold text-gray-700">
        特權資料
      </h3>

      <div className="mb-6 max-w-md">
        <Form.Item label="VIP等級" name="vipLevel">
          <Select>
            <Select.Option value="vip2">VIP2-BOK會員</Select.Option>
            <Select.Option value="vip3">VIP3-黃金會員</Select.Option>
          </Select>
        </Form.Item>
      </div>

      {/* 橫向捲動表格容器 */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse border border-gray-300 text-center text-xs">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {statsColumns.map((col) => (
                <th
                  key={col.name}
                  className="whitespace-nowrap border border-gray-300 p-2 font-bold"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {statsColumns.map((col) => (
                <td
                  key={col.name}
                  className="border border-gray-300 bg-white p-2"
                >
                  <Form.Item name={col.name} className="m-0">
                    <Input className="text-center" />
                  </Form.Item>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
