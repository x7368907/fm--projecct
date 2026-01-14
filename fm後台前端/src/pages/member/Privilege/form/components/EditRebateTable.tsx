import React from 'react'
import { Form, Input } from 'antd'

const rebateCategories = [
  { title: '電子 / 捕魚返水 (%)', key: 'electronic' },
  { title: '真人返水 (%)', key: 'live' },
  { title: '棋牌返水 (%)', key: 'chess' },
  { title: '彩票返水 (%)', key: 'lottery' },
  { title: '體育返水 (%)', key: 'sports' },
]

export default function EditRebateTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[800px] border-collapse border border-gray-300 text-center text-xs">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            {rebateCategories.map((cat) => (
              <th
                key={cat.key}
                colSpan={3}
                className="border border-gray-300 p-2 font-bold"
              >
                {cat.title}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100">
            {rebateCategories.map((cat) => (
              <React.Fragment key={`${cat.key}-sub`}>
                <th className="w-16 border border-gray-300 p-1 font-bold text-orange-400">
                  時
                </th>
                <th className="w-16 border border-gray-300 p-1 font-bold text-blue-600">
                  日
                </th>
                <th className="w-16 border border-gray-300 p-1 font-bold text-gray-600">
                  週
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {rebateCategories.map((cat) => (
              <React.Fragment key={`${cat.key}-inputs`}>
                <td className="border border-gray-300 p-2">
                  <Form.Item name={`${cat.key}_h`} className="m-0">
                    <Input className="px-1 text-center" />
                  </Form.Item>
                </td>
                <td className="border border-gray-300 p-2">
                  <Form.Item name={`${cat.key}_d`} className="m-0">
                    <Input className="px-1 text-center" />
                  </Form.Item>
                </td>
                <td className="border border-gray-300 p-2">
                  <Form.Item name={`${cat.key}_w`} className="m-0">
                    <Input className="px-1 text-center" />
                  </Form.Item>
                </td>
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
