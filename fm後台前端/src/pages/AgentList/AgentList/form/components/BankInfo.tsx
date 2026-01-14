import { Card, Button, Select, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function BankInfo() {
  return (
    <Card
      title="銀行卡資料"
      className="mb-4 shadow-sm"
      headStyle={{ background: '#fafafa' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border text-left text-sm text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="w-12 border px-2 py-2 text-center">新增</th>
              <th className="w-12 border px-2 py-2 text-center">刪除</th>
              <th className="border px-2 py-2">銀行名稱</th>
              <th className="border px-2 py-2">銀行帳號</th>
              <th className="w-20 border px-2 py-2">存摺封面</th>
              <th className="w-20 border px-2 py-2">狀態</th>
              <th className="border px-2 py-2">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-center">
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  type="text"
                  className="bg-black text-white hover:bg-gray-800 hover:text-white"
                />
              </td>
              <td className="border text-center"></td>
              <td className="border p-1">
                <Select size="small" placeholder="請選擇" className="w-full" />
              </td>
              <td className="border p-1">
                <Input size="small" placeholder="請輸入" />
              </td>
              <td className="border p-1 text-center">
                <Button
                  size="small"
                  className="border-green-500 px-1 text-xs text-green-500"
                >
                  上傳
                </Button>
              </td>
              <td className="border p-1">
                <Select size="small" placeholder="請選擇" className="w-full" />
              </td>
              <td className="border p-1">
                <Input size="small" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  )
}
